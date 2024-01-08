/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocAttributeDto } from './DocAttributeDto';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';

export type PageDocAttributeDto = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  sort?: SortObject;
  size?: number;
  content?: Array<DocAttributeDto>;
  number?: number;
  empty?: boolean;
};
