cs419-frontend
___

###Setup
- ```npm install```
- Global installs needed:
```npm i -g cross-env concurrently nodemon```


##Scripts
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
[Docker](./docs/docker.md)

##Directory Structure
[Directory Structure](./docs/directory.md)

##Documentation
* Add Route to:
    * routes.js
    * array of views in server/routes/index.js ( several lines about app.listen() near bottom )
* [Async Actions, Reducers, Api](./docs/async.md)

* Styling: ```import s from './[file].css;```
    * ```<div className={ s.[css-class or id] }/>```
* Combining multiple style classes: ```import classnames from classnames```
    * usage: https://github.com/JedWatson/classnames


###StyleGuide

* [AirBnB React StyleGuide](./docs/Airbnb-React-JSX-Style-Guide.md)
* [StyleGuide Additions to AirBnB's](./docs/react-style-guide.md)
