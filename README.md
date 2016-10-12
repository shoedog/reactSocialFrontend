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
- Build: ```npm run build```
  - TODO: need webpack production build. Right now its using the dev config.
- Run Dev Mode:  ```npm run dev```
  - localhost:8080 -> webpack-dev-server running client
  - localhost:3000 -> Rendering Server
  - localhost:3001 -> API Server: only responds to /api request right now
- Linting: ```npm run eslint```
- DocGen: ```npm run esdoc```
- Test: ```npm run test```

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

* [Exploring the App](./docs/ExploringTheDemoApp.md)

### StyleGuide
---
* [AirBnB React StyleGuide](./docs/Airbnb-React-JSX-Style-Guide.md)
* [StyleGuide Additions to AirBnB's](./docs/react-style-guide.md)
