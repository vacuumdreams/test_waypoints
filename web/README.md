### Waypoints WEB

An app build with React and Typescript, using [mapbox-g](https://docs.mapbox.com/mapbox-gl-js/api/)

#### Requirements

To get started, you will need to make sure you have [node](https://nodejs.org/en/download/) (>=v16.0.0) with npm (>=7.3.0).

*NOTE*: Alternatively, you can just run `docker-compose up` in the root of the repository, which will use the Dockerfiles to make sure everything is installed in your containers.

#### Local setup

Not much going on here, you just need to install your dependencies and off you go:

```
npm install
```

The app  can be run in a few different modes described below:

1. Sandbox mode

You can run the app in sandbox mode, with dynamically generated api responses with the [open-api-mocker](https://github.com/jormaechea/open-api-mocker) library:
```
npm run sandbox
```

2. Development mode
If you are developing both server and client, you want to get responses to  the client from the server, this is what you need:
```
npm  run start
```

3. Production mode
The app hosts a simple nodejs webserver, to be able to serve the built bundle as well. Currently this is used also in the docker environment for simplicity and consistency:

```
npm run build
npm run serve
```

#### Code generation

The client code and data types are directly generated from the OpenAPI definitions, using the [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) library. To regenerate the client, you will need to run the following command:

```
npm run generate:client
```

#### Architecture

The code is split into three folders. The `atoms` folder hosts dummy reusable react components for the UI, the `services` folder has most of the domain logic in a detached fashion, and the `app` folder hosts the code which brings the previous two together.

The app creates a user id into the browser's localStorage upon the first visit, which will be used instead of a proper auth when sending requests to the api.

The app displays a list of saved waypoint and a map with relevant markers. It allows you to search for locations using mapbox's geolocation search api, then upon selection it sends the coordinates to the host api to save.

The app supports rearranging saved waypoints using [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd).
