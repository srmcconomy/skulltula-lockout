// @flow

export type CreateMatchAction = {
  type: 'create-match',
  scope: 'public',
};

export default function (
  name: string,
  playerID: ?string,
  playerName: ?string,
  colour: string,
  password: string,
  allowSpectators: boolean,
) {
  return {
    type: 'create-match',
    scope: 'public',
    matchID: null,
    name,
    colour,
    playerID,
    playerName,
    password,
    allowSpectators,
  };
}
