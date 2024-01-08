/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocumentDto } from './DocumentDto';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';

export type PageDocumentDto = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  sort?: SortObject;
  size?: number;
  content?: Array<DocumentDto>;
  number?: number;
  empty?: boolean;
};
