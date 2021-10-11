import styled from 'styled-components';

export const AlertStyled = styled.div`
  background-color: ${({ presenting }) =>
    presenting ? 'var(--warning)' : 'transparent'};
  border: solid 1px transparent;
  position: absolute;
  border-color: ${({ presenting }) =>
    presenting ? 'var(--warning)' : 'var(--light)'};
  top: 80px;
  border-radius: 100px;
  font-size: 0.9em;
  color: ${({ presenting }) => (presenting ? '' : 'var(--light)')};

  z-index: 2;
  padding: 8px 25px;
  margin-left: 315px;
`;
