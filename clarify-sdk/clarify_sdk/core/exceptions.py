

class ClarifySdkException(Exception):
    """Base class for SDK exceptions"""


class InvalidHostException(ClarifySdkException):
    """Indicates an invalid hostname error"""


class IncompatibleVersionException(ClarifySdkException):
    """Indicates server and SDK version mismatch"""