import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Tags } from '../entity/Tags';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Tags)
export class TagsRepository extends Repository<Tags> {

    filter(query: EntityQuery<Tags> | undefined, page: number, size: number): Promise<[Tags[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip((page - 1) * size)
            .take(size)
            .getManyAndCount();
    }
}
