// @flow

export type OpenAreaAction = {
  type: 'open-area',
  area: string,
  scope: 'client',
};

export default function (area: string) {
  return {
    type: 'open-area',
    area,
    scope: 'client',
  };
}
