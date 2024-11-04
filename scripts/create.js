import shell from "shelljs";
import downloadTemplate from "./download.js";
import fs from "fs";
import path from "path";
import { projectTemplates, messages } from "./constant.js";
import {
  inquirerInput,
  inquirerConfirm,
  inquirerChoose,
} from "./interactive.js";
import logSymbols from "log-symbols";
import { removeDir } from "./utils.js";

/**
 *
 * @param {String} projectName 项目名
 * @param {Object} option 创建时的配置项
 */
export default async function create(projectName, option) {
  if (!shell.which("git")) {
    console.log(
      logSymbols.error,
      chalk.redBright("Error: 该脚手架依赖于git,请先安装git!")
    );
    shell.exit(1);
  }

  // 验证 projectName 是否合法
  if (projectName.match(/[\u4E00-\u9FFF`~!@#$%&^*[\]()\\;:<.>/?]/g)) {
    console.log(
      logSymbols.error,
      chalk.redBright("Error: <project-name>存在非法字符!")
    );
    return;
  }

  let repository = "";
  if (option.template) {
    // 检查模版
    const template = projectTemplates.find((item) => item.name === option.template);
    if (!template) {
      console.log(logSymbols.error, chalk.redBright("Error: 模版不存在!"));
      console.log(`\r\n运行 ${chalk.cyanBright("ice-cli ls")} 查看所有可用模板\r\n`);
      return;
    }
    repository = template.repository;
  }else {
    const answers = await inquirerChoose("选择项目模版:", projectTemplates);
    repository = answers.choose;
  }

  // 验证同名文件夹
  if (fs.existsSync(projectName)) {
    if (option.force) {
      await removeDir(projectName)
    } else {
      const answers = await inquirerConfirm(`目标项目 ${projectName} 已存在,是否覆盖: `);
      if (answers.confirm) {
        await removeDir(projectName)
      } else {
        console.log(logSymbols.error, chalk.redBright(`Error: 项目创建失败! 存在同名项目 ${projectName}`));
        return;
      }
    }
  }

  // 下载模版
  try {
    console.log("repository:", repository);
    await downloadTemplate(repository, projectName);
  } catch (error) {
    console.log(logSymbols.error, chalk.redBright("Error: 项目创建失败!"));
    shell.exit(1);
  }
}

