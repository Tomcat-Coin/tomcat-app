import { Router } from "express"
import authenticateToken from "../util/DecodeJWT";
import { DailyChecking, ExtraTaskCompleteList, HasClaimedToday, InviteTask, TonTransection } from "../ExtraTask/ExtraTask.controller";
const ExtraTaskRoute = Router();

ExtraTaskRoute.post("/ton-transection", authenticateToken, TonTransection);
ExtraTaskRoute.post("/invites", authenticateToken, InviteTask);
ExtraTaskRoute.get("/extra-list", authenticateToken, ExtraTaskCompleteList);
ExtraTaskRoute.get("/daily-checking-status", authenticateToken, HasClaimedToday);
ExtraTaskRoute.post("/daily-checking", authenticateToken, DailyChecking);

export default ExtraTaskRoute;

