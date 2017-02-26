// @flow

export type CloseAreaAction = {
  type: 'close-area',
  scope: 'client',
};

export default function () {
  return {
    type: 'close-area',
    scope: 'client',
  };
}
