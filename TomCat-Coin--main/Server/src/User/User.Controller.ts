import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "http-status-codes";
import UserModel from "./User.model";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import FormetResponseSend from "../util/FormetResponseSend";
import { TUser } from "./User.interface";
import PointModel from "../Point/Point.model";
import crypto from "crypto";
import mongoose from "mongoose";
import FormetResponseErrorSend from "../util/FormetResponseErrorSend";
import { Task_Complete_Model } from "../Task_Complete/Task_Complete.Model";
import { SettingModel } from "../Setting/Setting.Controller";
import { bot } from "../app";
const querystring = require("querystring");

// Define the function for verifying Telegram data
function verifyTelegramData(data: any) {
    const botToken = process.env.BOT_TOKEN;

    if (!botToken) {
        throw new Error("Missing TELEGRAM_BOT_TOKEN environment variable");
    }
    if (!data.hash) {
        throw new Error("Missing hash in Telegram login data");
    }

    const authDate = data.auth_date;
    if (!authDate) {
        throw new Error("Missing auth_date in Telegram login data");
    }

    const checkString = Object.keys(data)
        .filter((key) => key !== "hash")
        .sort()
        .map((key) => {
            if (key === "user") {
                return `${key}=${JSON.stringify(data[key])}`;
            }
            return `${key}=${data[key]}`;
        })
        .join("\n");

    const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(checkString).digest("hex");

    if (calculatedHash === data.hash) {
        return true;
    } else {
        console.log("Validation failed");
        return false;
    }
}

export const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const TgId = req?.body?.TgId;
        const user = await UserModel.findOne({ TgId: TgId }, {}, { session });

        const parsedData = querystring.parse(req?.body?.init);
        parsedData.user = JSON.parse(decodeURIComponent(parsedData.user));
        const isInitVaild = verifyTelegramData(parsedData);

        if (process.env?.TS_NODE_DEV === 'true' ? !isInitVaild : isInitVaild) {
            if (user === null) {
                const ReferCode = await v4();
                const AObject = await {
                    ReferCode,
                    ...req.body
                }
                const body: TUser = req?.body;
                if (body?.Username === parsedData?.user?.username && body?.TgId === parsedData?.user?.id) {

                    const result: any = await UserModel.create([AObject], { session });

                    const findReferer = await UserModel.findOne({ ReferCode: req?.body?.referBy }, {}, { session });
                    if (findReferer) {
                        const findRefererPointTable = await PointModel.findOne({ userId: findReferer?._id }, {}, { session });
                        // await PointModel.findOneAndUpdate({ userId: findReferer?._id }, { point: (findRefererPointTable?.point as number) + 3333 }, { session });
                        if (findRefererPointTable) {
                            findRefererPointTable.point = (findRefererPointTable?.point as number) + 3333;
                            await findRefererPointTable.save();
                        }

                        await PointModel.create([{ userId: result[0]?._id, point: 333 }], { session });
                    } else {
                        await PointModel.create([{ userId: result[0]?._id, point: 0 }], { session });
                    }

                    await session.commitTransaction();
                    await session.endSession();

                    const token = await jwt.sign({ user: result[0] }, "this-is-secret", { expiresIn: '7d' });
                    return res.status(CREATED).cookie("token", token).send(FormetResponseSend(CREATED, "Register Completed...", { user: result, token }));
                } else {
                    await session.abortTransaction();
                    await session.endSession();

                    return next({
                        status: UNAUTHORIZED,
                        error: "User information is mismatched."
                    })
                }
            } else {
                const body: TUser = req?.body;
                const isUsernameMatch = body?.Username === parsedData?.user?.username;
                const isTgIdMatch = body?.TgId === parsedData?.user?.id;

                if (isUsernameMatch && isTgIdMatch) {
                    const token = await jwt.sign({ user }, "this-is-secret", { expiresIn: '7d' });
                    await session.commitTransaction();
                    await session.endSession();

                    return res.status(OK).cookie("token", token).send(FormetResponseSend(CREATED, "Logged...", { user, token }));
                } else {
                    await session.abortTransaction();
                    await session.endSession();

                    return next({
                        status: UNAUTHORIZED,
                        error: "User information is mismatched."
                    });
                }
            }
        } else {
            await session.abortTransaction();
            await session.endSession();

            return next({
                status: UNAUTHORIZED,
                error: "User information is mismatched."
            })
        }
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        return next({
            status: BAD_REQUEST,
            error
        })
    }
}

