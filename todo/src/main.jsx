import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Dmode from "./components/Dmode.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <PersistGate persistor={persistor}>
      <Provider store={store}>
      <Dmode>
          <App />
      </Dmode>
      </Provider>
    </PersistGate>
  
);
