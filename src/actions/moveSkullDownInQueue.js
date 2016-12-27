// @flow

export type MoveSkullDownInQueueAction = {
  type: 'move-down-in-queue',
  index: number,
  playerID: number,
};

export default function (index: number, playerID: number) {
  return {
    type: 'move-down-in-queue',
    index,
    playerID,
  };
}
