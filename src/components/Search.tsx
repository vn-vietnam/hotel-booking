"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC } from "react";

type Props = {
	roomTypeFilter: string;
	searchQuery: string;
	setRoomTypeFilter: (value: string) => void;
	setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
	roomTypeFilter,
	searchQuery,
	setRoomTypeFilter,
	setSearchQuery,
}) => {
	const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setRoomTypeFilter(event.target.value);
	};

	const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="mb-10 mx-4 md:mx-8 flex gap-4 flex-wrap justify-between items-center">
			<select
				value={roomTypeFilter}
				onChange={handleRoomTypeChange}
				className=" px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none border"
			>
				<option value="All">All</option>
				<option value="Basic">Basic</option>
				<option value="Luxury">Luxury</option>
				<option value="Suite">Suite</option>
			</select>

			<input
				type="search"
				id="search"
				placeholder="Search..."
				className=" px-4 py-3 rounded border leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white"
				value={searchQuery}
				onChange={handleSearchQueryChange}
			/>
		</div>
	);
};

export default Search;
