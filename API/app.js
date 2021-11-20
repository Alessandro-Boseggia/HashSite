import Fastify from "fastify";
import autoLoad from "fastify-autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify();

fastify.register(autoLoad, {
    dir: join(__dirname, "plugin"),
    forceESM: true,
});

fastify.post("/filehash", async (request, reply) => {
    const fileData = await request.file();

    const fileStream = fileData.file;

    const hash = await fastify.fileHash(fileStream);

    reply.send({ hash });
});

fastify.post("/comparefilehash/:hash", async (request, reply) => {
    const fileData = await request.file();

    const fileStream = fileData.file;

    const result = await fastify.compareFileHash(
        request.params.hash,
        fileStream
    );

    reply.send({ result });
});

fastify.listen(3000, async (err, address) => {
    if (err) return console.error(err);
    console.log(`Server start on ${address}`);
});
