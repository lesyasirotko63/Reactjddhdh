import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { pipeline } from 'stream';
import { access, constants, createReadStream, createWriteStream, mkdirSync, rename, renameSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import * as os from 'os';

const tag = 'Files';

export default async (app: FastifyInstance) => {
    const params = Type.Object({
        entity: Type.String(),
        field: Type.String(),
    });

    app.post<{ Params: Static<typeof params>}>('/upload/:entity/:field', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            tags: [tag],
            summary: 'Upload file',
            params: params,
            response: {
                200: {
                    type: 'null',
                    description: 'File successfully uploaded',
                },
            },
            security: [{
                bearerAuth: [],
            }],
        },
    }, async (req, reply) => {
        const data = await req.file();
        const targetFolder = join(os.tmpdir(), req.params.entity, req.params.field);
        mkdirSync(targetFolder, { recursive: true });
        await promisify(pipeline)(data.file, createWriteStream(join(targetFolder, data.filename)));
        // filename should be accessed AFTER stream consumption
        // @ts-ignore
        renameSync(join(targetFolder, data.filename), join(targetFolder, data.fields.filename.value));
        reply.status(200).send();
    });

    const downloadPayload = Type.Object({
        privateUrl: Type.String(),
    });
    app.get<{ Querystring: Static<typeof downloadPayload> }>('/download', {
        schema: {
            tags: [tag],
            querystring: downloadPayload,
        },
    }, (req, reply) => {
        const filePath = join(os.tmpdir(), req.query.privateUrl);
        promisify(access)(filePath, constants.F_OK)
            .then(() => reply.status(200).send(createReadStream(filePath)))
            .catch(() => reply.notFound());
    });
};
