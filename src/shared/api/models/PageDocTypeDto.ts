/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { DocTypeDto } from './DocTypeDto';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';

export type PageDocTypeDto = {
    totalPages?: number;
    totalElements?: number;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    sort?: SortObject;
    size?: number;
    content?: Array<DocTypeDto>;
    number?: number;
    empty?: boolean;
};
