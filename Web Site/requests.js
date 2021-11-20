export async function compareHash(hash, file) {
    const respone = await fetch(
        `https://bosehomeserver.ddns.net/comparefilehash/${hash}`,
        {
            method: "POST",
            body: file,
        }
    );

    return respone.json();
}

export async function fileHash(file) {
    const respone = await fetch("https://bosehomeserver.ddns.net/filehash", {
        method: "POST",
        body: file,
    });

    return respone.json();
}
