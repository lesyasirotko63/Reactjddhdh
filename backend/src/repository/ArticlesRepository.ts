import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Articles } from '../entity/Articles';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Articles)
export class ArticlesRepository extends Repository<Articles> {

    filter(query: EntityQuery<Articles> | undefined, page: number, size: number): Promise<[Articles[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip((page - 1) * size)
            .take(size)
            .getManyAndCount();
    }
}
