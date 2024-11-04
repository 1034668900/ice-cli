import fs from "fs/promises";
import path from "path";
import logSymbols from "log-symbols";

const userAbsolutePath = await fs.realpath(process.cwd());


export async function updatePkgJson(name, version) {
    
}

export async function removeDir(dirName) {
    try {
        await fs.rmdir(path.resolve(userAbsolutePath, dirName), { recursive: true });
        console.log(logSymbols.success, `覆盖目录 ${dirName} 成功!`);
    } catch (error) {
        console.log(logSymbols.error, `覆盖目录 ${dirName} 失败!`);
        return;
    }
}