import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 150px;
`;

export const DropdownHeader = styled.div`
  padding: 0.3rem ;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(241, 241, 241, 0);
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }

`;

export const DropdownItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
