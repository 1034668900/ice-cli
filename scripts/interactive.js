/**
 * @file download.js
 * 命令行交互方法的封装
 */
import inquirer from "inquirer";

/**
 * 
 * @param { String } message 提示语句
 * @returns 选择结果
 */
export async function inquirerConfirm(message) {
    return await inquirer.prompt({
        type: "confirm",
        name: "confirm",
        message
    })
}

/**
 * 
 * @param { String } message 提示语句
 * @param { Array } choices 选择列表
 * @returns 
 */
export async function inquirerChoose(message, choices) {
    return await inquirer.prompt({
        type: "list",
        name: "choose",
        message,
        choices
    })
}

/**
 * 
 * @param { Array } messageList 自定义提示语句数组 Array<{ name: String, message: String }>
 * @returns 收集结果
 */
export async function inquirerInput(messageList) { 
    const messages = messageList.map(item => { 
        return {
            name: item.name,
            type: "input",
            message: item.message,
        }
    })
    return await inquirer.prompt(messages);
}
