// @flow

export type AddToBottomOfQueueAction = {
  type: 'add-to-bottom-of-queue',
  skullID: number,
  playerID: string,
  matchID: string,
  scope: 'player',
};

export default function (skullID: number, playerID: string, matchID: string) {
  return {
    type: 'add-to-bottom-of-queue',
    skullID,
    playerID,
    matchID,
    scope: 'player',
  };
}
