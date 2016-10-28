#cs419-frontend

##Scripts
[Scripts](./docs/scripts.md)

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
* Setup:  ```npm install```
  * Global installs needed:   ```npm i -g cross-env concurrently nodemon```

###StyleGuide

* [AirBnB React StyleGuide](./docs/Airbnb-React-JSX-Style-Guide.md)
* [StyleGuide Additions to AirBnB's](./docs/react-style-guide.md)
