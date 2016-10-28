cs419-frontend
___

###Setup
- ```npm install```
- Global installs needed:
```npm i -g cross-env concurrently nodemon```

___
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
___
##[Docker](./docs/docker.md)
___
##[Directory Structure](./docs/director.md)
___
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
