// @flow

export type ClaimSkullAction = {
  type: 'claim-skull',
  skullID: number,
  playerID: number,
};

export default function (skullID: number, playerID: number) {
  return {
    type: 'claim-skull',
    skullID,
    playerID,
  };
}
