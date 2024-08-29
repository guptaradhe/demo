import { connectDB, disconnectDB, query } from "../../lib/db";
const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";

const { genSaltSync, hashSync } = require("bcrypt");

export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();
    let payload = await request.json();
    const name = payload.name;
    const email = payload.email || "";
    const address = payload.address;
    const dob = payload.dob;
    const mobile_no = payload.mobile_no;
    const salt = genSaltSync(10);
    const dec_password = hashSync(payload.password, salt);
    const auth_key = jwt.sign({ email }, "demo_project");
    const userExist = await query({
      query: "Select * from users where email=?",
      values: [email],
    });

    if (userExist.length != 0) {
      return NextResponse.json({
        status: 400,
        message: "User already registered with this Email.",
      });
    } else {
      await query({
        query:
          "INSERT INTO users (name, email, password, auth_key,address, mobile_no, dob ) VALUES (?,?,?,?,?,?,?)",
        values: [name, email, dec_password, auth_key, address, mobile_no, dob],
      });

      return NextResponse.json({
        status: 200,
        message: "User sign-up successfully.",
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
