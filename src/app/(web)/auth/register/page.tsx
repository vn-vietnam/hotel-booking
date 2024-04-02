"use client";
// import { signUpHandler } from "next-auth-sanity";
import { signUp } from "next-auth-sanity/client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const defaultFormData = {
	email: "",
	name: "",
	password: "",
};

function page() {
	const { toast } = useToast();
	const [formData, setFormData] = useState(defaultFormData);
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const user = await signUp(formData);
			if (user) {
				console.log(user);
				toast({
					title: "Success",
					description: "Please sign in",
				});
			}
		} catch (error) {
			console.log(error);
			toast({
				title: "error",
				description: "Something wen't wrong",
			});
		} finally {
			setFormData(defaultFormData);
		}
	};
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			// toast({
			// 	title: "Alert",
			// 	description: "Already sign in",
			// });
			router.push("/");
		}
	}, [router, session]);
	const loginHandler = async () => {
		try {
			await signIn();
			router.push("/");
		} catch (error) {
			console.log(error);
			toast({
				title: "error",
				description: "Something wen't wrong",
			});
		}
	};

	return (
		<section className="">
			<div className=" min-h-[75vh] ">
				<main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
					<div className="max-w-xl lg:max-w-3xl">
						<form
							action="#"
							className="mt-8 grid grid-cols-6 gap-6"
							onSubmit={handleSubmit}
						>
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="name"
									className="block text-sm font-medium "
								>
									Name
								</label>

								<input
									value={formData.name}
									onChange={handleInputChange}
									type="text"
									id="name"
									name="name"
									className="mt-1 w-full rounded-md border-gray-500 border-2 p-2 text-sm  shadow-sm "
								/>
							</div>
							<div className="col-span-6">
								<label
									htmlFor="Email"
									className="block text-sm font-medium "
								>
									{" "}
									Email{" "}
								</label>

								<input
									value={formData.email}
									onChange={handleInputChange}
									type="email"
									id="Email"
									name="email"
									className="mt-1 w-full rounded-md border-gray-500 border-2 p-2 text-sm  shadow-sm"
								/>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="Password"
									className="block text-sm font-medium "
								>
									{" "}
									Password{" "}
								</label>

								<input
									value={formData.password}
									onChange={handleInputChange}
									type="password"
									id="Password"
									name="password"
									className="mt-1 w-full rounded-md border-gray-500 border-2 p-2 text-sm  shadow-sm"
								/>
							</div>

							<div className="col-span-6 sm:flex sm:items-center sm:gap-4">
								<button
									type="submit"
									className="inline-block shrink-0 rounded-md border border-purple-600  px-12 py-3 text-sm font-medium transition hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500"
								>
									Create an account
								</button>

								<p className="mt-4 text-sm  sm:mt-0">
									{/* Already have an account? */}
									<a
										href="#"
										className=" underline"
										onClick={loginHandler}
									>
										Log in
									</a>
									
								</p>
							</div>
						</form>
					</div>
				</main>
			</div>
		</section>
	);
}

export default page;
