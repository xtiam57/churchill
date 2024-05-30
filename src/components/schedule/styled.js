import styled from 'styled-components';

export const EntryContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const EntryStyled = styled.div`
  background-color: ${(props) => (props.active ? '#fff' : '#f2f3f5')};
  border: ${(props) =>
    props.active ? 'solid 2px var(--primary)' : 'dotted 2px #dee2e6'};
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;
  padding: 0.5rem;

  .number {
    background-color: rgb(222, 226, 230);
    width: 26px;
    height: 26px;
    font-size: 0.7rem;
    position: absolute;
    top: 4px;
    left: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
  }

  .sorting {
    border-radius: 0.25rem;
    overflow: hidden;
    margin-left: 0.5rem;

    button {
      border-radius: 0;
      height: 100%;
      width: 22px;
      padding: 0;
    }
  }

  .image {
    filter: ${(props) => (props.active ? 'none' : 'grayscale(1)')};
    object-fit: cover;
    flex-grow: 1;
    height: 38px;
    border: 1px solid #ced4da;
  }
`;
