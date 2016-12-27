// @flow

export type SetHoveredAreaAction = {
  type: 'set-hovered-area',
  area: ?string,
};

export default function (area: ?string) {
  return {
    type: 'set-hovered-area',
    area,
  };
}
