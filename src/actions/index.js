// @flow

import type { ClaimSkullAction } from './claimSkull';
import type { MoveSkullDownInQueueAction } from './moveSkullDownInQueue';
import type { MoveSkullUpInQueueAction } from './moveSkullUpInQueue';
import type { OpenAreaAction } from './openArea';
import type { RemoveSkullFromQueueAction } from './removeSkullFromQueue';
import type { SetHoveredAreaAction } from './setHoveredArea';
import type { AddToTopOfQueueAction } from './addToTopOfQueue';
import type { AddToBottomOfQueueAction } from './addToBottomOfQueue';

export type Action = SetHoveredAreaAction |
  OpenAreaAction |
  ClaimSkullAction |
  MoveSkullDownInQueueAction |
  MoveSkullUpInQueueAction |
  RemoveSkullFromQueueAction |
  AddToTopOfQueueAction |
  AddToBottomOfQueueAction;
