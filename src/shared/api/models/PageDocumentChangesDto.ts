/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocumentChangesDto } from './DocumentChangesDto';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';

export type PageDocumentChangesDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  sort?: SortObject;
  size?: number;
  content?: Array<DocumentChangesDto>;
  number?: number;
  empty?: boolean;
};
