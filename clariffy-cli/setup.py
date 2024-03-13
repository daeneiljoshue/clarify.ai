
import os.path as osp
import re

from setuptools import find_packages, setup


def find_version(project_dir=None):
    if not project_dir:
        project_dir = osp.dirname(osp.abspath(__file__))

    file_path = osp.join(project_dir, "version.py")

    with open(file_path, "r") as version_file:
        version_text = version_file.read()

    # PEP440:
    # https://www.python.org/dev/peps/pep-0440/#appendix-b-parsing-version-strings-with-regular-expressions
    pep_regex = r"([1-9]\d*!)?(0|[1-9]\d*)(\.(0|[1-9]\d*))*((a|b|rc)(0|[1-9]\d*))?(\.post(0|[1-9]\d*))?(\.dev(0|[1-9]\d*))?"
    version_regex = r"VERSION\s*=\s*.(" + pep_regex + ")."
    match = re.match(version_regex, version_text)
    if not match:
        raise RuntimeError("Failed to find version string in '%s'" % file_path)

    version = version_text[match.start(1) : match.end(1)]
    return version


BASE_REQUIREMENTS_FILE = "requirements/base.txt"


def parse_requirements(filename=BASE_REQUIREMENTS_FILE):
    with open(filename) as fh:
        return fh.readlines()


BASE_REQUIREMENTS = parse_requirements(BASE_REQUIREMENTS_FILE)

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="clarify-cli",
    version=find_version(project_dir="src/clarify_cli"),
    description="Command-line client for CLARIFY",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/clarify-ai/clarify/",
    package_dir={"": "src"},
    packages=find_packages(where="src"),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=BASE_REQUIREMENTS,
    entry_points={
        "console_scripts": [
            "clarify-cli=clarify_cli.__main__:main",
        ],
    },
    include_package_data=True,
)