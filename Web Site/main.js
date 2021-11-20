import { fileHash, compareHash } from "./requests.js";
const btn = document.getElementById("btn");
const calcBtn = document.getElementById("calc");
const compareBtn = document.getElementById("compare");
const hash = document.getElementById("inputHash");
const file = document.getElementById("inputFile");

let switchFunc = false;

file.addEventListener("change", () => {
    document.querySelector("label").innerText = file.files[0].name;
});

calcBtn.addEventListener("click", () => {
    cambioFunzionalita();
    switchFunc = false;
});

compareBtn.addEventListener("click", () => {
    cambioFunzionalita();
    switchFunc = true;
});

btn.addEventListener("click", async (event) => {
    const data = new FormData();
    data.append("hashFile", file.files[0]);
    let result = {};
    const output = document.querySelector("p");

    if (!switchFunc) {
        result = await fileHash(data);
        output.innerText = result.hash;
    }

    if (switchFunc) {
        const hashValue = hash.value;
        result = await compareHash(hashValue, data);
        output.innerText = result.result
            ? "File compatibile"
            : "File non compatibile";
    }
});

function cambioFunzionalita() {
    calcBtn.classList.toggle("primary");
    compareBtn.classList.toggle("primary");
    inputHash.classList.toggle("hide");
    document.querySelector("p").innerText = "";
}
