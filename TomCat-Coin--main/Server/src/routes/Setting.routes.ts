import { Router } from "express"
import { MatchSecretCode } from "../Setting/Setting.Controller";
const SettingRoute = Router();

SettingRoute.post("/admin/login/auth/0/login", MatchSecretCode)


export default SettingRoute;

