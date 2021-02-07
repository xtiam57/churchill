import styled from 'styled-components';

const BookmarkStyled = styled.div`
  cursor: pointer;
  color: ${({ bookmarked }) => (bookmarked ? 'var(--danger)' : '#d6d8db')};
  ${({ icon }) =>
    icon
      ? 'display: inline-block;'
      : 'position: absolute;  right: 15px; font-size: 3em;'}
  top: ${({ bookmarked }) => (bookmarked ? '86px' : '108px')};
`;

export { BookmarkStyled };
