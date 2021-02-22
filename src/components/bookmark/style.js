import styled from 'styled-components';

const BookmarkStyled = styled.div`
  cursor: pointer;
  color: ${({ bookmarked }) => (bookmarked ? 'var(--danger)' : '#d6d8db')};
  ${({ icon }) =>
    icon
      ? 'display: inline-block;'
      : 'position: absolute;  right: 15px; font-size: 3em;'}
  top: ${({ bookmarked }) => (bookmarked ? '78px' : '108px')};
  transition: transform 0.3s ease;
  z-index: 1;

  &:hover {
    transform: scale(1.15);
  }
`;

export { BookmarkStyled };
