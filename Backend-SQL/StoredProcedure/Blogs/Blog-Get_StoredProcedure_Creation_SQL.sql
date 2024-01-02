CREATE PROCEDURE [dbo].[Blog_Get]
	@BlogId INT
AS 
	SELECT 
		[BlogId],
		[ApplicationUserId],
		[Username],
		[Title],
		[Content],
		[PhotoId],
		[PublishDate],
		[UpdateDate]
	FROM 
		[aggregate].[Blog] t1
	WHERE 
		t1.[BlogId] = @BlogId AND
		t1.[ActiveInd] = CONVERT(BIT, 1)
