import './App.css';

import TrialPage from "./pages/TrialPage/TrialPge.js";
import LoginPage from "./pages/loginPage/LoginPage.js";
import ErrorPage from "./pages/ErrorPage/ErrorPage.js";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* <LoginPage /> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/trial" element={<TrialPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
