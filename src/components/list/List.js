import { ListImage } from './ListImage';
import {
  ActionStyled,
  ItemStyled,
  ListStyled,
  TextStyled,
  TitleStyled,
} from './styled';

export const List = {
  ...ListStyled,
  Item: ItemStyled,
  Action: ActionStyled,
  Title: TitleStyled,
  Text: TextStyled,
  Image: ListImage,
};
