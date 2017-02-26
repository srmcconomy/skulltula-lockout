// @flow

export type MoveSkullUpInQueueAction = {
  type: 'move-up-in-queue',
  index: number,
  playerID: string,
  matchID: string,
  scope: 'player',
};

export default function (index: number, playerID: string, matchID: string) {
  return {
    type: 'move-up-in-queue',
    index,
    playerID,
    matchID,
    scope: 'player',
  };
}
