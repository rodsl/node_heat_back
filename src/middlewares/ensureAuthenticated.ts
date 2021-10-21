import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
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
    const { sub } = verify(token, process.env.JWT_SECRET);
    
  } catch (error) {
    res.status(401).json({ error: "token.expired" });
  }
}
