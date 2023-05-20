import { Bot } from "grammy";
import {} from 'dotenv/config'

const CHAPA_TOKEN = process.env.PROVIDER_TOKEN;
const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Bot(BOT_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.replyWithInvoice(
    "Flower gifts delivery",
    "Quick delivery and astounding quality! Must try if your looking to make close ones/a spouse happy. ",
    `${ctx.message?.from.id}-${ctx.me.id}-${
      ctx.message?.message_id
    }-${new Date().toISOString()}`,
    CHAPA_TOKEN,
    "ETB",
    [{ label: "Flower", amount: 100 * 100 }],
    {
      max_tip_amount: 100 * 100,
      suggested_tip_amounts: [5 * 100, 10 * 100, 25 * 100, 50 * 100],
      photo_url: "https://lh3.googleusercontent.com/p/AF1QipOZr5VipVItxrX0Io3bWrLxexjsNyagB2SWNzZc=s1280-p-no-v1",
    }
  );
});

bot.on("pre_checkout_query", async (ctx) => {
  await ctx.answerPreCheckoutQuery(true, ctx.preCheckoutQuery.id);
});

bot.on(":successful_payment", async (ctx) => {
  await ctx.reply(
    `Your money was just received by Dengez Gifts. ${
      ctx.message?.successful_payment.total_amount / 100
    } ${
      ctx.message?.successful_payment.currency
    } and wanted to thank you for choosing our store. Your shipping address will receive the item.`
  );
});

bot.start();