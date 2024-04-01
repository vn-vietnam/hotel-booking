import FeaturedRoom from "@/components/FeaturedRoom";
import { getFeaturedRoom } from "@/lib/apis";
import { Room } from "@/models/room";
import React from "react";


async function page() {
	const  featuredRoom  = await getFeaturedRoom();
	// console.log(featuredRoom);
	return <div>
		 <FeaturedRoom  featuredRoom={featuredRoom} />
	</div>;
}

export default page;
