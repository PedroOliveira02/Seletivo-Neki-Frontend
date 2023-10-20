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
  const [ msg, setMsg ] = useState("");
  const [ success, setSuccess ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
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
        const { token } = response.data;
        // localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        setUser({
          login,
          token,
        });
        const userObj = {
          login,
          token,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
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
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setMsg("")]}
        />
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