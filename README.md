# Waypoints app

The repo contains a a go api and a react application, and defines a docker environment to run them in.

### The funk



### Setup

The environment variables needed for the docker compose  to run successfully:

```
export HOST=localhost
export POSTGRES_PORT=5432
export POSTGRES_USER=lol
export POSTGRES_PASSWORD=givemecatmemes
```

*NOTE*: If you have a local postgres server running, you will need to set a different port than 5432 to avoid clashes.

When you're all set, you can spin up the environment:

```
docker-compose up
```

After all services are running, go and check out `localhost:80` for the result.

### Local development

There are more detailed descriptions in  each folder's root:

- [API](/api)
- [WEB](/web)

### The funk

Make sure you check it out on both light and dark OS theme!
