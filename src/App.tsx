import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/login";
import { AuthContextType } from "./interface/login";
import Code from "./pages/Code";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Plan from "./pages/Plan";
import User from "./pages/User";

function App() {
  const { user } = useContext(AuthContext) as AuthContextType;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      {user?.jwt && (
        <>
          <Route path="code" element={<Code />} />
          <Route path="plan" element={<Plan />} />
          {user.adm && <Route path="user" element={<User />} />}
        </>
      )}
    </Routes>
  );
}

export default App;
