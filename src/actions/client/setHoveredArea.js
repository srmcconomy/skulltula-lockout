// @flow

export type SetHoveredAreaAction = {
  type: 'set-hovered-area',
  area: ?string,
  scope: 'client',
};

export default function (area: ?string) {
  return {
    type: 'set-hovered-area',
    area,
    scope: 'client',
  };
}
