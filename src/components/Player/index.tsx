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
import { space } from "../../styles/space";
import { Health } from "../Health";

const HealthLayout = styled.div`
  position: absolute;
  top: -${space(30)};
  left: -${space(2)};

  display: flex;
`;

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
  const { coords, health } = state.context;

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
    <>
      <HealthLayout>
        <Health health={health} />
      </HealthLayout>
      <Layout left={position[0]} top={position[1]}>
        <Image src={thiefGif} alt="thief" />
      </Layout>
    </>
  );
};
