// src/api/login/route.ts

import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from "bcrypt";

dbConnect();

export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      error: "POST method is not supported",
    }),
    { status: 405 }
  );
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({
        success: false,
        status: 400,
        message: "email and password are required",
      }),
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new Response(
      JSON.stringify({
        success: false,
        status: 400,
        message: "Invalid credentials",
      }),
      { status: 400 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return new Response(
      JSON.stringify({
        success: true,
        status: 200,
        data: user,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        status: 400,
        message: "Wrong Password",
      }),
      { status: 400 }
    );
  }
}
