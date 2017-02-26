// @flow

export type UnclaimSkullAction = {
  type: 'unclaim-skull',
  skullID: number,
  playerID: string,
  matchID: string,
  scope: 'match',
};

export default function (skullID: number, playerID: string, matchID: string) {
  return {
    type: 'attempt-unclaim-skull',
    skullID,
    playerID,
    matchID,
    scope: 'match',
  };
}
