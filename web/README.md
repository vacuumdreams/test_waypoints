### Waypoints WEB

An app build with React and Typescript, using [mapbox-g](https://docs.mapbox.com/mapbox-gl-js/api/)

#### Requirements

To get started, you will need to make sure you have [node](https://nodejs.org/en/download/) (>=v16.0.0) with npm (>=7.3.0).

*NOTE*: Alternatively, you can just run `docker-compose up` in the root of the repository, which will use the Dockerfiles to make sure everything is installed in your containers.

#### Local setup

Not much going on here, you just need to install your dependencies and off you go:

```
npm install
npm run sandbox
```

The sandbox mode is using a mock server, which generates fake data on the fly from the openapi specs in the root `http.yml`.

#### Code generation

The client code and data types are directly generated from the OpenAPI definitions, using the [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) library. To regenerate the client, you will need to run the following command:

```
npm run generate:client
```
