import { connectDB, disconnectDB, query } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();
    const userData = await query({
      query: `SELECT user_id,name,email,address, mobile_no as mobile,  ifnull(DATE_FORMAT(dob,'%d-%m-%Y'), '') as dob FROM users;`,
    });

    return NextResponse.json({
      status: 200,
      message: "User details.",
      data: userData,
    });
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
