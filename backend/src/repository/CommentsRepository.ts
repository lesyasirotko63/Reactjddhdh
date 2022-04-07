import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Comments } from '../entity/Comments';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {

    filter(query: EntityQuery<Comments> | undefined, page: number, size: number): Promise<[Comments[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip((page - 1) * size)
            .take(size)
            .getManyAndCount();
    }
}
