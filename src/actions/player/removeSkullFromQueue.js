// @flow

export type RemoveSkullFromQueueAction = {
  type: 'remove-from-queue',
  index: number,
  playerID: string,
  matchID: string,
  scope: 'player',
};

export default function (index: number, playerID: string, matchID: string) {
  return {
    type: 'remove-from-queue',
    index,
    playerID,
    matchID,
    scope: 'player',
  };
}
