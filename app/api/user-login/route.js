import { connectDB, disconnectDB, query } from "../../lib/db";

import { NextResponse } from "next/server";

const bcrypt = require("bcryptjs");

export async function POST(request) {
  try {
    await connectDB();
    let payload = await request.json();

    const email = payload.email;
    const password = payload.password;
    const userSignInData = await query({
      query: `Select * from users where email=?`,
      values: [email],
    });

    if (userSignInData.length != 0) {
      const checkPassword = bcrypt.compareSync(
        password,
        userSignInData[0].password
      );
      if (checkPassword) {
        const response = NextResponse.json({
          status: 200,
          message: "User sign in successfully.",
          data: userSignInData[0].auth_key,
        });
        response.cookies.set("authToken", userSignInData[0].auth_key, {
          expiresIn: "1d",
          httpOnly: false,
        });
        return response;
      } else {
        return NextResponse.json({
          status: 401,
          message: "User password not matched.",
        });
      }
    } else {
      return NextResponse.json({
        status: 400,
        message: "User not registered with this email.",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error.",
      error: err,
    });
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
