import styled from 'styled-components';

export const AlertStyled = styled.div`
  background-color: ${({ presenting }) =>
    presenting ? 'var(--warning)' : 'transparent'};
  border: solid 1px transparent;
  position: absolute;
  border-color: ${({ presenting }) =>
    presenting ? 'var(--warning)' : 'var(--light)'};
  top: 75px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  font-size: 0.7em;
  color: ${({ presenting }) => (presenting ? '' : 'var(--light)')};
  z-index: 2;
  padding: 8px 15px;
  margin-left: 288px;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
