#!/usr/bin/env node

import create from "./scripts/create.js";
import fs from "fs";
import chalk from "chalk";
import figlet from "figlet";
import { table } from "table";
import { program } from "commander";
import { projectTemplates } from "./scripts/constant.js "

const pkg = fs.readFileSync("./package.json", "utf-8");
const { version } = JSON.parse(pkg);

program.version(version, "-v, --version", "output the current version");

program
  .command("create <projectName>")
  .description("create a new project:")
  .option("-t, --template <template>", "输入模版名称快速创建项目")
  .option("-f, --force", "覆盖本地目录下同名项目")
  .action(create);

// 查看模板列表
program
  .command("ls")
  .description("查看所有可用的模板")
  .action(() => {
    const data = projectTemplates.map((item) => [
      chalk.greenBright(item.name),
      chalk.white(item.value),
      chalk.white(item.desc),
    ]);
    data.unshift([
      chalk.white("模板名称"),
      chalk.white("模板地址"),
      chalk.white("模板描述"),
    ]);
    console.log(table(data));
  });

// 配置脚手架基本信息
program
  .name("ice-cli")
  .description("ice 简单的自定义脚手架")
  .usage("<command> [options]")
  // 用在内置的帮助信息之后输出自定义的额外信息
  .on("--help", () => {
    console.log(
      "\r\n" +
        chalk.greenBright.bold(
          figlet.textSync("ice-cli", {
            font: "Standard",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
            whitespaceBreak: true,
          })
        )
    );
    console.log(
      `\r\n Run ${chalk.cyanBright(
        `ice-cli <command> --help`
      )} for detailed usage of given command.`
    );
  });

program.parse(process.argv);
