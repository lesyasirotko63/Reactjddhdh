import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

    JoinTable,
    ManyToMany,

    OneToOne,
    JoinColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { File, fileSchema } from './File';

import { Users, usersSchema } from './Users';

import { Categories, categoriesSchema } from './Categories';

import { Tags, tagsSchema } from './Tags';

/**
 * Schema for articles entity
 */
export const articlesSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        title: TypeBox.Type.String({ default: '' }),

        body: TypeBox.Type.String({ default: '' }),

        author: TypeBox.Type.Optional(usersSchema),

        category: TypeBox.Type.Optional(categoriesSchema),

        tags: TypeBox.Type.Array(tagsSchema, { default: [] }),

        featured: TypeBox.Type.Boolean({ default: false }),

        images: TypeBox.Type.Array(fileSchema, { default: [] }),

});

/**
 * Schema for creating a new articles
 */
export const newArticlesSchema = TypeBox.Type.Omit(
    articlesSchema,
    // remove metadata fields
    ['id'],
    { additionalProperties: false },
);

@Entity()
export class Articles implements Omit<TypeBox.Static<typeof articlesSchema>, 'author' | 'category'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        title!: string;

        @Column({ default: '' })
        body!: string;

        @OneToOne(() => Users, { eager: true, cascade: true })
    @JoinColumn()
        author?: Users;

        @OneToOne(() => Categories, { eager: true, cascade: true })
    @JoinColumn()
        category?: Categories;

        @ManyToMany(() => Tags, { eager: true, cascade: true })
    @JoinTable({ name: 'articles_tags_join' })
        tags!: Tags[];

        @Column({ default: false })
        featured!: boolean;

        @ManyToMany(() => File, { eager: true, cascade: true })
    @JoinTable({ name: 'articles_images_join' })
        images!: File[];

}
