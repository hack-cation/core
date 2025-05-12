# .hack//servers

## Voter Server

### Prep

Before running the server, make sure you create a .env from the [.env.example](.env.example). 

The default values are valid and will work if you choose to keep them.

### Server Docs

The server documentation (openapi doc) is available at [./docs/openapi/voter/openapi.yml](./docs/openapi/voter/openapi.yml).

### Running the Server

Navigate to [/docker/dev](../docker/dev) and run `docker compose up --build -d`