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
		<div className=" my-10 mx-4 md:mx-8 rounded-xl md:w-72 w-full  border border-purple-700">
			<div className=" ">
				<Image
					src={coverImage.url}
					alt={name}
					width={250}
					height={250}
					className="w-full h-[250px] object-cover rounded-t-xl"
				/>
			</div>

			<div className="p-4 ">
				<div className="flex justify-between flex-col text-md gap-3">
					<div>$ {price}</div>
					<div className="">{name}</div>
				</div>

				<p className="py-4 text-md font-mono">{type} Room</p>
				<Link
					href={`/room/${slug.current}`}
					className="border border-2 inline-block text-center w-full py-4 rounded-xl  text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
				>
					{isBooked ? "BOOKED" : "BOOK NOW"}
				</Link>
			</div>
		</div>
	);
};

export default RoomCard;
