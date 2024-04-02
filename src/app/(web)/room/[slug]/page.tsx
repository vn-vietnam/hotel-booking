"use client";
import { getRoom } from "@/lib/apis";
import React, { useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import Image from "next/image";
import BookRoomCta from "@/components/BookRoomCta";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RoomReview from "@/components/RoomReview";

function page(props: { params: { slug: string } }) {
	const { toast } = useToast();
	const [checkinDate, setCheckinDate] = useState<Date | null>(null);
	const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
	const [adults, setAdults] = useState(1);
	const [noOfChildren, setNoOfChildren] = useState(0);
	const {
		params: { slug },
	} = props;
	//
	const router = useRouter();
	const fetchRoom = async () => getRoom(slug);
	const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);
	const session = useSession();
	// console.log(session);
	if (error) throw new Error("Cannot fetch data");
	if (typeof room === "undefined" && !isLoading)
		throw new Error("Cannot fetch data");

	if (!room) return <LoadingSpinner />;

	//
	const calcMinCheckoutDate = () => {
		if (checkinDate) {
			const nextDay = new Date(checkinDate);
			nextDay.setDate(nextDay.getDate() + 1);
			return nextDay;
		}
		return null;
	};
	const calcNumDays = () => {
		if (!checkinDate || !checkoutDate) return;
		const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
		const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
		return noOfDays;
	};
	const handleBookNowClick = async () => {
		if (!session.data) {
			return toast({
				title: "Warning",
				description: "Please login before booking",
			});
		}
		if (!checkinDate || !checkoutDate) {
			return toast({
				title: "Warning",
				description: "Please provide checkin / checkout date",
			});
		}

		if (checkinDate > checkoutDate) {
			return toast({
				title: "Warning",
				description: "Please choose a valid checkin period",
			});
		}

		const numberOfDays = calcNumDays();
		// data.user.id
		const hotelRoomSlug = room.slug.current;
		try {
			const config: AxiosRequestConfig = {
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					if (progressEvent.total !== undefined) {
						let percentCompleted = Math.floor(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						// Your progress handling logic here
						if (percentCompleted == 100) {
							return toast({
								title: "Success",
								description: "Booking Successfully. Please wait a second!",
							});
						}
					}
				},
			};
			await axios.post(
				"/api/booking",
				{
					checkinDate,
					checkoutDate,
					adults,
					children: noOfChildren,
					numberOfDays,
					hotelRoomSlug,
				},
				config
			);
			router.push(`/user/${session?.data?.user?.id}`);
		} catch (error) {
			return toast({
				title: "Something Wrong",
				description: "Something wrong in here!",
			});
		}
	};
	// console.log(room._id)
	return (
		<div>
			<div>{room.name}</div>
			<Image alt="img" width={300} height={300} src={room.coverImage.url} />
			<div>${room.price}</div>
			<div>{room.description}</div>
			{/* review */}
			<div className="shadow dark:shadow-white rounded-lg p-6">
				<div className="items-center mb-4">
					<p className="md:text-lg font-semibold">Customer Reviews</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<RoomReview roomId={room._id} />
				</div>
			</div>
			<BookRoomCta
				discount={room.discount}
				price={room.price}
				specialNote={room.specialNote}
				checkinDate={checkinDate}
				setCheckinDate={setCheckinDate}
				checkoutDate={checkoutDate}
				setCheckoutDate={setCheckoutDate}
				calcMinCheckoutDate={calcMinCheckoutDate}
				adults={adults}
				noOfChildren={noOfChildren}
				setAdults={setAdults}
				setNoOfChildren={setNoOfChildren}
				isBooked={room.isBooked}
				handleBookNowClick={handleBookNowClick}
			/>
		</div>
	);
}

export default page;