export const ReferList = async (req: any, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //find my profile 
        const findme = await UserModel.findById(req?.user?.user?._id, {}, { session });

        const findReferedUser = await UserModel.find({ referBy: findme?.ReferCode }, {}, { session });

        await session.commitTransaction();
        await session.endSession();
        return res.status(OK).send(FormetResponseSend(OK, 'Refer info retrive...', { me: findme, refer_list: findReferedUser }));
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        return res.status(OK).send(FormetResponseErrorSend(BAD_REQUEST, error.message as string, error));
    }
}

export const MyInfo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const uid = req?.user?.user?._id;
        const result = await UserModel.findById(uid);
        return res.status(OK).send(FormetResponseSend(OK, 'My info retrive', result));
    } catch (error) {
        return next({
            status: BAD_REQUEST,
            error
        })
    }
}

export const AdminAllUserList = async (req: any, res: Response, next: NextFunction) => {
    try {
        const result = await PointModel.find({}).populate("userId").sort("-point");

        const formattedResults = await Promise.all(result.map(async (item: any) => {

            const task_solved = await Task_Complete_Model.find({ userId: item?.userId?._id });
            const refer_count = await UserModel.find({ referBy: item?.userId?.referBy });

            return {
                ...item.toObject(),
                task_solved: task_solved.length,
                refer_count: refer_count.length,
            };
        }));

        return res.status(OK).send(FormetResponseSend(OK, 'All user list retrieved', formattedResults));
    } catch (error) {
        return next({
            status: BAD_REQUEST,
            error
        })
    }
};

export const UpdateUserInformission = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    try {
        const { pointId, ReferCode, point } = req?.body;

        const FindPointTable = await PointModel.findById(pointId).session(session);
        if (FindPointTable) {
            FindPointTable.point = Number(point ? point : FindPointTable?.point);
            await FindPointTable.save();
        } else {
            throw new Error("Point Table Not Found!");

        }

        const FindUser = await UserModel.findById(FindPointTable?.userId).session(session);
        if (FindUser) {
            FindUser.ReferCode = ReferCode ? ReferCode : FindUser?.ReferCode;
            await FindUser.save();
        } else {
            throw new Error("User Not Found!");
        }

        return res.status(OK).send(FormetResponseSend(OK, 'User Profile Updated', FindPointTable));
    } catch (error) {
        return next({
            status: BAD_REQUEST,
            error
        })
    }
};

export const LeaderboardByPoints = async (req: any, res: Response) => {
    const authUser = req?.user?.user;

    let User;
    let userRank;
    const user = await UserModel.findById(authUser?._id);

    if (user?._id) {
        User = await PointModel
            .findOne({ userId: user?._id })
            .populate('userId')
            .select('-userId.isBlocked -userId.isDeleted -userId.createdAt -updatedAt');
        userRank = await PointModel.countDocuments({ point: { $gt: User?.point ? User?.point : 0 } }) + 1;
    }

    const Leader = await PointModel
        .find({})
        .sort({ point: -1 })
        .limit(100)
        .populate('userId')
        .select('-userId.isBlocked -userId.isDeleted -userId.createdAt -updatedAt');

    const me = {
        userRank,
        User
    };

    res.send({
        msg: 'New Leaderboard list!',
        statusCode: 200,
        data: [
            me,
            ...Leader
        ]
    })
};

export const MiningBoosting = async (req: any, res: Response) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const { user: authUser } = req?.user;
        const ton = req?.body?.ton;
        const user = await UserModel.findById(authUser?._id).session(session);
        const setting = await SettingModel.findOne({}).session(session);
        if (!user?._id) {
            throw new Error("User not found!");
        }
        const mining_r = ((Number(setting?.Mining_Rewards) / 100) * 5) * Number(ton);
        user.MiningRewards = String(user?.MiningRewards ? Number(user?.MiningRewards) + Number(setting?.Mining_Rewards) + mining_r : Number(setting?.Mining_Rewards) + mining_r);

        await user.save({ session: session });

        await session.commitTransaction();
        await session.endSession();
        await bot.telegram.sendMessage(user?.TgId, `🚀 Thank you for purchasing a boost! Your boost has been successfully activated! Keep mining and continue to earn even more rewards. ⛏️✨\n\nThe more you mine, the more you’ll grow! 🌟 Keep up the great work! 💪`);

        return res.status(OK).send(FormetResponseSend(OK, 'mining boosting is complete', []));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(BAD_REQUEST).send(FormetResponseErrorSend(BAD_REQUEST, error.message, error));
        }
    }
}