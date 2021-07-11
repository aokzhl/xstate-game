import React from "react";
import styled from "styled-components";
import { Meta } from "@storybook/react/types-6-0";
import { Image, ImageSizeType } from ".";
import { space } from "../../styles/space";
import thiefGif from "../../images/thief.gif";

export default {
  title: `Small Components/Image`,
} as Meta;

const Lyout = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: ${space(4)};
  }
`;

export const Index = () => (
  <Lyout>
    <Image src={thiefGif} alt="Thief" size={ImageSizeType.Large} />
    <Image src={thiefGif} alt="Thief" size={ImageSizeType.Medium} />
    <Image src={thiefGif} alt="Thief" />
  </Lyout>
);
