cs419-frontend
---

###Setup
___
- Setup:  ```npm install```
- Global installs needed:
```npm i -g cross-env concurrently nodemon```


##Scripts
___
- Run all dev: ```npm run dev:serve```
    - builds and runs server on 3000, backend on 5000
- Build dev: ```npm run build:dev```
- API Backend Server(:5000): ```npm run dev-api```
    - runs Hapi Backend: path from project is '../cs419-backend...' for it to work
- Rendering Server(:3000): ```npm run start:dev```
- Run Dev Frontend via webpack( hot-reload UI):  ```npm run dev```
- Linting: ```npm run eslint```
- DocGen: ```npm run esdoc```
- Test: ```npm run test```
- Production Build: ```npm run build```
- Production Start:      ```npm start```
  - TODO: need to test production build.

##Docker
___
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
:star: :star:

##Directory Structure
---
```
├── bin     # Unused -> Has: server/server config files saved for reference
├── src                    # Application code + client.js( if client expands, it should get own Directory)
    ├── actions            # redux actions
    ├── components         # 'dumb' components -> stateless
    ├── containers         # 'smart' components -> hold/manage states/actions
    ├── lib                # middlewares, could add constants here
    ├── reducers           # reducers
    ├── server             # rendering server directory
    ├── utils              # utilities: mostly API/async related
```

---
## Documentation
___

* [Adding Routes, Client Structure, Stream](./docs/ExploringTheApp.md)

* Styling: ```import s from './[file].css;```
    * ```<div className={ s.[css-class or id] }/>```
* Combining multiple style classes: ```import classnames from classnames```
    * usage: https://github.com/JedWatson/classnames

### StyleGuide
---
* [AirBnB React StyleGuide](./docs/Airbnb-React-JSX-Style-Guide.md)
* [StyleGuide Additions to AirBnB's](./docs/react-style-guide.md)
