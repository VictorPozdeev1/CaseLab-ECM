/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocTypeDto } from './DocTypeDto';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';

export type PageDocTypeDto = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  sort?: SortObject;
  size?: number;
  content?: Array<DocTypeDto>;
  number?: number;
  empty?: boolean;
};
