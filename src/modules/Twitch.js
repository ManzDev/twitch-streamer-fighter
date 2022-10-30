import Phaser from "phaser";

export const client = new window.tmi.Client({
  channels: ["ManzDev"]
});

client.connect();

export const twitch = new Phaser.Events.EventEmitter();

client.on("message", (channel, tags, message, self) => {
  const isCommand = message.startsWith("!animar");

  if (!isCommand) return;

  const itemType = message.split(" ", 2)[1] ?? "html";
  const nickname = tags["display-name"];

  console.log({ nickname, itemType });

  twitch.emit("command", { nickname, itemType });
});
