import styled from "styled-components";

export const Page = styled.div`
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  margin-top: 20px;
  font-size: 35px;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  
`;

export const LargeBox = styled.div`
  display: flex;
  height: 100px;
  background-color: #f0f2f5;
  width: 1000px;
  border: 1px solid grey;
  margin-bottom: 15px;
  margin-top: 10px;
  border-radius: 10px;
`;

export const NomeBox = styled.div`
  padding: 10px;
  border-right: 1px solid grey;
  border-left: 1px solid grey;
  width: 150px;
`;

export const DescBox = styled.div`
  padding: 10px;
  border-right: 1px solid grey;
  width: 400px;
`;

export const LevelBox = styled.div`
  padding: 10px;
  border-right: 1px solid grey;
  width: 150px;
`;

export const ExcluirBox = styled.div`
  padding: 10px;
  width: 150px;
`;
