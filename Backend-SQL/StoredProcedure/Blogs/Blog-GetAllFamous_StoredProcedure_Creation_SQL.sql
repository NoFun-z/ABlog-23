CREATE PROCEDURE [dbo].[Blog_GetAllFamous]
AS
	SELECT 
	TOP 6
		t1.[BlogId],
		t1.[ApplicationUserId],
		t1.[Username],
		t1.[PhotoId],
		t1.[Title],
		t1.[Content],
		t1.[PublishDate],
		t1.[UpdateDate]
	FROM 
		[aggregate].[Blog] t1
	INNER JOIN 
		[dbo].[BlogComment] t2 ON t1.[BlogId] = t2.[BlogId]
	WHERE 
		t1.[ActiveInd] = CONVERT(BIT,1) AND
		t2.[ActiveInd] = CONVERT(BIT,1)
	GROUP BY
		t1.[BlogId],
		t1.[ApplicationUserId],
		t1.[Username],
		t1.[PhotoId],
		t1.[Title],
		t1.[Content],
		t1.[PublishDate],
		t1.[UpdateDate]
	ORDER BY
		COUNT(t2.BlogCommentId)
	DESC