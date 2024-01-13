/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
import type { UserReplyDto } from './UserReplyDto';

export type PageUserReplyDto = {
    totalPages?: number;
    totalElements?: number;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    sort?: SortObject;
    size?: number;
    content?: Array<UserReplyDto>;
    number?: number;
    empty?: boolean;
};
