import styled from 'styled-components';

export const BookmarkStyled = styled.div`
  cursor: pointer;
  color: ${({ bookmarked }) => (bookmarked ? 'var(--danger)' : '#d6d8db')};
  ${({ icon }) =>
    icon
      ? 'display: inline-block;'
      : 'position: absolute;  right: 40px; font-size: 3em;'}
  top: ${({ bookmarked }) => (bookmarked ? '30px' : '60px')};
  transition: transform 0.3s ease;
  z-index: 1;

  &:hover {
    transform: scale(1.15);
  }
`;
