/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { OrgDto } from './OrgDto';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';

export type PageOrgDto = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  sort?: SortObject;
  size?: number;
  content?: Array<OrgDto>;
  number?: number;
  empty?: boolean;
};
