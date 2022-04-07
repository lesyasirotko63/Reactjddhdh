import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Categories } from '../entity/Categories';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Categories)
export class CategoriesRepository extends Repository<Categories> {

    filter(query: EntityQuery<Categories> | undefined, page: number, size: number): Promise<[Categories[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip((page - 1) * size)
            .take(size)
            .getManyAndCount();
    }
}
