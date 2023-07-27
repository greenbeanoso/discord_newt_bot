const { Client, GatewayIntentBits } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = "1131877320672682054"; // 請換成你的應用的ID

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
        name: "ping",
        description: "Replies with Pong!",
    },
    {
        name: "echo",
        description: "回傳你輸入的內容",
        options: [
            {
                name: "content",
                type: 3,
                description: "輸入的內容",
                required: true,
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

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
})();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
        await interaction.reply("Pong!");
    } else if (commandName === "說句話") {
        const nickname = interaction.member.nickname;
        if (nickname != null) {
            await interaction.reply(`${nickname}好帥`);
        } else {
            await interaction.reply(`${interaction.user.username}好帥`);
        }
    } else if (commandName === "呼叫") {
        const username = interaction.options.getString("username");
        for (let index = 0; index < 10; index++) {
            setTimeout(() => {
                interaction.followUp(`呼叫${username}`);
            }, 3000 * index);
        }
    } else if (commandName === "閉嘴") {
        index = 10;
        await interaction.reply("好啦,幹嘛兇人家");
    } else if (commandName === "echo") {
        const content = interaction.options.getString("content");
        await interaction.reply(content);
    }
});

client.login(TOKEN);
