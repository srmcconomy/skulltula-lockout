// @flow

export type OpenAreaAction = {
  type: 'open-area',
  area: string,
};

export default function (area: string) {
  return {
    type: 'open-area',
    area,
  };
}
