import Phaser from "phaser";
import { width, height } from "../modules/constants.js";
import { twitch } from "../modules/Twitch.js";

const items = {};

window.items = items;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene", active: true });
  }

  preload() {
    this.load.image("office", "images/bgs/office.png");
    this.load.image("internet-explorer", "images/items/internet-explorer.png");
    this.load.image("player", "images/sprites/player.png");
  }

  overlap(player, item) {
  }

  create() {
    this.add.image(0, 0, "office").setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, width, height - 10);

    this.player = this.add.image(140, 170, "player");
    this.physics.world.enable(this.player);
    this.player.body.setCollideWorldBounds();

    this.player2 = this.add.image(240, 170, "player").setFlipX(true);
    this.physics.world.enable(this.player2);
    this.player2.body.setCollideWorldBounds();

    twitch.on("command", ({ nickname, message }) => {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, 50);
      const sign = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
      const vx = Phaser.Math.Between(100, 250) * sign;
      const bounce = Math.random();
      const isIncluded = items[nickname];
      if (!isIncluded) {
        const item = this.add.image(x, y, "internet-explorer");
        this.physics.world.enable(item);
        item.body
          .setCollideWorldBounds()
          .setBounce(bounce)
          // .setFriction(1, 1)
          .setDrag(0, 0)
          .setVelocityX(vx);
        items[nickname] = item;
      }
    });
  }

  update() {
    const itemnames = Object.values(items);

    this.physics.world.overlap(this.player, itemnames, (obj1, obj2) => this.overlap(obj1, obj2));

    const isTouchPlayer = this.player.body.touching.none === false;
    this.player.clearTint();
    isTouchPlayer && this.player.setTintFill(423383, 184148, 143345, 133834);
  }
}
