import { NUMBER_OF_GRID_ROWS } from "../constants/index";
import { flatten } from "lodash";
import { NUMBER_OF_GRID_COLUMNS } from "../constants";

export const gridCoordsList = flatten(
  Array(NUMBER_OF_GRID_COLUMNS)
    .fill(undefined)
    .map((_, colIdx) =>
      Array(NUMBER_OF_GRID_ROWS)
        .fill(undefined)
        .map((_, rowIdx) => [colIdx, rowIdx])
    )
);
