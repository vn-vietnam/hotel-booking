import React from "react";

function FAQ() {
	return (
		<div>
			<div className="space-y-4 p-4 sm:p-8 w-full md:w-[50%] mx-auto">
				<h2 className="text-3xl text-center p-4 tracking-tight font-bold sm:text-4xl text-purple-500">
					Frequently Asked Questions (FAQ)
				</h2>
				<details
					className="group [&_summary::-webkit-details-marker]:hidden"
					open
				>
					<summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-purple-600 p-4">
						<h2 className="font-medium">How can I make a reservation?</h2>

						<svg
							className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</summary>

					<p className="mt-4 px-4 leading-relaxed opacity-75 ">
						You can easily make a reservation by visiting our website and using
						our online booking system, or by contacting our reservation team
						directly via phone or email
					</p>
				</details>
				<details className="group [&_summary::-webkit-details-marker]:hidden">
					<summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-purple-600 p-4">
						<h2 className="font-medium">What is your cancellation policy?</h2>

						<svg
							className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</summary>

					<p className="mt-4 px-4 leading-relaxed opacity-75 ">
						Our cancellation policy varies depending on the type of booking you
						choose. For specific details, please refer to the terms and
						conditions provided during the booking process or contact our
						reservation team for assistance.
					</p>
				</details>
				<details className="group [&_summary::-webkit-details-marker]:hidden">
					<summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-purple-600 p-4">
						<h2 className="font-medium">
							Do you offer special rates for group bookings?
						</h2>

						<svg
							className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</summary>

					<p className="mt-4 px-4 leading-relaxed opacity-75 ">
						Do you offer special rates for group bookings?
					</p>
				</details>
				<details className="group [&_summary::-webkit-details-marker]:hidden">
					<summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-purple-600 p-4">
						<h2 className="font-medium">
							Are there any additional fees or charges?
						</h2>

						<svg
							className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</summary>

					<p className="mt-4 px-4 leading-relaxed opacity-75 ">
						Our pricing is transparent, and we strive to minimize additional
						fees or charges. However, certain services or amenities may be
						subject to additional fees, which will be clearly outlined during
						the booking process.
					</p>
				</details>
			</div>
			<section className="">
				<div className="p-8 md:p-12 lg:px-16 lg:py-24 ">
					<div className="mx-auto max-w-lg text-center">
						<h2 className="text-3xl text-center p-4 tracking-tight font-bold sm:text-4xl text-purple-500">
							Latest News
						</h2>

						<p className="hidden text-gray-500 sm:mt-4 sm:block">
						To receive our newspaper via email, please provide us with your email address, and we will add you to our mailing list.
						</p>
					</div>

					<div className="mx-auto mt-8 max-w-xl">
						<form action="#" className="sm:flex sm:gap-4">
							<div className="sm:flex-1">
								<label htmlFor="email" className="sr-only">
									Email
								</label>

								<input
									type="email"
									placeholder="Email address"
									className="w-full rounded-md border-purple-500 border bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-purple-400"
								/>
							</div>

							<button
								type="submit"
								className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-purple-700 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-purple-400 sm:mt-0 sm:w-auto"
							>
								<span className="text-sm font-medium"> Sign Up </span>

								<svg
									className="size-5 rtl:rotate-180"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

export default FAQ;
