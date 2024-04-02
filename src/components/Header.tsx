"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
function Header() {
	const { data: Session } = useSession();
	// console.log(Session);
	const { setTheme } = useTheme();
	return (
		<header className="">
			<div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
				<Link className="block text-teal-600" href="/">
					<span className="sr-only">Home</span>
					<Image alt="logo" src={"/logoipsum.svg"} width={30} height={30} />
				</Link>

				<div className="flex flex-1 items-center justify-end md:justify-between">
					<nav aria-label="Global" className="hidden md:block">
						<ul className="flex items-center gap-6 text-sm">
							<li>
								<Link className="" href="/room">
									Hotel
								</Link>
							</li>
							<li>
								<Link className="" href="/blog">
									Blog
								</Link>
							</li>
							<li>
								<Link className="" href="/about">
									About me
								</Link>
							</li>
						</ul>
					</nav>

					<div className="flex items-center gap-4">
						<Button
							className="border border-purple-700"
							variant="outline"
							size="icon"
						>
							<SunIcon
								className="h-[1.2rem] w-[1.2rem]  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
								onClick={() => setTheme("dark")}
							/>
							<MoonIcon
								className="absolute h-[1.2rem] w-[1.2rem]  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
								onClick={() => setTheme("light")}
							/>
						</Button>
						{Session ? (
							<Link href={"/user/" + Session?.user?.id} className="flex gap-3">
								<Image
									alt="img-user"
									src={Session?.user?.image || "/user.webp"}
									width={30}
									height={30}
									className="rounded-full h-[35px] w-[35px]"
								/>

								<Button onClick={() => signOut()}>SignOut</Button>
							</Link>
						) : (
							<>
								<div className="sm:flex sm:gap-4">
									<div
										className="cursor-pointer block rounded-md bg-purple-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-800"
										onClick={() => signIn()}
									>
										Login
									</div>

									<Link
										className="hidden rounded-md bg-purple-700 px-5 py-2.5 text-sm text-white font-medium  transition hover:bg-purple-800 sm:block"
										href={"/auth/register"}
									>
										Register
									</Link>
								</div>
							</>
						)}

						<Popover>
							<PopoverTrigger>
								<div className="block rounded  p-2.5 border border-purple-700 transition  md:hidden">
									<span className="sr-only">Toggle menu</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</div>
							</PopoverTrigger>
							<PopoverContent className="w-auto">
								<ul className="flex flex-col items-end gap-3">
									<li>
										<Link href={"/auth/register"}>Register</Link>
									</li>
									<li>
										<Link href={"/blog"}>Blog</Link>
									</li>
									<li>
										<Link href={"/about"}>About me</Link>
									</li>
								</ul>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
