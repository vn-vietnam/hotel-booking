import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<footer className="">
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link href={"/"} className="flex justify-center  sm:justify-start">
						<Image src={"/logoipsum.svg"} width={35} height={35} alt="logo" />
					</Link>

					<p className="mt-4 text-center text-sm  lg:mt-0 lg:text-right">
						Copyright &copy; 2024. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
