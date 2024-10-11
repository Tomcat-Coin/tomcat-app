import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import GlobalErrorHandler from "./util/GlobalErrorHandler";
import { StatusCodes } from "http-status-codes";
import NoRoutes from "./util/NoRoutes";
import MainRoute from "./routes/Main.routes";
import { message } from "telegraf/filters";
import { Telegraf } from "telegraf";
import 'dotenv/config'

const app: Application = express();
export const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot?.on(message("text"), (ctx) => ctx.replyWithPhoto('https://i.ibb.co.com/YQKfPkP/Frame-6.png', {
    caption: `Welcome to TomCat Coin!

1⃣ Farm TomCat Coin Points every 8 hours!
2⃣ Invite friends to boost your TomCat Coin!
3⃣ Complete quests to earn even more!

Start farming today and stay tuned for exciting surprises! 🚀

Join Our channel 👉 @TomCatsCoin`,
    reply_markup: {
        inline_keyboard: [
            [{ text: "Open App", url: "https://t.me/TomCat_robot/app" }]
        ]
    }
}));

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.json());


app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send('hello world')
    } catch (error) {
        next({
            status: StatusCodes.BAD_REQUEST,
            error
        });
    }
});

app.use("/api/v1", MainRoute);

app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url as string;
    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            return res.status(500).send('Failed to fetch image');
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.set('Content-Type', 'image/jpeg'); // Adjust this based on the image type, e.g., 'image/png'
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Failed to fetch image');
    }
});

app.post("/api/bot", async (req, res) => {
    try {
        await bot.handleUpdate(req.body, res);
    } catch (err) {
        console.error("Error handling update:", err);
        res.status(500).send("Error processing update");
    }
});

app.get("/manifest", async (req, res) => {
    res.send({
        "url": "https://Tom.Cats",
        "name": "TomCat Coin",
        "iconUrl": "https://i.ibb.co.com/dc7vFFX/image.png"
    });
})

app.use(NoRoutes)

app.use(GlobalErrorHandler)



export default app;