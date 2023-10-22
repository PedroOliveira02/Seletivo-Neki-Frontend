import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import api from "../../services/api";
import * as C from "./styles";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword ] = useState(false);
  const [showConfPassword, setShowConfPassword ] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Registro";
  }, [])
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!login) {
      setMsg("Preencha o login!")
    } else if (!password) {
      setMsg("Preencha o password!")
    } else if (!passConf) {
      setMsg("Preencha a confirmação de password!")
    } else if (password !== passConf) {
      setMsg("Os passwords não são iguais!")
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        setMsg("Faça login para poder cadastrar um novo usuário")
      } else {
      const data = {
        login,
        password
      };

      const config = {
        headers: {
          Authorization: `${token}`
        }
      };

      try {
        await api.post("/users", data, config);
        setSuccess(true);
        setMsg("Usuário cadastrado com sucesso!")
        setTimeout(() => {
          navigate("/login")
        }, 1500);

      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          setMsg("Token inválido. Faça login novamente.");
        } else if (error.response.status === 400) {
          setMsg("Este login já está em uso, por favor escolha outro.");
        } else {
          setMsg("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        }
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
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Input
            type={showConfPassword ? "text" : "password"}
            placeholder="Confirme seu password"
            value={passConf}
            onChange={(e) => [setPassConf(e.target.value), setMsg("")]}
          />
          <C.passwordToggle onClick={() => setShowConfPassword(!showConfPassword)}>
            {showConfPassword ? "👁️" : "👁️" }
          </C.passwordToggle>
        </div>
        
        <C.labelMsg success={success}>{msg}</C.labelMsg>
        <Button Text="Inscrever-se" onClick={handleRegister} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Register;