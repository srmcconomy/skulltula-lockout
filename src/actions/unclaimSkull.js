// @flow

export type ClaimSkullAction = {
  type: 'claim-skull',
  skullID: number,
};

export default function (skullID: number) {
  return {
    type: 'unclaim-skull',
    skullID,
  };
}
