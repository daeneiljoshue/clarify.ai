#! /bin/env bash

set -e

PYTHON="${PYTHON:-python3}"
BLACK="${PYTHON} -m black"
ISORT="${PYTHON} -m isort"

if ! ${BLACK} --version >/dev/null 2>&1; then
    echo "black is not found, please check it is installed"
    exit 1
fi
if ! ${ISORT} --version >/dev/null 2>&1; then
    echo "isort is not found, please check it is installed"
    exit 1
fi

# The commands must be run on each module directory separately,
# otherwise tools confuse the "current" module
for paths in \
    "clarify-sdk" \
    "clarify-cli" \
    "tests/python/" \
    "clarify/apps/quality_control" \
    "clarify/apps/analytics_report" \
    ; do
    ${BLACK} -- ${paths}
    ${ISORT} -- ${paths}
done