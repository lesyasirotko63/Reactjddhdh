import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

    OneToOne,
    JoinColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Users, usersSchema } from './Users';

import { Articles, articlesSchema } from './Articles';

/**
 * Schema for comments entity
 */
export const commentsSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        text: TypeBox.Type.String({ default: '' }),

        author: TypeBox.Type.Optional(usersSchema),

        article: TypeBox.Type.Optional(articlesSchema),

        moderated: TypeBox.Type.Boolean({ default: false }),

});

/**
 * Schema for creating a new comments
 */
export const newCommentsSchema = TypeBox.Type.Omit(
    commentsSchema,
    // remove metadata fields
    ['id'],
    { additionalProperties: false },
);

@Entity()
export class Comments implements Omit<TypeBox.Static<typeof commentsSchema>, 'author' | 'article'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        text!: string;

        @OneToOne(() => Users, { eager: true, cascade: true })
    @JoinColumn()
        author?: Users;

        @OneToOne(() => Articles, { eager: true, cascade: true })
    @JoinColumn()
        article?: Articles;

        @Column({ default: false })
        moderated!: boolean;

}
