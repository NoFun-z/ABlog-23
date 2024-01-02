DROP TABLE Photo
DROP TABLE Blog
DROP TABLE BlogComment
DROP TABLE ApplicationUser

DROP INDEX IF EXISTS IX_ApplicationUser_NormalizedUsername ON dbo.ApplicationUser;
DROP INDEX IF EXISTS IX_ApplicationUser_NormalizedEmail ON dbo.ApplicationUser;

DROP PROCEDURE IF EXISTS dbo.Account_GetByUsername;

DROP VIEW [aggregate].[Blog]
DROP VIEW [aggregate].[BlogComment]

DROP TYPE IF EXISTS [dbo].[BlogCommentType];
DROP TYPE IF EXISTS [dbo].[BlogType];
DROP TYPE IF EXISTS [dbo].[PhotoType];
DROP TYPE IF EXISTS [dbo].[AccountType];