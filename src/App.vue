<template lang="pug">
    #app.app(:class="rootClasses")
        h1.title Snake Game
        .cells
            .rows
                .row(v-for="(row, yPos) in cells")
                    .cell(
                        v-for="(cell, xPos) in row"
                        :class="getCellClasses([xPos, yPos])"
                        :data-xPos="xPos"
                        :data-yPos="yPos"
                    )
            .game-over-bg(v-if="isGameOver")
                button.button.is-warning
                    span(@click="restartGame") Restart
            .controls
                .speed-controls
                    button.button.is-success(@click="speedUp") Speed Up
                    .speed {{ speed }}
                    button.button.is-info(@click="speedDown") Speed Down
                .points.is-size-2.has-text-weight-bold Points: {{ points }}
        .buttons.is-centered(v-if="!isGameOver")
            button.button.is-large(@click="clickStartGame")
                span(v-if="isGameStarted") Restart
                span(v-else) Start
            button.button.is-info.is-light(@click="pauseGame" v-if="isGameStarted")
                span(v-if="isGamePaused") Continue
                span(v-else) Pause
</template>

<script lang="ts">
import Vue from "vue";
import "bulma/css/bulma.css";
import { Data, Coordinate } from "@/types";
import {
  isCoordsEqual,
  getRandomCoordinate,
  getInitialData,
  isArrayContainsCoord
} from "@/functions";

/**
 * Game field will be 'size' X 'size'
 * For example, 15 x 15 cells
 */
const size = 15;

export default Vue.extend({
  name: "App",
  data: (): Data => getInitialData(size),
  computed: {
    rootClasses(): Record<string, boolean> {
      return {
        [`direction-${this.direction}`]: true
      };
    }
  },
  watch: {
    speed(newSpeed: number) {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = setInterval(this.move, 1000 / newSpeed);
      }
    }
  },
  methods: {
    getCellClasses(coord: Coordinate): Record<string, boolean> {
      return {
        leading: isCoordsEqual(coord, this.snakeCoordinates[0]),
        contained: isArrayContainsCoord(this.snakeCoordinates, coord),
        apple: isCoordsEqual(coord, this.appleCoordinate)
      };
    },
    speedUp(): void {
      if (this.speed < 60) {
        this.speed++;
      }
    },
    speedDown(): void {
      if (this.speed > 1) {
        this.speed--;
      }
    },
    addPoints() {
      this.points += this.speed * 100;
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
        const lastIndex = size - 1;
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
          this.addPoints();
        } else {
          this.snakeCoordinates.pop();
        }
      }
    },
    spawnNewApple(): void {
      this.appleCoordinate = getRandomCoordinate(0, size - 1, [
        ...this.snakeCoordinates,
        this.appleCoordinate
      ]);
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
    restartGame(): void {
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
    },
    clickStartGame(): void {
      this.isGameStarted ? this.restartGame() : this.startGame();
    }
  },
  destroyed() {
    this.finishGame();
  }
});
</script>

<style lang="scss" src="./App.scss"></style>
