import connect from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (NextRequest) => {
  try {
    const users = await User.find().sort({ score: -1, scoreTimestamp: 1 });
    
    
    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    
    const leaderboard = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        score: user.score,
        currentLevel: user.currentLevel,
        finishTime: user.scoreTimestamp,
      };
    });
    
    
    return NextResponse.json({
      message: "Leaderboard fetched successfully",
      leaderboard: leaderboard,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" +error}, { status: 500 });
  }
};