import { Button, Pane, TextInputField } from "evergreen-ui";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/login";
import { AuthContextType } from "../interface/login";

function FormLogin() {
  const { handleLogin, user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    if (user?.jwt) {
      navigate("/code");
    }
  }, []);

  return (
    <Pane
      background="#fff"
      width={400}
      borderRadius={6}
      padding={25}
      paddingBottom={55}
    >
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextInputField
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextInputField
          label="Senha"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button marginBottom={30} type="submit">
          {" "}
          Login
        </Button>
      </form>
      <Link to="/">Voltar</Link>
    </Pane>
  );
}

export default FormLogin;
