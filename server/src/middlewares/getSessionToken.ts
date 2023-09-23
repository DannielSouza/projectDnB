import express from "express"

export const getSessionToken = (req: express.Request) => {
  const sessionToken = req.cookies["DNB-AUTH"];

  if(!sessionToken) return null
  return sessionToken
}