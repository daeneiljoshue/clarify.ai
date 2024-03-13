# Developer guide

Install testing requirements:

```bash
pip install -r requirements/testing.txt
```

Run unit tests:
```
cd clarify/
python manage.py test --settings clarify.settings.testing clrify-cli/
```

Install package in the editable mode:

```bash
pip install -e .
```