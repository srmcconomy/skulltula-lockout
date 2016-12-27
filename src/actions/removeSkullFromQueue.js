// @flow

export type RemoveSkullFromQueueAction = {
  type: 'remove-from-queue',
  index: number,
  playerID: number,
};

export default function (index: number, playerID: number) {
  return {
    type: 'remove-from-queue',
    index,
    playerID,
  };
}
