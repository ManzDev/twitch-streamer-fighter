import Phaser from "phaser";
import { width, height, SCALE } from "./modules/constants.js";
import { MainScene } from "./scenes/MainScene.js";
import { MenuUIScene } from "./scenes/MenuUIScene.js";

const config = {
  type: Phaser.AUTO,
  width,
  height,
  scale: {
    zoom: SCALE
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 200
      }
    }
  },
  // autoCenter: Phaser.Scale.Center.CENTER_VERTICALLY,
  pixelArt: true,
  backgroundColor: "#000000",
  scene: [MainScene, MenuUIScene]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
