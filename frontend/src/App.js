import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.min.css";

import Routes from "./routes";

import AppProvider from "./auth";
import { store, persistor } from "./store";

function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </AppProvider>
  );
}

export default App;
