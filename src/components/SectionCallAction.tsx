import {
	BookmarkFilledIcon,
	GroupIcon,
	HomeIcon,
	UpdateIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { FaBuyNLarge } from "react-icons/fa";
import { GiMatchbox } from "react-icons/gi";

function SectionCallAction() {
	return (
		<section className="">
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
				<div className="mx-auto max-w-lg text-center">
					<h2 className="text-3xl font-bold sm:text-4xl text-purple-500">
						Flexible Booking Options
					</h2>

					<p className="mt-4 ">
						Enjoy Peace of Mind with Flexible Booking Options! We understand
						plans can change. That's why we offer:
					</p>
				</div>

				<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<a
						className="block rounded-xl border border-purple-800 p-8 shadow-xl transition hover:border-x-purple-700 hover:shadow-purple-700/25"
						href="#"
					>
						<BookmarkFilledIcon color="purple" className="h-[50px] w-[50px]"  />

						<h2 className="mt-5 text-xl font-bold ">Standard Booking</h2>

						<p className="mt-5 text-sm ">
							Secure your room at our competitive rate with no hassle.
						</p>
					</a>

					<a
						className="block rounded-xl border border-purple-800 p-8 shadow-xl transition hover:border-x-purple-700 hover:shadow-purple-700/25"
						href="#"
					>
						<HomeIcon color="purple" className="h-[50px] w-[50px]"/>

						<h2 className="mt-5 text-xl font-bold ">Flexible Booking</h2>

						<p className="mt-5 text-sm ">
							Enjoy peace of mind with the ability to modify or cancel your
							reservation, ensuring flexibility for your changing plans
						</p>
					</a>

					<a
						className="block rounded-xl border border-purple-800 p-8 shadow-xl transition hover:border-x-purple-700 hover:shadow-purple-700/25"
						href="#"
					>
						<FaBuyNLarge color="purple" className="h-[50px] w-[50px]"/>

						<h2 className="mt-5 text-xl font-bold ">Advance Purchase</h2>

						<p className="mt-5 text-sm ">
							Plan ahead and save! Book in advance to access special discounts
							and offers
						</p>
					</a>

					<a
						className="block rounded-xl border border-purple-800 p-8 shadow-xl transition hover:border-x-purple-700 hover:shadow-purple-700/25"
						href="#"
					>
						<GiMatchbox color="purple" className="h-[50px] w-[50px]"/>

						<h2 className="mt-5 text-xl font-bold ">Last-Minute Deals</h2>

						<p className="mt-5 text-sm ">
							Score amazing discounts on remaining rooms for spontaneous
							getaways.
						</p>
					</a>

					<a
						className="block rounded-xl border border-purple-800 p-8 shadow-xl transition hover:border-x-purple-700 hover:shadow-purple-700/25"
						href="#"
					>
						<GroupIcon color="purple" className="h-[50px] w-[50px]"/>

						<h2 className="mt-5 text-xl font-bold ">Group Reservations</h2>

						<p className="mt-5 text-sm ">
							Planning a group trip? Contact us for special rates and
							personalized assistance.
						</p>
					</a>

					<a
						className="block rounded-xl border border-purple-800 p-8 shadow-xl transition hover:border-x-purple-700 hover:shadow-purple-700/25"
						href="#"
					>
						<UpdateIcon color="purple" className="h-[50px] w-[50px]"/>

						<h2 className="mt-5 text-xl font-bold ">Premium Upgrades</h2>

						<p className="mt-5 text-sm ">
							levate your experience with our premium upgrade options, including
							room enhancements, exclusive amenities
						</p>
					</a>
				</div>

				<div className="mt-12 text-center">
					<Link
						href="/room"
						className="inline-block   px-12 py-3 text-sm  border  hover:border-x-purple-700 focus:outline-none focus:ring focus:ring-purple-400 rounded-xl border-purple-700 hover:shadow-purple-700 text-md font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
					>
						Get Started Today
					</Link>
				</div>
			</div>
		</section>
	);
}

export default SectionCallAction;
