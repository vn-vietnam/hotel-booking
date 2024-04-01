"use client";
import { getRoom } from "@/lib/apis";
import React, { useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import Image from "next/image";
import BookRoomCta from "@/components/BookRoomCta";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { useToast } from "@/components/ui/use-toast";

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
	const fetchRoom = async () => getRoom(slug);
	const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);
	// console.log(room)
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

		const hotelRoomSlug = room.slug.current;
		// console.log(
		// 	checkinDate,
		// 	checkoutDate,
		// 	adults,
		// 	noOfChildren,
		// 	numberOfDays,
		// 	hotelRoomSlug
		// );

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
								description: "Booking Successfully",
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
		} catch (error) {
			return toast({
				title: "Something Wrong",
				description: "Something wrong in here!",
			});
			// toast.error("An error occured");
		}
	};

	return (
		<div>
			<div>{room.name}</div>
			<Image alt="img" width={300} height={300} src={room.coverImage.url} />
			<div>${room.price}</div>
			<div>{room.description}</div>
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
