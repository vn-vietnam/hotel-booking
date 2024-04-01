import { createBooking, getRoom } from "@/lib/apis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type ResquestData = {
	checkinDate: string;
	adults: number;
	checkoutDate: string;
	children: number;
	hotelRoomSlug: string;
	numberOfDays: number;
};

export async function POST(req: Request, res: Response) {
	const {
		checkinDate,
		adults,
		checkoutDate,
		children,
		hotelRoomSlug,
		numberOfDays,
	}: ResquestData = await req.json();
	// check error fill all information
	// if (
	// 	!checkinDate ||
	// 	!adults ||
	// 	!checkoutDate ||
	// 	!children ||
	// 	!hotelRoomSlug ||
	// 	!numberOfDays
	// ) {
	// 	return new NextResponse("Please all fields are required", { status: 400 });
	// }

	const session = await getServerSession(authOptions);
	if (!session) {
		return new NextResponse("Authentication required", { status: 400 });
	}
	const userId = session.user.id;
	const formattedCheckoutDate = checkoutDate.split("T")[0];
	const formattedCheckinDate = checkinDate.split("T")[0];

	try {
		const room = await getRoom(hotelRoomSlug);
		// console.log(room)
		const discountPrice = room.price - (room.price / 100) * room.discount;
		const totalPrice = discountPrice * numberOfDays;
		await createBooking({
			adults: Number(adults),
			checkinDate: formattedCheckoutDate,
			checkoutDate: formattedCheckinDate,
			children: Number(children),
			hotelRoom: room._id,
			numberOfDays: Number(numberOfDays),
			discount: Number(room.discount),
			totalPrice: Number(totalPrice),
			user: userId,
		});
		return NextResponse.json("Booking successful", {
			status: 200,
			statusText: "Booking Successful",
		});
	} catch (error) {
		NextResponse.json("ERROR ", {
			status: 500,
			statusText: "ERROR",
		});
	}
}
