import { playerMachine } from "./../playerMachine/index";
import { GameEventType, GameStateType } from "./types";
import { createMachine } from "xstate";
import { choose, forwardTo, send } from "xstate/lib/actions";
import { isEqual } from "lodash";
import { monsterMachine } from "./../monsterMachinne/index";
import { DOOR_COORDS, TREASURE_COORDS } from "../../constants";

export const gameMachine = createMachine<null, GameEventType, GameStateType>(
  {
    id: "game",
    initial: "home",
    states: {
      home: {
        on: {
          START_BUTTON_CLICKED: "playing",
        },
      },
      playing: {
        invoke: {
          id: "playerActor",
          src: "playerMachine",
        },
        on: {
          PLAYER_DIED: "gameOver",
          PLAYER_GOT_TREASURE: "gameComplete",
        },
        initial: "level1",
        states: {
          level1: {
            on: {
              PLAYER_WALKED_THROUGH_DOOR: "level2",
              PLAYER_MOVED: {
                actions: `onPlayerMoved`,
              },
            },
          },
          level2: {
            invoke: {
              id: `monsterActor`,
              src: `monsterMachine`,
            },
            entry: `resetPlayerCoords`,
            on: {
              PLAYER_WALKED_THROUGH_DOOR: "level3",
              PLAYER_MOVED: {
                actions: `onPlayerMoved`,
              },
              ATTACK_PLAYER: {
                actions: "forwardToPlayer",
              },
            },
          },
          level3: {
            entry: `resetPlayerCoords`,
            on: {
              PLAYER_MOVED: {
                actions: `onPlayerMovedFinalLevel`,
              },
            },
          },
        },
      },
      gameOver: {
        on: {
          RESTART_BUTTON_CLICKED: "playing",
        },
      },
      gameComplete: {
        on: {
          HOME_BUTTON_CLICKED: "home",
        },
      },
    },
  },
  {
    actions: {
      onPlayerMoved: choose([
        {
          cond: `isPlayerAtDoor`,
          actions: `playerWalkedThroughDoor`,
        },
        {
          cond: `isMonster`,
          actions: `forwardToMonster`,
        },
      ]),

      resetPlayerCoords: send("RESET_PLAYER_COORDS", {
        to: `playerActor`,
      }),
      playerWalkedThroughDoor: send("PLAYER_WALKED_THROUGH_DOOR"),
      onPlayerMovedFinalLevel: choose([
        {
          cond: `isPlayerAtTreasure`,
          actions: `playerGotTreasure`,
        },
      ]),
      playerGotTreasure: send("PLAYER_GOT_TREASURE"),
      forwardToMonster: forwardTo(`monsterActor`),
      forwardToPlayer: forwardTo(`playerActor`),
    },
    guards: {
      isMonster: (context, event, condMeta) => {
        return !!condMeta.state.children.monsterActor;
      },
      isPlayerAtDoor: (_, event) => {
        if (event.type === "PLAYER_MOVED") {
          const { coords } = event;
          return isEqual(coords, DOOR_COORDS);
        }

        return false;
      },
      isPlayerAtTreasure: (_, event) => {
        if (event.type === "PLAYER_MOVED") {
          const { coords } = event;
          return isEqual(coords, TREASURE_COORDS);
        }

        return false;
      },
    },
    services: { playerMachine, monsterMachine },
  }
);
