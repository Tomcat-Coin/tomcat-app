import { Request, Response } from "express";
import mongoose, { model, Schema } from "mongoose";

const SettingSchema = new Schema({
    SecretCode: Number,
    ReferComission: String,
    ReferReward: String,
    TonTranPoint: String,
    Mining_Time: String,
    Mining_Rewards: String
})

export const SettingModel = model("setting", SettingSchema);

export const MatchSecretCode = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const SecretCode = req.body.secret;

        const Matching = await SettingModel.findOne({ SecretCode }, {}, { session });

        if (!Matching) {
            const GetData = await SettingModel.find({}, {}, { session });

            if (GetData?.length === 0) {
                await SettingModel.create([{ SecretCode, ReferComission: "0", ReferReward: "0", TonTranPoint: "0", Mining_Rewards: "0", Mining_Time: "0" }], { session });

                await session.commitTransaction();
                await session.endSession();
                return res.status(200).send({
                    msg: 'New Secret is created!',
                    data: {
                        ping: true
                    },
                    statusCode: 200
                })
            } else {
                throw new Error("Secret Code is not matching...");
            }
        } else {
            await session.commitTransaction();
            await session.endSession();
            return res.status(200).send({
                msg: 'Secret is matched!',
                data: {
                    ping: true
                },
                statusCode: 200
            })
        }
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error?.message,
                data: {
                    ping: false
                },
                statusCode: 400
            })
        } else {
            return res.send('something went wrong');
        }
    }
};

export const GetSetting = async (req: Request, res: Response) => {
    try {
        // Find the only document in the SettingModel collection
        const document = await SettingModel.findOne();

        if (!document) {
            return res.status(404).send({
                msg: 'No document found',
                statusCode: 404
            });
        }

        // Return the document as a response
        return res.status(200).send({
            msg: 'Document fetched successfully!',
            data: document,
            statusCode: 200
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error?.message,
                statusCode: 400
            });
        } else {
            return res.status(500).send('Something went wrong');
        }
    }
};

export const UpdateSetting = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const document = await SettingModel.findOne();
        const up = {
            SecretCode: req?.body?.SecretCode ? req?.body?.SecretCode : document?.SecretCode,
            ReferComission: req?.body?.ReferComission ? req?.body?.ReferComission : document?.ReferComission,
            ReferReward: req?.body?.ReferReward ? req?.body?.ReferReward : document?.ReferReward,
        }
        const updatedDocument = await SettingModel.findOneAndUpdate({}, up, { new: true, session });

        if (!updatedDocument) {
            throw new Error("No document found to update.");
        }

        await session.commitTransaction();
        await session.endSession();

        return res.status(200).send({
            msg: 'Setting updated successfully!',
            data: updatedDocument,
            statusCode: 200
        });

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        if (error instanceof Error) {
            return res.status(400).send({
                msg: error?.message,
                statusCode: 400
            });
        } else {
            return res.status(500).send('Something went wrong');
        }
    }
};
