import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      return res.status(400).json({
        error: "Invalid User",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid Access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: error?.message || "Invalid Access Token" });
  }
});
