

from typing import List

import cvat_sdk.auto_annotation as cvataa
import cvat_sdk.models as models
import PIL.Image

spec = cvataa.DetectionFunctionSpec(
    labels=[
        cvataa.label_spec("car", 0),
    ],
)


def detect(
    context: cvataa.DetectionFunctionContext, image: PIL.Image.Image
) -> List[models.LabeledShapeRequest]:
    return [
        cvataa.rectangle(0, [1, 2, 3, 4]),
    ]