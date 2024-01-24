CREATE PROCEDURE [dbo].[Blog_Upsert]
	@Blog BlogType READONLY,
	@ApplicationUserId INT
AS
	MERGE INTO [dbo].[Blog] TARGET
	USING (
		SELECT
			[BlogId],
			@ApplicationUserId [ApplicationUserId],
			[Title],
			[Content],
			[PhotoId]
		FROM 
			@Blog
	) AS SOURCE
	ON
	(
		TARGET.BlogId = SOURCE.BlogId AND TARGET.ApplicationUserId = SOURCE.ApplicationUserId
	)
	WHEN MATCHED THEN
		UPDATE SET
			TARGET.[Title] = SOURCE.[Title],
			TARGET.[Content] = SOURCE.[Content],
			TARGET.[PhotoId] = SOURCE.[PhotoId],
			TARGET.[UpdateDate] = GETDATE()
	WHEN NOT MATCHED BY TARGET THEN
		INSERT (
			[ApplicationUserId],
			[PhotoId],
			[Title],
			[Content]
		)
		VALUES (
			SOURCE.[ApplicationUserId],
			SOURCE.[PhotoId],
			SOURCE.[Title],
			SOURCE.[Content]
		);

	SELECT CAST(SCOPE_IDENTITY() AS INT);


DECLARE @BlogVar [dbo].[BlogType];
INSERT INTO @BlogVar (BlogId, Title, Content)
VALUES
(1, 'My First Blog Post', 'Content of the first blog post.');
EXEC [dbo].[Blog_Upsert] @BlogVar, 1;

DROP PROCEDURE IF EXISTS [dbo].[Blog_Upsert]