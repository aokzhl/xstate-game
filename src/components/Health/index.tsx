import styled from "styled-components";
import { space } from "../../styles/space";
import { Image, ImageSizeType } from "../Image";
import hearthPng from "../../images/heart.png";

const Layout = styled.div`
  display: flex;

  > *:not(:first-child) {
    margin-left: ${space(2)};
  }
`;

interface PropsType {
  health: number;
}

export const Health = ({ health }: PropsType) => {
  return (
    <Layout>
      {Array(health)
        .fill(undefined)
        .map((_, idx) => (
          <Image
            key={idx}
            src={hearthPng}
            alt="heart"
            size={ImageSizeType.Small}
          />
        ))}
    </Layout>
  );
};
