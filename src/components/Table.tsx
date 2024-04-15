"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { Booking } from "@/models/booking";

type Props = {
	bookingDetails: Booking[];
	setRoomId: Dispatch<SetStateAction<string | null>>;
	toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
	console.log(bookingDetails);
	// const status: string =
	const router = useRouter();

	return (
		<div className="overflow-x-auto max-w-[340px] sm:max-w-[600px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left border-purple-700 border-2">
				<thead className="text-xs  uppercase border-b-2 border-purple-700">
					<tr>
						<th className="px-6 py-3">Room name</th>
						<th className="px-6 py-3">Price</th>
						<th className="px-6 py-3">No. Days Booked</th>
						<th className="px-6 py-3">Day Check in</th>
						<th className="px-6 py-3">Day Check out</th>
						<th className="px-6 py-3">Rating</th>
						<th className="px-6 py-3">Status</th>
					</tr>
				</thead>
				<tbody>
					{bookingDetails.map((booking) => (
						<tr key={booking._id} className={` border-b `}>
							<th
								onClick={() =>
									router.push(`/room/${booking.hotelRoom.slug.current}`)
								}
								className="px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap"
							>
								{booking.hotelRoom.name}
							</th>
							<td className="px-6 py-4">${booking.hotelRoom.price}</td>

							<td className="px-6 py-4">{booking.numberOfDays}</td>
							<td className="px-6 py-4">{booking.checkinDate}</td>
							<td className="px-6 py-4">{booking.checkoutDate}</td>
							<td className="px-6 py-4">
								<button
									onClick={() => {
										setRoomId(booking.hotelRoom._id);
										toggleRatingModal();
									}}
									className="font-medium text-blue-600 hover:underline"
								>
									Rate
								</button>
							</td>
							<td className="px-6 py-4">
								<div
									className={`font-bold ${
										booking.checkStatus === "checking"
											? "text-gray-500"
											: "text-red-700"
									}`}
								>
									{booking.checkStatus}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
