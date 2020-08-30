export type Coordinate = [number, number];

export interface KeyboardEventListener {
  (evt: KeyboardEvent): void;
}

export interface Data {
  direction: "up" | "down" | "left" | "right";
  snakeCoordinates: Coordinate[];
  appleCoordinate: Coordinate;
  speed: number;
  cells: number[][];
  isGameOver: boolean;
  isGamePaused: boolean;
  isGameStarted: boolean;
  keyboardEventHandler: KeyboardEventListener | null;
  interval: number | null;
  points: number;
}
