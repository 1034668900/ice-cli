import download from "download-git-repo";
import ora from "ora";
import chalk from "chalk";

export default function downloadTemplate(repository, projectName) {
    const spinner = ora(chalk.yellow("downloading...")).start();
    return new Promise((resolve, reject) => { 
        download(repository, projectName, { clone: true }, (err) => { 
            if (err) {
                spinner.fail(chalk.red(err));
                reject(err);
            } else {
                spinner.succeed(chalk.green("download successfully!"));
                resolve();
            }
        })
    })
}