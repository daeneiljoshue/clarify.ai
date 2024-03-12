

import os

ANALYTICS_CHECK_JOB_DELAY = int(os.getenv("CLARIFY_ANALYTICS_CHECK_JOB_DELAY", 15 * 60))
"The delay before the next analytics check job is queued, in seconds"