// @flow

export type ClaimSkullAction = {
  type: 'claim-skull',
  skullID: number,
  playerID: string,
  matchID: string,
  scope: 'match',
};

export default function (skullID: number, playerID: string, matchID: string) {
  return {
    type: 'attempt-claim-skull',
    skullID,
    playerID,
    matchID,
    scope: 'match',
  };
}
