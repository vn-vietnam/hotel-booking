"use client";
import { User } from "@/models/user";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { getUserBookings } from "@/lib/apis";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import Table from "@/components/Table";
import Chart from "@/components/Chart";
import RatingModal from "@/components/RatingModal";
import BackDrop from "@/components/BackDrop";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
function UserPage(props: { params: { id: string } }) {
	const { toast } = useToast();
	const router = useRouter();
	const [roomId, setRoomId] = useState<string | null>(null);
	const [isRatingVisible, setIsRatingVisible] = useState(false);
	const [isSubmittingReview, setIsSubmittingReview] = useState(false);
	const [ratingValue, setRatingValue] = useState<number | null>(0);
	const [ratingText, setRatingText] = useState("");
	const toggleRatingModal = () => setIsRatingVisible((prevState) => !prevState);
	const reviewSubmitHandler = async () => {
		if (!ratingText.trim().length || !ratingValue) {
			toast({
				title: "error",
				description: "Please provide a rating text and a rating",
			});
			return "Please provide a rating text and a rating";
			// console.log("error")
		}

		if (!roomId) {
			toast({
				title: "error",
				description: "Review Failed",
			});
			return "error";
		}
		setIsSubmittingReview(true);

		try {
			const { data } = await axios.post("/api/user", {
				reviewText: ratingText,
				ratingValue,
				roomId,
			});
			toast({
				title: "success",
				description: "Review Submitted",
			});
		} catch (error: any) {
			// console.log(error.response.data.data);
			toast({
				title: "error",
				description: error.response.data.data,
			});
		} finally {
			setRatingText("");
			setRatingValue(null);
			setRoomId(null);
			setIsSubmittingReview(false);
			setIsRatingVisible(false);
		}
	};

	const {
		params: { id },
	} = props;
	const [currentNav, setCurrentNav] = useState<
		"bookings" | "amount" | "ratings"
	>("bookings");
	const fetchUserData = async () => {
		const { data } = await axios.get<User>("/api/user");
		return data;
	};
	const fetchUserBooking = async () => getUserBookings(id);

	const { data: userData, isLoading } = useSWR("/api/users", fetchUserData);
	const { data: userBookings, isLoading: isLoadingUserBooking } = useSWR(
		"/api/userbooking",
		fetchUserBooking
	);
	// console.log(userBookings)

	if (isLoading || isLoadingUserBooking) return <LoadingSpinner />;
	if (!userData) {
		// console.log("not user");
		router.replace('/')
	}
	return (
		<div className="mx-auto px-4 md:px-8 py-10 ">
			<div className="grid md:grid-cols-12 gap-10">
				<div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 border rounded-lg px-6 py-4">
					<div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
						<Image
							src={userData?.image || "/user.webp"}
							alt={userData?.name as string}
							width={143}
							height={143}
							className="img scale-animation rounded-full"
						/>
					</div>
					<div className="font-normal py-4 text-left">
						<h6 className="text-xl font-bold pb-3">About</h6>
						<p className="text-sm">{userData?.about ?? ""}</p>
					</div>
					<div className="font-normal text-left">
						<h6 className="text-xl font-bold pb-3">{userData?.name}</h6>
					</div>
					<div className="flex items-center">
						<p className="mr-2">Sign Out</p>
						<FaSignOutAlt
							className="text-3xl cursor-pointer"
							onClick={() => signOut({ callbackUrl: "/" })}
						/>
					</div>
				</div>

				<div className="md:col-span-8 lg:col-span-9 gap-4 flex flex-col">
					<div className="flex items-center">
						<h5 className="text-2xl font-bold mr-3">Hello, {userData?.name}</h5>
					</div>
					<div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden">
						<Image
							className="img scale-animation rounded-full"
							width={56}
							height={56}
							src={userData?.image || "/user.webp"}
							alt="User Name"
						/>
					</div>
					<p className="block w-fit md:hidden text-sm py-2">
						{userData?.about ?? ""}
					</p>

					<p className="text-xs py-2 font-medium">
						Joined In {userData?._createdAt.split("T")[0]}
					</p>
					<div className="md:hidden flex items-center my-2">
						<p className="mr-2">Sign out</p>
						<FaSignOutAlt
							className="text-3xl cursor-pointer"
							onClick={() => signOut({ callbackUrl: "/" })}
						/>
					</div>

					<nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg  mt-7">
						<ol
							className={`${
								currentNav === "bookings" ? "text-blue-600" : "text-gray-400"
							} inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
						>
							<li
								onClick={() => setCurrentNav("bookings")}
								className="inline-flex items-center cursor-pointer"
							>
								<BsJournalBookmarkFill />
								<a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
									Current Bookings
								</a>
							</li>
						</ol>
						<ol
							className={`${
								currentNav === "amount" ? "text-blue-600" : "text-gray-400"
							} inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
						>
							<li
								onClick={() => setCurrentNav("amount")}
								className="inline-flex items-center cursor-pointer"
							>
								<GiMoneyStack />
								<a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
									Amount Spent
								</a>
							</li>
						</ol>
					</nav>

					{currentNav === "bookings" ? (
						userBookings && (
							<Table
								bookingDetails={userBookings}
								setRoomId={setRoomId}
								toggleRatingModal={toggleRatingModal}
							/>
						)
					) : (
						<></>
					)}

					{currentNav === "amount" ? (
						userBookings && <Chart userBookings={userBookings} />
					) : (
						<></>
					)}
				</div>
			</div>
			<RatingModal
				isOpen={isRatingVisible}
				ratingValue={ratingValue}
				setRatingValue={setRatingValue}
				ratingText={ratingText}
				setRatingText={setRatingText}
				isSubmittingReview={isSubmittingReview}
				reviewSubmitHandler={reviewSubmitHandler}
				toggleRatingModal={toggleRatingModal}
			/>
			<BackDrop isOpen={isRatingVisible} />
		</div>
	);
}

export default UserPage;
