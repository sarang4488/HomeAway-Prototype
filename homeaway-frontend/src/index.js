import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Login from "./components/login";
import Register from "./components/register";
import promise from "redux-promise";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers";

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));
//createStoreWithMiddleware(RootReducer)

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <div>
//         <Switch>
//           <Route path="/book/new" component={NewBook} />
//           <Route path="/" component={BooksIndex} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   </Provider>,
//   document.querySelector(".container")";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
