import Phaser from "phaser";

export class MenuUIScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuUIScene", active: true });
  }

  preload() {
    this.load.image("menu-ui", "images/bgs/menu-ui.png");
  }

  create() {
    this.add.image(0, 0, "menu-ui").setOrigin(0, 0);
  }
}
