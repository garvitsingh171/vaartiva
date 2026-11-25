# AI worker (planned)

Reserved for independent FastAPI and Python services. It is not a Bun workspace and is not
initialized in VRT-011. Its future `pyproject.toml`, `uv.lock`, virtual environment, dependencies,
and validation commands will be managed with uv. Root JavaScript validation does not validate this
service. Worker requests and results must respect the restricted AI boundary in the architecture
documentation.
