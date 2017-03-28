https://msdn.microsoft.com/en-us/library/ms190268.aspx
https://msdn.microsoft.com/en-us/library/ms191439.aspx
https://msdn.microsoft.com/en-us/library/ms188927.aspx

```sql
USE [msdb];
GO
-- creates a schedule named Old Quotes Deletion Schedule.
-- Jobs that use this schedule execute every day at the specified time.
EXEC sp_add_schedule
	@schedule_name = N'Old Quotes Deletion Schedule' ,
	@freq_type = 4,
	@freq_interval = 1,
	@active_start_time = <time_in_HHMMSS> ; -- e.g. 230000 (11 pm)
GO
-- creates a job
EXEC sp_add_job
	@job_name = N'Old Quotes Deletion Job';

GO

EXEC sp_add_jobstep
	@job_name = N'Old Quotes Deletion Job',
	@step_name = N'Delete expired quotes and groups',
	@command = N'
-- your database name
USE <your_database_name>;
GO

-- your replication service ID
DECLARE @ReplicationServiceId AS INT = <your_replication_service_id>;

-- max time (in days) before quotes expire
DECLARE @ExpirationDays AS INT = <number_of_days_(rec_30)>;

DELETE -- deletion of quotes from groups
FROM TQOPTION
WHERE Id IN
(
	SELECT O.Id
	FROM TqOption O
	INNER JOIN TqOptionGroup G ON O.OptionGroupId = G.Id
	WHERE ReplicationServiceId = @ReplicationServiceId
	AND DATEDIFF(d,G.CreatedDate, getdate()) >
	(
		SELECT
		CASE
			WHEN AutoQuoteDeletionEnabled = 1 THEN
				CASE
					WHEN NumberOfDaysQuoteToExpire > @ExpirationDays THEN @ExpirationDays
					ELSE NumberOfDaysQuoteToExpire
				END
			ELSE @ExpirationDays
		END DaysToKeepQuotes
		FROM TqConfiguration
		WHERE ReplicationServiceId = @ReplicationServiceId
	)
)

DELETE -- deletion of groups
	FROM TqOptionGroup
	WHERE ReplicationServiceId = @ReplicationServiceId
	AND DATEDIFF(d,CreatedDate, getdate()) >
	(
		SELECT
		CASE
			WHEN AutoQuoteDeletionEnabled = 1 THEN
				CASE
					WHEN NumberOfDaysQuoteToExpire > @ExpirationDays THEN @ExpirationDays
					ELSE NumberOfDaysQuoteToExpire
				END
			ELSE @ExpirationDays
		END DaysToKeepQuotes
		FROM TqConfiguration
		WHERE ReplicationServiceId = @ReplicationServiceId
	)
	';

-- attaches the schedule to the job BackupDatabase
EXEC sp_attach_schedule
	@job_name = N'Old Quotes Deletion Job',
	@schedule_name = N'Old Quotes Deletion Schedule' ;
GO

EXEC dbo.sp_add_jobserver
	@job_name = N'Old Quotes Deletion Job';
GO
```

# Setting a variable to table result, printing variable result

```sql
DECLARE @ReplicationServiceId AS INT

SET @ReplicationServiceId = (
	SELECT ReplicationServiceId
	FROM Customer
	WHERE Customer.LicenseKey = 'ABC123'
)

PRINT @ReplicationServiceId
```
