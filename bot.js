const { Client, GatewayIntentBits } = require("discord.js"); // 引入discord.js
const { REST } = require("@discordjs/rest"); // 引入discord.js的rest
const { Routes } = require("discord-api-types/v9"); // 引入discord.js的api
require("dotenv").config(); // 引入dotenv

const TOKEN = process.env.DISCORD_TOKEN; // 從.env取得TOKEN
const CLIENT_ID = "1131877320672682054"; // 機器人的ID

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});
// type: 種類對應
// 1：子指令
// 2：子指令組
// 3：字符串
// 4：整數
// 5：布爾值
// 6：用戶
// 7：通道
// 8：角色
// 9：提及
// 10：數字
// 11：提及可能的用戶

const commands = [
    {
        name: "ping", // 指令名稱
        description: "Replies with Pong!", // 指令描述
    },
    {
        name: "echo", // 指令名稱
        description: "回傳你輸入的內容", // 指令描述
        options: [
            {
                name: "content", // 參數名稱
                type: 3, // 參數類型
                description: "輸入的內容", // 參數描述
                required: true, // 是否必填
            },
        ],
    },
    {
        name: "說句話",
        description: "機器人會說你好帥",
    },
    {
        name: "呼叫",
        description: "機器人會呼叫你輸入的人",
        options: [
            {
                name: "username",
                type: 3,
                description: "使用者名稱會被呼叫",
                required: true,
            },
        ],
    },
    {
        name: "閉嘴",
        description: "機器人會閉嘴",
    },
    // 新增指令的格式
];

const rest = new REST({ version: "9" }).setToken(TOKEN); // 設定token

(async () => {
    // 建立指令
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
})();

// 當機器人準備好時
client.once("ready", () => {
    console.log("Ready!");
});

// 當機器人收到訊息時
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // 判斷指令
    if (commandName === "ping") {
        await interaction.reply("Pong!"); // 回覆訊息
    } else if (commandName === "說句話") {
        const nickname = interaction.member.nickname; // 取得暱稱
        if (nickname != null) {
            // 如果有暱稱
            await interaction.reply(`${nickname}好帥`); // 回覆訊息
        } else {
            await interaction.reply(`${interaction.user.username}好帥`); // 回覆訊息
        }
    } else if (commandName === "呼叫") {
        // 呼叫指令
        const username = interaction.options.getString("username");
        for (let index = 0; index < 10; index++) {
            setTimeout(() => {
                interaction.followUp(`呼叫${username}`);
            }, 3000 * index); // 每3秒發送一次訊息
        }
    } else if (commandName === "閉嘴") {
        // 閉嘴指令
        index = 10; // 設定index為10
        await interaction.reply("好啦,幹嘛兇人家");
    } else if (commandName === "echo") {
        // echo指令
        const content = interaction.options.getString("content"); // 取得輸入的內容
        await interaction.reply(content);
    }
});

client.login(TOKEN); // 登入機器人
