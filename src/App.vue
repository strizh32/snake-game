<template lang="pug">
    #app
        .cells
            .row(v-for="(row, yPos) in cells")
                .cell(
                    v-for="(cell, xPos) in row"
                    :class="getCellClasses([xPos, yPos])"
                    :data-xPos="xPos"
                    :data-yPos="yPos"
                )
</template>

<script lang="ts">
import Vue from "vue";

type Coordinate = [number, number];

interface Data {
  direction: "up" | "down" | "left" | "right";
  currentPosition: Coordinate;
  trace: Coordinate[];
  speed: number;
  cells: number[][];
  isGameOver: boolean;
}

const size = 20;

const cells = new Array(size).fill(0).map(() => new Array(size).fill(0));

let interval: number | undefined;

function isCoordsEqual (coordLeft: Coordinate, coordRight: Coordinate): boolean {
  return coordLeft[0] === coordRight[0] && coordLeft[1] === coordRight[1];
}

function isArrayContainsCoord (arr: Coordinate[], coord: Coordinate): boolean {
  return undefined !== arr.find((c: Coordinate) => isCoordsEqual(c, coord));
}

export default Vue.extend({
  name: "App",
  data: (): Data => ({
    direction: "down",
    currentPosition: [0, 0],
    trace: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    speed: 0.5,
    cells,
    isGameOver: false,
  }),
  methods: {
    getCellClasses (coord: Coordinate): Record<string, boolean> {
      return {
        current: isCoordsEqual(coord, this.currentPosition),
        passed: isArrayContainsCoord(this.trace, coord)
      };
    },
    move () {
      switch (this.direction) {
        case "up":
          this.currentPosition = [this.currentPosition[0], this.currentPosition[1] - 1];
          break;

        case "down":
          this.currentPosition = [this.currentPosition[0], this.currentPosition[1] + 1];
          break;

        case "left":
          this.currentPosition = [this.currentPosition[0] - 1, this.currentPosition[1]];
          break;

        case "right":
          this.currentPosition = [this.currentPosition[0] + 1, this.currentPosition[1]];
          break;
      }
    },
    finishGame (): void {
      this.isGameOver = true;
      interval && clearInterval(interval);
    }
  },
  mounted () {
    // interval = setInterval(this.move, 1000 / this.speed);
  }
});
</script>

<style lang="scss">
    $border-color: #bbb;
#app {
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
}

.cell {
    background: white;
    height: 30px;
    width: 30px;
    display: inline-block;
    font-size: 0;
    &:not(:last-child) {
        border-right: 1px solid $border-color;
    }
    &.passed {
        background: orange;
    }
    &.current {
        background: green;
    }
}
</style>
