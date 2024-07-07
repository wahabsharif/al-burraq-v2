import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      {
        status: 400,
      }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "Email is already taken" }), {
      status: 400,
    });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return new Response(
      JSON.stringify({ message: "Username is already taken" }),
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  return new Response(JSON.stringify(user), {
    status: 201,
  });
}
