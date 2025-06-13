import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  flex-wrap: wrap;
  
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 150px;
`;

export const DropdownHeader = styled.div`
  height: 35px;
  padding: 0.3rem 0 0.3rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  display: flex;
  justify-content: ;
  align-items: center;
  box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.2);
  background-color:rgb(255, 255, 255);

  &:hover {
    color: #FF9D00;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: white;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.44);
  border-radius: 4px;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(241, 241, 241, 0);
  }

  &::-webkit-scrollbar-thumb {
    background: #007E2A; 
    cursor: pointer;
  }

`;

export const DropdownItem = styled.div`
  text-align: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: 5px;
  font-size: 1rem;
  transition: transform 0.3s ease;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  trasition: transform 0.3s ease;

  &:hover {
    color: #FF9D00;
  }
`;
