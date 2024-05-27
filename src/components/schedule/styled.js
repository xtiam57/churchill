import styled from 'styled-components';

export const EntryStyled = styled.div`
  background-color: ${(props) => (props.active ? '#fff' : '#f2f3f5')};
  border: ${(props) =>
    props.active ? 'solid 2px var(--primary)' : 'dotted 2px #dee2e6'};
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;
  padding: 0.5rem;

  left: auto !important;
  top: auto !important;

  &:last-child {
    margin-bottom: 0;
  }

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
    cursor: move;
  }

  .image {
    filter: ${(props) => (props.active ? 'none' : 'grayscale(1)')};
    object-fit: cover;
    flex-grow: 1;
    height: 38px;
    border: 1px solid #ced4da;
  }
`;
