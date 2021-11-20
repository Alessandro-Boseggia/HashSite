import fp from "fastify-plugin";
import crypto from "crypto";

async function hashLib(fastify, opts) {
    async function fileHash(fileStream) {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash("sha256");

            fileStream.on("data", (chunk) => hash.update(chunk));

            fileStream.on("end", () => resolve(hash.digest("hex")));
        });
    }

    async function compareFileHash(hash, fileStream) {
        const hashFromFile = await fileHash(fileStream);
        return hashFromFile === hash;
    }

    fastify.decorate("fileHash", fileHash);
    fastify.decorate("compareFileHash", compareFileHash);
}

export default fp(hashLib);
