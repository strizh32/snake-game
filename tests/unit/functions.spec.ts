import { isCoordsEqual, isArrayContainsCoord } from "@/functions";
import { Coordinate } from "@/types";

describe("Test functions", () => {
  it("isCoordsEqual works correctly", () => {
    const coord1: Coordinate = [0, 1];
    const coord2: Coordinate = [0, 1];
    const coord3: Coordinate = [1, 0];
    const coord4: Coordinate = [10, 30];

    expect(isCoordsEqual(coord1, coord2)).toBe(true);
    expect(isCoordsEqual(coord1, coord3)).toBe(false);
    expect(isCoordsEqual(coord3, coord4)).toBe(false);
  });

  it("isArrayContainsCoord works correctly", () => {
    const coordArray: Coordinate[] = [
      [0, 1],
      [0, 2],
      [11, 12],
      [20, 30],
      [10, 30]
    ];

    const coord1: Coordinate = [0, 1];
    const coord2: Coordinate = [0, 1];
    const coord3: Coordinate = [1, 0];
    const coord4: Coordinate = [10, 30];
    const coord5: Coordinate = [30, 10];

    expect(isArrayContainsCoord(coordArray, coord1)).toBe(true);
    expect(isArrayContainsCoord(coordArray, coord2)).toBe(true);
    expect(isArrayContainsCoord(coordArray, coord3)).toBe(false);
    expect(isArrayContainsCoord(coordArray, coord4)).toBe(true);
    expect(isArrayContainsCoord(coordArray, coord5)).toBe(false);
  });
});
