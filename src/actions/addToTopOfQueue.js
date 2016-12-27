// @flow

export type AddToTopOfQueueAction = {
  type: 'add-to-top-of-queue',
  skullID: number,
  playerID: number,
};

export default function (skullID: number, playerID: number) {
  return {
    type: 'add-to-top-of-queue',
    skullID,
    playerID,
  };
}
