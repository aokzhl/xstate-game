import styled from "styled-components";
import { GRID_SQUARE_SIZE } from "../../constants";
import { space } from "../../styles/space";

export enum ImageSizeType {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

const getDimension = (size?: ImageSizeType) => {
  if (size === ImageSizeType.Large) return space(20);
  if (size === ImageSizeType.Small) return space(10);
  return `${GRID_SQUARE_SIZE}px`;
};

interface PropsType {
  size?: ImageSizeType;
}

export const Image = styled.img<PropsType>`
  width: ${(props) => getDimension(props.size)};
  height: ${(props) => getDimension(props.size)};
  object-fit: contain;
`;
