import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <>
      <div className="App  h-[100vh]  flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
