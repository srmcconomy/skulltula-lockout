// @flow

export type MoveSkullDownInQueueAction = {
  type: 'move-down-in-queue',
  index: number,
  playerID: number,
  matchID: string,
  scope: 'player',
};

export default function (index: number, playerID: string, matchID: string) {
  return {
    type: 'move-down-in-queue',
    index,
    playerID,
    matchID,
    scope: 'player',
  };
}
