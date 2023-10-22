import styled from 'styled-components';

export const StyledModal = styled.div`

  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 850px;
  max-height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
`;

export const LargeBox = styled.div`
  display: flex;
  height: 100px;
  background-color: #f0f2f5;
  width: 800px;
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
  width: 350px;
`;

export const LevelBox = styled.div`
  padding: 10px;
  border-right: 1px solid grey;
  width: 150px;
`;

export const AddBox = styled.div`
  padding: 10px;
  width: 150px;
`;
