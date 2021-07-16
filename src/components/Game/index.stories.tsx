import { Meta } from "@storybook/react/types-6-0";
import { Game } from ".";
import {
  fastForwardToLevel1Events,
  fastForwardToLevel2Events,
  fastForwardToLevel3Events,
  fastForwardToGameCompleteEvents,
  fastForwardToGameOverEvents,
} from "./fastForwardEvents";

export default {
  title: "Small Components/Game",
} as Meta;

export const Index = () => <Game />;

export const Level1 = () => (
  <Game fastForwardEvents={fastForwardToLevel1Events} />
);

export const Level2 = () => (
  <Game fastForwardEvents={fastForwardToLevel2Events} />
);

export const Level3 = () => (
  <Game fastForwardEvents={fastForwardToLevel3Events} />
);

export const GameComplete = () => (
  <Game fastForwardEvents={fastForwardToGameCompleteEvents} />
);

export const GameOver = () => (
  <Game fastForwardEvents={fastForwardToGameOverEvents} />
);
