CREATE PROCEDURE [dbo].[BlogComment_Get]
	@BlogCommentId INT
AS 
	SELECT 
		t1.[BlogCommentId],
		t1.[ParentBlogCommentId],
		t1.[BlogId],
		t1.[ApplicationUserId],
		t1.[Username],
		t1.[Content],
		t1.[PublishDate],
		t1.[UpdateDate]
	FROM 
		[aggregate].[BlogComment] t1
	WHERE 
		t1.[BlogCommentId] = @BlogCommentId AND
		t1.[ActiveInd] = CONVERT(BIT, 1)
