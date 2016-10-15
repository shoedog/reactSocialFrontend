cs419-frontend
---

Welcome.

###Windows OS Environment
---
- Setup:  ```npm install```
- Build: ```npm run win-build```
- Run:  ```npm run win-dev```

Webpack-dev-server (localhost:8080) & node server (localhost:3000)

###Mac OS Environment
---
- Setup:  ```npm install```
- Global installs needed:
```npm i -g cross-env```
```npm i -g concurrently```
```npm i -g nodemon```
- Run Dev Mode:  ```npm run dev```
  - webpack-dev-server build & serve: ```npm run webpack-devserver```
  - Rendering Server(:3000): ```npm run nodemon```
  - API Server(:3001): ```npm run dev-api```
    - only responds with text to request right now
    - could integrate as HAPI
- Linting: ```npm run eslint```
- DocGen: ```npm run esdoc```
- Test: ```npm run test```
- Build: ```npm run build```
  - webpack production build. The dev & prod configs are combined for simplicity.
- Run:      ```npm start```
  - TODO: need to test production build.

Docker
---
To build the image, run
``` docker build -t moonwalk-frontend . ```

Once this has completed, run this command to run the app:
```
docker run -t -p 3000:3000 -p 8050:8050  moonwalk-frontend
```

Navigate to 0.0.0.0:3000 in your browser.

You can use the command ```docker ps``` to see all running docker containers.
Then you can stop a container by running ```docker stop <container id>``` command.
If you want to build again, first remove the container:
 ```docker rm <container id>```
NB: you can find all exited containers with the command``` docker ps -a```
and then to see all docker images on your machine, use
```docker images```

You can delete images with ```docker rmi <image id>```

To get a shell inside the docker container:
```
docker exec -ti <container id> bash
```


:star: :star: Dev and Production Builds split CSS & JS. They are mapped via webpack-assets.json in ./Assets Folder.
Also in ./Assets is client-config.json It lets us plug things into the html we render. See https://github.com/WebbyLab/itsquiz-wall.


###Directory Structure
---
```
├── bin     # Has: apiServer, renderingServer, some configs, & unused express webpack-dev-server
├── src                    # Application code + client.js( if client expands, it should get own Directory)
    ├── actions            # redux actions
    ├── components         # 'dumb' components -> stateless
    ├── containers         # 'smart' components -> hold/manage states/actions
    ├── lib                # middlewares, could add constants here
    ├── store              # configure store
    ├── rootReducer.js     # reducers reducers
    ├── routes.js          # routing
    ├── client.js          # client
```

---
### Documentation

* [Exploring the App](./docs/ExploringTheApp.md)

* Styling: ```require('!style!css![path-to-css-file].css');```
    * ```<div className="styleFromStyleSheet"/>```
* Combining multiple style classes: ```import classnames from classnames```
    * usage: https://github.com/JedWatson/classnames

### StyleGuide
---
* [AirBnB React StyleGuide](./docs/Airbnb-React-JSX-Style-Guide.md)
* [StyleGuide Additions to AirBnB's](./docs/react-style-guide.md)
