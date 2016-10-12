import { renderToString } from 'react-dom/server';
import createStore from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/rootReducer';

//This store instance provides the initial state of our application
function handleRender(req, res) {

  const store = createStore(rootReducer);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState));
}

/* Changes for Preloading External Data
 *  example: e.q.: user info, other API stuff

  axios.get(/path)  //axios or Isomorphic-fetch implementation
  .then(){
    const params = qs.parse(req.query);

    //Use validator.js instead of parse for security
    const userData = parse_data(params.data) || apiResult || default;

    //Create Initial state
    let preloadedState = { userData };

    //create store instance
    const store = createStore(rootReducer, preloadedState);

    //Render component string
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )

    //Grab the initial state from Redux store
    const finalState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))
  }

*/
