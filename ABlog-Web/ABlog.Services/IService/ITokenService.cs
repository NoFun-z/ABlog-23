using ABlog.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABlog.Services.IService
{
    public interface ITokenService
    {
        public string CreateToken(ApplicationUserIdentity user);
    }
}
