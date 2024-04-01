import { getUserData } from "@/lib/apis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return new NextResponse("Authentication Required", { status: 500 });
	}

	const userId = session.user.id;
	try {
		const data = await getUserData(userId);
		return NextResponse.json(data, { status: 200, statusText: "Successful" });
	} catch (error) {
		return new NextResponse("Unable to fetch", { status: 400 });
	}
}
