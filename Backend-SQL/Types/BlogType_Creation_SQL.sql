CREATE TYPE [dbo].[BlogType] AS TABLE
(
	[BlogId] INT NOT NULL,
	[Title] VARCHAR(50) NOT NULL,
	[Content] NVARCHAR(MAX) NOT NULL,
	[PhotoId] INT NOT NULL
)