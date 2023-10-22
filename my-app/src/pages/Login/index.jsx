import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthProvider";
import api from "../../services/api";
import * as C from "./styles";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword ] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false)
  const [ msg, setMsg ] = useState("");
  const [ success, setSuccess ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";

    const storedLogin = localStorage.getItem("login");
    const storedPassword = localStorage.getItem("password");

    if (storedLogin && storedPassword) {
      setLogin(storedLogin);
      setPassword(storedPassword);
      setRememberPassword(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login) {
      setMsg("Preencha o login")
    } else if (!password) {
      setMsg("Preencha o password")
    } else {
       try {
        const response = await api.post("/auth", {
          login,
          password,
        });
        const { token, idUsers } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("idUsers", idUsers);
        localStorage.setItem("login", login);
        setUser({
          token,
          idUsers,
          login
        });
        const userObj = {
          token,
          idUsers,
          login
        };
        localStorage.setItem("user", JSON.stringify(userObj));

        if (rememberPassword) {
          localStorage.setItem("login", login);
          localStorage.setItem("password", password);
        } else {
          localStorage.removeItem("login");
          localStorage.removeItem("password");

        }

        setSuccess(true)
        setMsg("Login feito com sucesso!")
        setTimeout(() => {
          navigate("/home")
        }, 1500);
      } catch (err) {
        if (err.response.status === 400) {
          setMsg("Login ou password incorretos!")
        } else {
          setMsg("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        } 
      }
    }
  }
    
  const handleRememberPasswordChange = () => {
    setRememberPassword(!rememberPassword);
  };
  
  
  return (
    <C.Container>
      <C.Label>SELETIVO NEKI</C.Label>
      <C.Content>
        <Input
          type="login"
          placeholder="Login"
          value={login}
          onChange={(e) => [setLogin(e.target.value), setMsg("")]}
        />
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => [setPassword(e.target.value), setMsg("")]}
          />
          <C.passwordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️" }
          </C.passwordToggle>
        </div>
        <div style={{ display: "flex", justifyContent: "end", width: "100%", marginBottom: -5 }}>
          <div style={{display: "flex", height: 21, width: 90}}>
          <label style={{ fontSize: 11, alignSelf: "center", marginBottom: 3, marginLeft: 20, color: "#676767" }} htmlFor="rememberPassword">
            Salvar dados
          </label>
            <Input
              type="checkbox"
              checked={rememberPassword}
              onChange={handleRememberPasswordChange}
            />
          </div>
        </div>
        <C.labelMsg success={success}>{msg}</C.labelMsg>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/register">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Login;