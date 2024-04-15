import axios from "axios";
import { FC } from "react";
import useSWR from "swr";
import { Review } from "@/models/review";
import Rating from "./Rating";
// import Rating from '../Rating/Rating';

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
	const fetchRoomReviews = async () => {
		try {
			let { data } = await axios.get<Review[]>(`/api/userReview/${roomId}`);
			return data;
		} catch (error) {
			console.error("Error fetching room reviews:", error);
			throw error;
		}
	};

	const { data: roomReviews, isLoading } = useSWR(
		"/api/room-review",
		fetchRoomReviews
	);
	return (
		<>
			{roomReviews &&
				roomReviews.map((review) => (
					<div
						className=" dark:bg-gray-900 p-4 rounded-lg border-2 border-purple-700 bg-gray-300"
						key={review._id}
					>
						<div className="font-semibold mb-2 flex ">
							<p>User: {review.user.name}</p>
							<div className="ml-4 flex items-center text-tertiary-light text-lg ">
								<Rating rating={review.userRating} />
							</div>
						</div>

						<p>{review.text}</p>
					</div>
				))}
		</>
	);
};

export default RoomReview;
