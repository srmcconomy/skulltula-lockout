// @flow

export type MoveSkullUpInQueueAction = {
  type: 'move-up-in-queue',
  index: number,
  playerID: number,
};

export default function (index: number, playerID: number) {
  return {
    type: 'move-up-in-queue',
    index,
    playerID,
  };
}
