using ABlog.Models.Blog;
using ABlog.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace ABlog_Web.Controllers
{
    public class BlogController : ApiController
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IPhotoRepository _photoRepository;

        public BlogController(IBlogRepository blogRepository, IPhotoRepository photoRepository)
        {
            _blogRepository = blogRepository;
            _photoRepository = photoRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Blog>> Create(BlogCreate blogCreate)
        {
            int applicationUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            if (blogCreate.PhotoId.HasValue)
            {
                var photo = await _photoRepository.GetAsync(blogCreate.PhotoId.Value);

                if (photo.ApplicationUserId != applicationUserId)
                {
                    return BadRequest("You did not upload the photo.");
                }
            }

            var blog = await _blogRepository.UpsertAsync(blogCreate, applicationUserId);

            return Ok(blog);
        }

        [HttpGet]
        public async Task<ActionResult<PagedResults<Blog>>> GetAll([FromQuery] BlogPaging blogPaging)
        {
            var blogs = await _blogRepository.GetAllAsync(blogPaging);

            return Ok(blogs);
        }

        [HttpGet("{blogId}")]
        public async Task<ActionResult<Blog>> Get(int blogId)
        {
            var blog = await _blogRepository.GetAsync(blogId);

            //return Ok(blog);

            // Create a dictionary to hold claim information
            var claimsDictionary = new Dictionary<string, string>();

            // Populate the dictionary with claims
            foreach (var claim in User.Claims)
            {
                claimsDictionary.Add(claim.Type, claim.Value);
            }

            // Initialize the response object with default values
            var response = new
            {
                Blog = blog,
                Claims = claimsDictionary,
                ApplicationUserId = -1 // Default value
            };

            // Try to find the "nameidentifier" claim
            var nameIdClaim = User.Claims.FirstOrDefault(i => i.Type == JwtRegisteredClaimNames.NameId);

            if (nameIdClaim != null)
            {
                // If the claim is found, update the ApplicationUserId in the response
                int applicationUserId;
                if (int.TryParse(nameIdClaim.Value, out applicationUserId))
                {
                    response = new
                    {
                        Blog = blog,
                        Claims = claimsDictionary,
                        ApplicationUserId = applicationUserId
                    };
                }
            }

            return Ok(response);

        }

        [HttpGet("user/{applicationUserId}")]
        public async Task<ActionResult<List<Blog>>> GetByApplicationUserId(int applicationUserId)
        {
            var blogs = await _blogRepository.GetAllByUserIdAsync(applicationUserId);

            return Ok(blogs);
        }

        [HttpGet("famous")]
        public async Task<ActionResult<List<Blog>>> GetAllFamous()
        {
            var blogs = await _blogRepository.GetAllFamousAsync();

            return Ok(blogs);
        }

        [Authorize]
        [HttpDelete("{blogId}")]
        public async Task<ActionResult<int>> Delete(int blogId)
        {
            int applicationUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var foundBlog = await _blogRepository.GetAsync(blogId);

            if (foundBlog == null) return BadRequest("Blog does not exist.");

            if (foundBlog.ApplicationUserId == applicationUserId)
            {
                var affectedRows = await _blogRepository.DeleteAsync(blogId);

                return Ok(affectedRows);
            }
            else
            {
                return BadRequest("You didn't create this blog.");
            }
        }
    }
}
