FROM openvino/ubuntu20_dev:2022.3.0 AS build

USER root

RUN omz_downloader \
    --name semantic-segmentation-adas-0001 \
    --precisions FP32 \
    -o /opt/nuclio/open_model_zoo

FROM clarify.openvino.base

COPY --from=build --chown=root:root /opt/nuclio/open_model_zoo /opt/nuclio/open_model_zoo