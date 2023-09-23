import express from "express"
import { get, merge } from "lodash"
import { getUserBySessionToken } from "../models/users"

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies["DNB-AUTH"];
    if (!sessionToken) return res.status(403).end();

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) return res.status(403).end();

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params
    const currentUserId = get(req, "identity._id") as string

    if(!currentUserId || currentUserId.toString()  !== id){
      return res.status(403).end()
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(400)
  }
}