import styled from 'styled-components';

export const BookmarkStyled = styled.div`
  cursor: pointer;
  color: ${({ bookmarked }) => (bookmarked ? 'var(--danger)' : '#d6d8db')};
  top: ${({ bookmarked }) => (bookmarked ? '45px' : '70px')};
  transition: transform 0.3s ease;
  z-index: 1;
  ${({ icon }) =>
    icon ? 'display: inline-block;' : 'position: absolute; right: 25px;'}

  svg {
    ${({ icon }) => (icon ? '' : 'font-size: 4rem;')}
  }

  &:hover {
    transform: scale(1.15);
  }
`;
