import mongoose from "mongoose";
import app, { bot } from "./app";
import 'dotenv/config'

async function main() {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const port = process.env.PORT || 3000;
    console.log();
    
    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);

        const webhookUrl = process.env.WEBHOOK as string;
        try {
            await bot.telegram.setWebhook(webhookUrl);
            console.log(`Webhook set to ${webhookUrl}`);
        } catch (err) {
            console.error("Error setting webhook:", err);
        }
    });

}


main();