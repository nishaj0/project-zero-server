import { Router } from "express";
import { userLogin, userRegister } from "../controllers/authControllers";
import { validateData } from "../middlewares/zodValidation";
import { errorCatch } from "../utils/error/errorCatch";
import { loginSchema, registerSchema } from "../utils/zodSchemas";

const router = Router();

router.post("/login", validateData(loginSchema), errorCatch(userLogin));
router.post("/register", validateData(registerSchema), errorCatch(userRegister));

export default router;
