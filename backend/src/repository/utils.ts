import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */
export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: EntityQuery<T>) {
    for (const k in query) {
        const key = k as keyof typeof query;
        qb.andWhere({ [key]: query[key] });
    }
    return qb;
}
