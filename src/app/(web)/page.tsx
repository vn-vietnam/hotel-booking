import Banner from "@/components/Banner";
import FAQ from "@/components/FAQ";
import FeaturedRoom from "@/components/FeaturedRoom";
import SectionCallAction from "@/components/SectionCallAction";
import Testimonial from "@/components/Testimonial";
import { getFeaturedRoom } from "@/lib/apis";
import React from "react";


async function page() {
	const featuredRoom = await getFeaturedRoom();
	return (
		<div>
			<Banner />
			<SectionCallAction />
			<Testimonial />
			<FeaturedRoom featuredRoom={featuredRoom} />
			<FAQ />
		</div>
	);
}

export default page;
