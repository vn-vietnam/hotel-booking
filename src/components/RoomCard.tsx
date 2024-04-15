import { FC } from "react";
import Image from "next/image";

import { Room } from "@/models/room";
import Link from "next/link";

type Props = {
	room: Room;
};

const RoomCard: FC<Props> = (props) => {
	const {
		room: { coverImage, name, price, type, description, slug, isBooked },
	} = props;

	return (
		<div className=" my-10 mx-4 md:mx-8 rounded-xl md:w-96 w-full  border border-purple-700 flex flex-col justify-between">
			<div className=" ">
				<Image
					src={coverImage.url}
					alt={name}
					className="h-56 w-full lg:w-[400px] object-cover"
					width={1000}
					height={1000}
					// className=" h-[150px] object-cover rounded-t-xl"
				/>
			</div>

			<div className="p-4">
				<div className="flex justify-between flex-col text-md gap-3">
					<div className="text-md">$ {price}</div>
					<div className="font-bold text-xl text-purple-500">{name}</div>
					<p className="py-4 text-md font-mono">{type} Room</p>
					<div className="my-2 line-clamp-3 md:w-full text-sm/relaxed opacity-75">
						{description}
					</div>
				</div>
			</div>
			<Link
				href={`/room/${slug.current}`}
				className="border-2 inline-block text-center py-2 m-4 rounded-xl border-purple-700 hover:shadow-purple-700 text-md font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500 "
			>
				{isBooked ? "BOOKED" : "BOOK NOW"}
			</Link>
		</div>
	);
};

export default RoomCard;
