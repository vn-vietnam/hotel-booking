"use client";
import RoomCard from "@/components/RoomCard";
import Search from "@/components/Search";
import { getRooms } from "@/lib/apis";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Frown } from "lucide-react";
import LoadingSpinner from "../loading";
function page() {
	const [roomTypeFilter, setRoomTypeFilter] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const searchParams = useSearchParams();
	useEffect(() => {
		const searchQuery = searchParams.get("searchQuery");
		const roomType = searchParams.get("roomType");

		if (roomType) setRoomTypeFilter(roomType);
		if (searchQuery) setSearchQuery(searchQuery);
	}, []);

	async function fetchData() {
		return getRooms();
	}

	const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);
	// console.log(data);
	if (error) throw new Error("Cannot fetch data");
	if (typeof data === "undefined" && !isLoading)
		throw new Error("Cannot fetch data");

	const filterRooms = (rooms: Room[]) => {
		return rooms.filter((room) => {
			// Apply room type filter

			if (
				roomTypeFilter &&
				roomTypeFilter.toLowerCase() !== "all" &&
				room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
			) {
				return false;
			}

			//   Apply search query filter
			if (
				searchQuery &&
				!room.name.toLowerCase().includes(searchQuery.toLowerCase())
			) {
				return false;
			}

			return true;
		});
	};

	const filteredRooms = filterRooms(data || []);
	if (isLoading) {
		<LoadingSpinner />;
	}
	return (
		<div className="min-h-screen">
			<Search
				roomTypeFilter={roomTypeFilter}
				searchQuery={searchQuery}
				setRoomTypeFilter={setRoomTypeFilter}
				setSearchQuery={setSearchQuery}
			/>

			<div className="flex justify-start gap-5 flex-wrap">
				{filteredRooms.length !== 0 ? (
					filteredRooms.map((room) => <RoomCard key={room._id} room={room} />)
				) : (
					<div className="flex justify-center items-center flex-col w-full h-full gap-5">
						<div>Sorry I can't find the hotel</div>
						<Frown />
					</div>
				)}
			</div>
		</div>
	);
}

export default page;
