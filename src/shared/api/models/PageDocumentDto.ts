/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocumentDto } from './DocumentDto';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';

export type PageDocumentDto = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  sort?: SortObject;
  size?: number;
  content?: Array<DocumentDto>;
  number?: number;
  empty?: boolean;
};
