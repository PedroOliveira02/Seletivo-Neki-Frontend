import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button2 from "../../components/Button2";
import { default as Modal } from "../../components/Modal";
import { AuthContext } from "../../contexts/AuthProvider";
import api from "../../services/api";
import * as C from "./styles";
const Home = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const idUsers = localStorage.getItem("idUsers")
  const [userSkills, setUserSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const login = user.login;
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    document.title = "Home";
  }, [])

  const closeSkillsModal = () => {
    setShowModal(false);
  };

  const config = {
    headers: {
      Authorization: token ? `${token}` : ""
    }
  };

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await api.get(`/users/user-skills/${idUsers}`, config);
        setUserSkills(response.data); 
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
      setEditMode(false);
    } catch (error) {
      if (newLevel < 1 || newLevel > 10) {
        alert("Insira um level entre 1 e 10!")
      }
    }
  };

  const handleToggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleRemoveSkill = async (skillId) => {
    try {
      alert("Skill excluída com sucesso!")
      setTimeout(() => {
        
      }, 1500);
      
      await api.delete(`/user-skills/${skillId}`, config);
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
              padding: 10,
              }}>
              <img 
                style={{ width: 120, marginLeft: 4}}
                src={require(`../../assets/images/${skill.nome}.jpg`)}  
                alt="Imagem Skill"
              
              />
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
                marginBottom: 12
              }}>
                Excluir
              </div>
              <div style={{ textAlign: "center", marginTop: 7}}>
              <button style={{ 
                fontSize: 18, 
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 20,
                cursor: "pointer",
                color: "red"
              }} 
                onClick={() => handleRemoveSkill(skill.idUserSkills)}>
                X
              </button>
              </div>
            
          </C.ExcluirBox>
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
        <Button2 Text="Adicionar skill"  onClick={() => setOpenModal(true)}>
        

        </Button2>
        <Button2 Text="Cadastrar novo usuário" onClick={handleRegister}>

        </Button2>
        <Button2 Text="Logout" onClick={() => [logout(), navigate("/")]}>
        
        </Button2>
        
      </div>
      
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        Conteúdo do modal
      </Modal>
    </C.Content>
    </C.Container>
    {showModal && <Modal show={showModal} onClose={closeSkillsModal} skills={userSkills} />}
   </C.Page>
  );
};

export default Home;