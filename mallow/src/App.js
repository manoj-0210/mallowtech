import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { store } from "./redux/store/store";
import UserScreen from "./components/UserTable/UserScreen";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
