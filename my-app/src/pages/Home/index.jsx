import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button2 from "../../components/Button2";
import { AuthContext } from "../../contexts/AuthProvider";
import api from "../../services/api";
import * as C from "./styles";

const Home = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const idUsers = localStorage.getItem("idUsers")
  const [userSkills, setUserSkills] = useState([]);
  const token = localStorage.getItem("token");
  const login = user.login;

  const config = {
    headers: {
      Authorization: token ? `${token}` : ""
    }
  };

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await api.get(`/users/user-skills/${idUsers}`, config);
        setUserSkills(response.data); // Atualiza o estado com as skills recebidas da API
      } catch (error) {
        console.error("Erro ao buscar as skills do usuário", error);
      }
    };
    fetchUserSkills();
  }, [idUsers]);
  

  const [editMode, setEditMode] = useState(false);

  const handleLevelChange = async (event, skill) => {
    const newLevel = event.target.textContent;
    try {
      const response = await api.put(
        `/user-skills/${skill.idUserSkills}`,
        { level: newLevel },
        config
      );
      setUserSkills((prevState) =>
        prevState.map((s) =>
          s.idUserSkills === skill.idUserSkills
            ? { ...s, level: newLevel }
            : s
        )
      );
      setEditMode(false); // Desativar o modo de edição após salvar
    } catch (error) {
      if (newLevel < 1 || newLevel > 10) {
        alert("Insira um level entre 1 e 10!")
      }
    }
  };

  const handleToggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  

  // const handleLevelChange = async (event, skill) => {

  //   const newLevel = event.target.texteContent;

  //   try {
  //     const response = await api.put(`/user-skills/${skill.idUserSkills}`, { level: newLevel }, config)
  //     setUserSkills((prevState) =>
  //       prevState.map((s) => (s.idUserSkills === skill.idUserSkills ? { ...s, level: newLevel } : s))
  //     );
  //   } catch (error) {
  //     console.error("Erro ao atualizar o nível da habilidade", error);
  //   }
  // }

  const handleRemoveSkill = async (skillId) => {
    try {
      alert("Skill excluída com sucesso!")
      setTimeout(() => {
        
      }, 1500);
      // Fazer uma solicitação DELETE para remover a habilidade no servidor
      const response = await api.delete(`/user-skills/${skillId}`, config);
      

      // Atualizar o estado local para remover a habilidade
      setUserSkills((prevState) => prevState.filter((s) => s.idUserSkills !== skillId));
      
    } catch (error) {
      console.error("Erro ao remover a habilidade", error);
    }
  };

  const handleRegister = () => {
    navigate("/Register")
  }

  

  return (
   <C.Page>
     <C.Container>

<C.Title>SELETIVO NEKI SKILLS</C.Title>
<div>Skills do usuário, {login} !</div>
  
  <C.Content>
  {userSkills.length === 0 ? (
    <C.Title>Usuário sem Skills</C.Title>
  ) : (
  <ul>
    {userSkills.map((skill) => (
      <li style={{ listStyle: "none"}} key={skill.idUserSkills}>
        <C.LargeBox>
            
            <div style={{  
              width: 150,
              padding: 10
              }}>
              Imagem
            </div>
            <C.NomeBox>
              <div style={{
                height: 20,
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: 10,
                fontWeight: "Bold",
                paddingTop: 2,
                marginBottom: 5
              }}>
                Nome
              </div>
              <div style={{
                textAlign: "center",
                // color: "grey",
                fontSize: 17,
                marginTop: 10
              }}>
              {skill.nome}
              </div>
             
            </C.NomeBox>
            
            <C.DescBox>
            <div style={{
                height: 20,
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: 10,
                fontWeight: "Bold",
                paddingTop: 2,
                marginBottom: 5
              }}>
            Descrição
              </div>
              <div style={{
                textAlign: "center",
                // color: "grey",
                fontSize: 12,
                marginTop: 5
              }}>
              {skill.descricao}
              </div>
               
            </C.DescBox>
            <C.LevelBox>
              <div style={{
                height: 20,
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: 10,
                fontWeight: "Bold",
                paddingTop: 2,
                marginBottom: 5
              }}>
                Level
              </div>
              <div style={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 37
              }}>
              {editMode ? (
              <span
                contentEditable={true}
                onBlur={(e) => handleLevelChange(e, skill)}
              >
                {skill.level}
              </span>
            ) : (
              skill.level
            )}{" "}
          </div>
          <button style={{
            marginLeft: 47,
            fontSize: 10,
            paddingLeft: 5,
            paddingRight: 5,
            cursor: "pointer"
          }} 
          onClick={handleToggleEditMode}>
            {editMode ? "Salvar" : "Editar"}
          </button>
               
              
          
            </C.LevelBox>
            <C.ExcluirBox>
              <div style={{
                height: 20,
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: 10,
                fontWeight: "Bold",
                paddingTop: 2,
                marginBottom: 5
              }}>
                Excluir
              </div>
              <div style={{ textAlign: "center", marginTop: 7}}>
              <button style={{ 
                fontSize: 35, 
                padding: 3,
                paddingLeft: 7,
                paddingRight: 7,
                borderRadius: 20,
                cursor: "pointer"
              }} 
                onClick={() => handleRemoveSkill(skill.idUserSkills)}>
                X
              </button>
              </div>
            
          </C.ExcluirBox>
          
          {/* Descrição Level Excluir */}
           
            
          
        </C.LargeBox>
      
      
      </li>
    ))}
      </ul>
)}
 
      <div style={{ 
          display: "flex",
          width: "100%",
          justifyContent: "space-between"

        }}>
        <Button2 Text="Adicionar skill">

        </Button2>
        <Button2 Text="Cadastrar novo usuário" onClick={handleRegister}>

        </Button2>
        <Button2 Text="Logout" onClick={() => [logout(), navigate("/")]}>

        </Button2>
      </div>
    
    </C.Content>
    </C.Container>
   </C.Page>
  );
};

export default Home;