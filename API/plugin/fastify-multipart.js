import fastifyMultipart from "fastify-multipart";
import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
    fastify.register(fastifyMultipart, {
        limits: {
            fileSize: 1000000,
        },
    });
});
