/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
import type { UserReplyDto } from './UserReplyDto';

export type PageUserReplyDto = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  sort?: SortObject;
  size?: number;
  content?: Array<UserReplyDto>;
  number?: number;
  empty?: boolean;
};
