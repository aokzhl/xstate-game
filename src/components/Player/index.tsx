import React from "react";
import { useActor } from "@xstate/react";
import thiefGif from "../../images/thief.gif";
import { Image } from "../Image";
import styled from "styled-components";
import { coordsToPosition } from "../../util/coordsToPosition";
import {
  ArrowButtonClickedType,
  PlayerActorType,
} from "../../machines/playerMachine/types";
import { usePlayerControls } from "../../hooks/usePlayerControlls";
import { DirectionType } from "../../types";

interface LayoutPropsType {
  left: string;
  top: string;
}

const Layout = styled.div<LayoutPropsType>`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`;

interface PropsType {
  actor: any;
}

export const Player = ({ actor }: PropsType) => {
  const [state, send] = useActor(actor);
  // @ts-ignore
  const { coords } = state.context;

  const position = coordsToPosition(coords);

  usePlayerControls({
    handleArrowUp: () => {
      send({
        type: "ARROW_BUTTON_CLICKED",
        direction: DirectionType.Up,
      } as ArrowButtonClickedType);
    },
    handleArrowDown: () =>
      send({
        type: "ARROW_BUTTON_CLICKED",
        direction: DirectionType.Down,
      } as ArrowButtonClickedType),
    handleArrowLeft: () =>
      send({
        type: "ARROW_BUTTON_CLICKED",
        direction: DirectionType.Left,
      } as ArrowButtonClickedType),
    handleArrowRight: () =>
      send({
        type: "ARROW_BUTTON_CLICKED",
        direction: DirectionType.Right,
      } as ArrowButtonClickedType),
  });

  return (
    <Layout left={position[0]} top={position[1]}>
      <Image src={thiefGif} alt="thief" />
    </Layout>
  );
};
