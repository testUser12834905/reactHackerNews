import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HackerNews</h2>
          <Routes>
            <Route path="" element={<Home />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
};

export default App;
