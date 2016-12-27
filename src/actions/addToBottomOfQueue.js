// @flow

export type AddToBottomOfQueueAction = {
  type: 'add-to-bottom-of-queue',
  skullID: number,
  playerID: number,
};

export default function (skullID: number, playerID: number) {
  return {
    type: 'add-to-bottom-of-queue',
    skullID,
    playerID,
  };
}
