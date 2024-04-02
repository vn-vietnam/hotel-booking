import Link from "next/link";
import React from "react";

function Banner() {
	return (
		<section className=" ">
			<div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
				<div className="mx-auto max-w-3xl text-center">
					<h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
						Book Your Perfect Getaway!
						<span className="sm:block"> Increase Conversion. </span>
					</h1>

					<p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
					24/7 Customer Support - Book Now & Make Your Stay Unforgettable!
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link
						className="inline-block rounded  px-12 py-3 text-sm font-medium border-purple-700 border transition hover:shadow-xl hover:shadow-purple-700/25 hover:border-x-purple-700 focus:outline-none focus:ring focus:ring-purple-400"
							href="/room"
						>
							Get Started
						</Link>
						<Link
						className="inline-block rounded  px-12 py-3 text-sm font-medium border-purple-700 border transition hover:shadow-xl hover:shadow-purple-700/25 hover:border-x-purple-700 focus:outline-none focus:ring focus:ring-purple-400"
							href="/room"
						>
							Learn More
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Banner;
