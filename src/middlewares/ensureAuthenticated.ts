import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: "token.invalid",
    });
  }

  //   Bearer 31as3d54as3d1a3s51d33asd51
  // [0] Bearer
  // [1] Token
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    req.user_id = sub;
    return next();
  } catch (error) {
    res.status(401).json({ error: "token.expired" });
  }
}
