import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Button from '../Button';
import { AddBox, DescBox, LargeBox, NomeBox, StyledModal } from './styles';

export default function Modal({ isOpen, setModalOpen }) {

    const [ skills, setSkills ] = useState([]);
const token = localStorage.getItem("token");
const idUser = localStorage.getItem("idUsers");

const config = {
    headers: {
      Authorization: token ? `${token}` : ""
    }
  };

    useEffect(() => {
        const fetchUserSkills = async () => {
          try {
            const response = await api.get(`/skills`, config);
            setSkills(response.data);
          } catch (error) {
            console.error("Erro ao buscar as skills do usuário", error);
          }
        };
        fetchUserSkills();
      }, []);

      const handleAdicionar = async (skill) => {
        
          const token = localStorage.getItem("token");
          if (!token) {
            alert("Faça login para poder adicionar uma nova skill")
          } else {
          const data = {
            level: 1,
            usersDto: {
                idUsers: idUser,
            },
            skillsDto: {
                idSkills: skill.idSkills,
            },
          };
          console.log(idUser, skill.idSkills)
    
          const config = {
            headers: {
              Authorization: `${token}`
            }
          };
    
          try {
            await api.post("/user-skills", data, config);
            
            alert("Skill adicionada com sucesso!")
        
    
          } catch (error) {
            if (error.response.status === 401 || error.response.status === 403) {
              alert("Token inválido. Faça login novamente.");
            } else if (error.response.status === 400) {
              alert("Skill ja esta adicionada ao usuário");
            } else {
              alert("Ocorreu um erro no servidor. Tente novamente mais tarde.");
            }
          }
        
        }
      }

  if (isOpen) {
    return (
    
    

    
        <StyledModal>
    
      
    {skills.map((skill) => (
      <li style={{ listStyle: "none"}} key={skill.idUserSkills}>
        <LargeBox>
            
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
            <NomeBox>
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
             
            </NomeBox>
            
            <DescBox>
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
               
            </DescBox>
            
            <AddBox>
              <div style={{
                height: 20,
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: 10,
                fontWeight: "Bold",
                paddingTop: 2,
                marginBottom: 12
              }}>
                Adicionar
              </div>
              <div style={{ textAlign: "center", marginTop: 7}}>
              <button onClick={() => handleAdicionar(skill)} style={{ 
                fontSize: 18, 
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 20,
                cursor: "pointer",
                color: "green"
              }} 
                >
                +
              </button>
              </div>
            
          </AddBox>
          
         
           
            
          
        </LargeBox>
      
      
      </li>
    ))}
      

       
      
      <Button Text="Fechar" onClick={setModalOpen} />
    
    </StyledModal>
    );
  }

  return null;
}
