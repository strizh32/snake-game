<template lang="pug">
    #app.app(:class="rootClasses")
        .cells
            .row(v-for="(row, yPos) in cells")
                .cell(
                    v-for="(cell, xPos) in row"
                    :class="getCellClasses([xPos, yPos])"
                    :data-xPos="xPos"
                    :data-yPos="yPos"
                )
            .game-over-bg(v-if="isGameOver")
                button
                    span(@click="restartGame") Начать заново
        .buttons
            button
                span(v-if="isGameStarted" @click="restartGame") Начать заново
                span(v-else @click="startGame") Начать игру
            button(@click="pauseGame" v-if="isGameStarted")
                span(v-if="isGamePaused") Продолжить игру
                span(v-else) Пауза
</template>

<script lang="ts">
import Vue from "vue";

type Coordinate = [number, number];

interface KeyboardEventListener {
  (evt: KeyboardEvent): void;
}

interface Data {
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
}

function isCoordsEqual(coordLeft: Coordinate, coordRight: Coordinate): boolean {
  return coordLeft[0] === coordRight[0] && coordLeft[1] === coordRight[1];
}

function isArrayContainsCoord(arr: Coordinate[], coord: Coordinate): boolean {
  return undefined !== arr.find((c: Coordinate) => isCoordsEqual(c, coord));
}

function getRandomInteger(min: number, max: number, excludedNumbers: number[] = []): number {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  const result = Math.round(rand);
  if (excludedNumbers.length && excludedNumbers.includes(result)) {
    return getRandomInteger(min, max, excludedNumbers);
  } else {
    return result;
  }
}

function getInitialData(size: number): Data {
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
    appleCoordinate: [
      getRandomInteger(0, size - 1),
      getRandomInteger(0, size - 1)
    ],
    speed: 5,
    cells,
    isGameOver: false,
    isGamePaused: false,
    isGameStarted: false,
    keyboardEventHandler: null,
    interval: null
  };
}

const size = 20;

export default Vue.extend({
  name: "App",
  data: (): Data => getInitialData(size),
  computed: {
    rootClasses (): Record<string, boolean> {
      return {
        [`direction-${this.direction}`]: true
      }
    }
  },
  methods: {
    getCellClasses(coord: Coordinate): Record<string, boolean> {
      return {
        leading: isCoordsEqual(coord, this.snakeCoordinates[0]), // первый
        contained: isArrayContainsCoord(this.snakeCoordinates, coord), // в змейке
        apple: isCoordsEqual(coord, this.appleCoordinate)
      };
    },
    move(): void {
      if (this.isGamePaused) return;

      let nextCell: null | Coordinate = null;

      switch (this.direction) {
        case "up":
          nextCell = [
            this.snakeCoordinates[0][0],
            this.snakeCoordinates[0][1] - 1
          ];
          break;
        case "down":
          nextCell = [
            this.snakeCoordinates[0][0],
            this.snakeCoordinates[0][1] + 1
          ];
          break;
        case "left":
          nextCell = [
            this.snakeCoordinates[0][0] - 1,
            this.snakeCoordinates[0][1]
          ];
          break;
        case "right":
          nextCell = [
            this.snakeCoordinates[0][0] + 1,
            this.snakeCoordinates[0][1]
          ];
          break;
      }

      if (nextCell) {
        const lastIndex = (size - 1);
        /**
         * If out of boundaries, finish game
         */
        if (
                nextCell[0] > lastIndex ||
                nextCell[1] > lastIndex ||
                nextCell[0] < 0 ||
                nextCell[1] < 0
        ) {
          return this.finishGame();
        }
        if (isArrayContainsCoord(this.snakeCoordinates, nextCell)) {
          return this.finishGame();
        }
        this.snakeCoordinates.unshift(nextCell);
        if (isCoordsEqual(nextCell, this.appleCoordinate)) {
          this.spawnNewApple();
        } else {
          this.snakeCoordinates.pop();
        }
      }
    },
    spawnNewApple(): void {
      this.appleCoordinate = [
        getRandomInteger(0, size - 1, [this.appleCoordinate[0]]),
        getRandomInteger(0, size - 1, [this.appleCoordinate[1]])
      ];
    },
    finishGame(): void {
      this.isGamePaused = false;
      this.isGameStarted = false;
      this.isGameOver = true;
      this.interval && clearInterval(this.interval);
      this.interval = null;

      if (this.keyboardEventHandler) {
        window.removeEventListener("keyup", this.keyboardEventHandler, false);
        this.keyboardEventHandler = null;
      }
    },
    startGame(): void {
      this.isGameOver = false;
      this.isGamePaused = false;
      this.isGameStarted = true;
      this.interval = setInterval(this.move, 1000 / this.speed);
      this.handleKeyboardEvent();
    },
    restartGame (): void {
      this.finishGame();
      this.$nextTick(() => {
        Object.assign(this.$data, getInitialData(size));
      });
    },
    pauseGame(): void {
      this.isGamePaused = !this.isGamePaused;
    },
    handleKeyboardEvent(): void {
      this.keyboardEventHandler = (e: KeyboardEvent) => {
        if (this.isGamePaused) return;

        switch (e.code) {
          /**
           * Pressing UP/DOWN/LEFT/RIGHT keys
           */
          case "ArrowLeft":
            ["up", "down"].includes(this.direction) &&
              (this.direction = "left");
            break;
          case "ArrowRight":
            ["up", "down"].includes(this.direction) &&
              (this.direction = "right");
            break;
          case "ArrowUp":
            ["left", "right"].includes(this.direction) &&
              (this.direction = "up");
            break;
          case "ArrowDown":
            ["left", "right"].includes(this.direction) &&
              (this.direction = "down");
            break;
          /**
           * Pause game when pressing SPACE key
           */
          case "Space":
            this.pauseGame();
            break;
        }
      };
      this.$nextTick(() => {
        if (this.keyboardEventHandler) {
          window.addEventListener("keyup", this.keyboardEventHandler, false);
        }
      });
    }
  },
  destroyed() {
    this.finishGame();
  }
});
</script>

<style lang="scss">
$border-color: #bbb;
.app {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

.row {
  font-size: 0;
  &:not(:last-child) {
    border-bottom: 1px solid $border-color;
  }
}

.cells {
  border: 1px solid $border-color;
  display: inline-block;
  position: relative;
}

.cell {
  background: white;
  height: 30px;
  width: 30px;
  display: inline-block;
  font-size: 0;
  transition: background-color 150ms;
  &:not(:last-child) {
    border-right: 1px solid $border-color;
  }
  &.contained {
    background: orange;
    transition: none;
  }
  &.leading {
    $b-rad: 12px;
    background: green;
    transition: none;
    .direction-up & {
        border-radius: $b-rad $b-rad 0 0;
    }
    .direction-down & {
        border-radius: 0 0 $b-rad $b-rad;
    }
      .direction-right & {
          border-radius: 0 $b-rad $b-rad 0;
      }
      .direction-left & {
          border-radius: $b-rad 0 0 $b-rad;
      }
  }
  &.apple {
    background: red;
  }
}

.game-over-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
