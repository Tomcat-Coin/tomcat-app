
import { Router } from "express"
import UserRoute from "./User.routes";
import PointRoute from "./Point.routes";
import FarmRoute from "./Farm.routes";
import SettingRoute from "./Setting.routes";
import TaskRoute from "./Task.routes";
import ExtraTaskRoute from "./ExtraTask.routes";
const MainRoute = Router();

MainRoute.use("/user", UserRoute);
MainRoute.use("/point", PointRoute);
MainRoute.use("/farm", FarmRoute);
MainRoute.use("/setting", SettingRoute);
MainRoute.use("/task", TaskRoute);
MainRoute.use("/extra-task", ExtraTaskRoute);

export default MainRoute;