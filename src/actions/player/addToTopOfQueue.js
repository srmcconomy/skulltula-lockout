// @flow

export type AddToTopOfQueueAction = {
  type: 'add-to-top-of-queue',
  skullID: number,
  playerID: string,
  matchID: string,
  scope: 'client',
};

export default function (skullID: number, playerID: string, matchID: string) {
  return {
    type: 'add-to-top-of-queue',
    skullID,
    playerID,
    matchID,
    scope: 'client',
  };
}
