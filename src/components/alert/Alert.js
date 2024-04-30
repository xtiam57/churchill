import { AlertStyled } from './styled';

export function Alert({ presenting = false, label = '', sublabel = '' }) {
  return (
    <AlertStyled presenting={presenting}>
      <strong>{presenting ? label : 'Logo'}</strong>
      {presenting && sublabel && <span className="d-block">{sublabel}</span>}
    </AlertStyled>
  );
}
