import { SpinnerStyled } from './styled';

export function Spinner() {
  return (
    <SpinnerStyled>
      <span className="left">
        <span className="anim"></span>
      </span>
      <span className="right">
        <span className="anim"></span>
      </span>
    </SpinnerStyled>
  );
}
