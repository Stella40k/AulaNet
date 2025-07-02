import { Router } from "express";

import {
  login,
  logout,
  session,
  register,
} from "../controllers/session.controllers.js";

export const routeSession = Router();

routeSession.post("/login", login);
routeSession.get("/session", session);
routeSession.post("/logout", logout);
routeSession.post("/register", register);