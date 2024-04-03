import { Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
	featuredRoom: Room[];
};

const FeaturedRoom: FC<Props> = (props) => {
	const { featuredRoom } = props;
	// console.log(featuredRoom);
	return (
		<>
			<h2 className="text-3xl text-center tracking-tight font-bold sm:text-4xl text-purple-500">
				Featured Hotels
			</h2>
			<section className="p-4 md:p-8 flex gap-5 flex-col md:flex-row lg:justify-center ">
				{featuredRoom &&
					featuredRoom?.map((hotel, index) => (
						<article
							key={index}
							className="overflow-hidden rounded-lg  transition hover:shadow-lg cursor-pointer border border-purple-700 hover:shadow-purple-700"
						>
							<Link href={`/room/${hotel?.slug?.current}`}>
								<Image
									alt=""
									src={hotel?.coverImage?.url}
									className="h-56 w-full lg:w-[400px] object-cover"
									width={1000}
									height={1000}
								/>

								<div className=" p-4 sm:p-6">
									<div className="block text-xs ">$ {hotel?.price}</div>

									<div>
										<h3 className="mt-2 text-md ">{hotel?.name}</h3>
									</div>

									<div className="mt-2 line-clamp-3 md:w-[350px] text-sm/relaxed opacity-75">
										{hotel?.description}
									</div>
								</div>
							</Link>
						</article>
					))}
			</section>
		</>
	);
};

export default FeaturedRoom;
