import {
  ActionStyled,
  ImageStyled,
  ItemStyled,
  ListStyled,
  TextStyled,
  TitleStyled,
} from './styled';

export function ListImage({ src, title, description }) {
  return (
    <ImageStyled title={title}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: 70,
          height: 70,
          borderRadius: 8,
          flex: '0 1 70px',
        }}
      />
      <div
        style={{
          flex: '1 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <strong
          style={{
            overflow: 'hidden',
            display: '-webkit-box',
            lineClamp: 1,
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}
        >
          {title}
        </strong>
        <p
          title={description}
          style={{
            overflow: 'hidden',
            display: '-webkit-box',
            lineClamp: 2,
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </ImageStyled>
  );
}

export const List = {
  ...ListStyled,
  Item: ItemStyled,
  Action: ActionStyled,
  Title: TitleStyled,
  Text: TextStyled,
  Image: ListImage,
};
