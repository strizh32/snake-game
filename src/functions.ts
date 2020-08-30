import { Data, Coordinate } from "@/types";

export function isCoordsEqual(
  coordLeft: Coordinate,
  coordRight: Coordinate
): boolean {
  return coordLeft[0] === coordRight[0] && coordLeft[1] === coordRight[1];
}

export function isArrayContainsCoord(
  arr: Coordinate[],
  coord: Coordinate
): boolean {
  return undefined !== arr.find((c: Coordinate) => isCoordsEqual(c, coord));
}

export function getRandomCoordinate(
  min: number,
  max: number,
  excludedCoordinates: Coordinate[] = []
): Coordinate {
  const randX = min - 0.5 + Math.random() * (max - min + 1);
  const randY = min - 0.5 + Math.random() * (max - min + 1);
  const result: Coordinate = [Math.round(randX), Math.round(randY)];
  if (excludedCoordinates.length && excludedCoordinates.includes(result)) {
    return getRandomCoordinate(min, max, excludedCoordinates);
  } else {
    return result;
  }
}

export function getInitialData(size: number): Data {
  /**
   * size X size клеток
   */
  const cells = new Array(size).fill(0).map(() => new Array(size).fill(0));

  return {
    direction: "down",
    snakeCoordinates: [
      [0, 3],
      [0, 2],
      [0, 1],
      [0, 0]
    ],
    appleCoordinate: getRandomCoordinate(0, size - 1),
    speed: 5,
    cells,
    isGameOver: false,
    isGamePaused: false,
    isGameStarted: false,
    keyboardEventHandler: null,
    interval: null
  };
}
