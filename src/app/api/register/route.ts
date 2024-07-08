import { NextResponse } from "next/server";
import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await dbConnect();

  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email is already taken" },
      { status: 400 }
    );
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return NextResponse.json(
      { message: "Username is already taken" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  return NextResponse.json(user, { status: 201 });
}
