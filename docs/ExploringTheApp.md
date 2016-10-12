## Client
---
1. Client get state from server in client.js and creates
  * store
  * browserHistory
  * hydrates styles
  * renders `<Root />` with store and history
2. Root.js
  * Puts store in `<Provider/>`
  * Puts history and routes in `<Router/>`
3. Routes.js
  * Adds App container component
  * Index Route and other routes
4. App.js
  * Main component/page/app container
  * Global styles, header, footer, data, functions that will be shared
