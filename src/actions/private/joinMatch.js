// @flow

export type JoinMatchAction = {
  type: 'join-match',
  scope: 'private',
  playerName: string,
  playerID: string,
  colour: string,
  matchID: string,
  password: string,
}

export default function (
  playerID: string,
  playerName: string,
  colour: string,
  matchID: string,
  password: string,
) {
  return {
    type: 'join-match',
    scope: 'private',
    playerName,
    playerID,
    colour,
    matchID,
    password,
  };
}
