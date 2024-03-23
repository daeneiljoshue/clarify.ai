
import os

QUALITY_CHECK_JOB_DELAY = int(os.getenv("CLARIFY_QUALITY_CHECK_JOB_DELAY", 15 * 60))
"The delay before the next quality check job is queued, in seconds"