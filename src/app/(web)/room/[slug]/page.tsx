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
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import dynamic from "next/dynamic";
import { Bed } from "lucide-react";
function page(props: { params: { slug: string } }) {
	const MapWrapper = dynamic(
		() => import("../../../../components/MapWrapper"),
		{
			ssr: false,
		}
	);
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
	// console.log(room)
	const session = useSession();
	// 
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
	
	return (
		<div className="p-4 md:p-8 flex flex-col gap-5">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/room">Hotels</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{room.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Image
				alt="img"
				width={1000}
				height={1000}
				src={room.coverImage.url}
				className="w-full h-[300px] object-cover"
			/>
			<div className="flex w-full">
				{room.images.map((img, index) => (
					<div className="flex-1" key={index}>
						<Image
							alt={img._key}
							src={img.url}
							width={400}
							height={400}
							className="w-[100%] h-[200px] object-cover"
						/>
					</div>
				))}
			</div>
			<div className="flex flex-col gap-4">
				<div className="text-xl font-semibold">{room.name}</div>
				<div>$ {room.price}</div>
				<div className="flex gap-2">
					<Bed />
					<div> Bed: {room.numberOfBeds} </div>
				</div>
				<div className="flex gap-2">
					{room?.offeredAmenities?.map((icon) => (
						<div key={icon._key}>
							<div className="p-2 border border-1 border-purple-700 hover:shadow-purple-700 rounded-lg text-sm">{icon.amenity}</div>
						</div>
					))}
				</div>
				<div className="whitespace-pre-line">{room.description}</div>
			</div>
			<div className="w-full h-[200px] sm:h-[500px]">
				<MapWrapper dimention={room.dimension} roomName={room.name} />
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
			{/* review */}
			<div className="shadow dark:shadow-white rounded-lg p-4 border-2 border-purple-700">
				<div className="items-center mb-4">
					<p className="md:text-lg font-semibold">Customer Reviews</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<RoomReview roomId={room._id} />
				</div>
			</div>
		</div>
	);
}

export default page;
