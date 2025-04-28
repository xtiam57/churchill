import styled from 'styled-components';

export const EntryContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const EntryStyled = styled.div`
  border: solid 1px var(--gray);
  color: var(--gray);
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;

  .number {
    background-color: rgb(222, 226, 230);
    width: 26px;
    height: 26px;
    font-size: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
  }

  .image {
    filter: ${(props) => (props.active ? 'none' : 'grayscale(1)')};
    object-fit: cover;
    flex-grow: 1;
    height: 38px;
    border: 1px solid #ced4da;
  }
`;
