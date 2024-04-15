"use client";
import { LatLngTuple, icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";

const ICON = icon({
	iconUrl: "/pin.png",
	iconSize: [32, 32],
});
function MapWrapper(props: { dimention: string, roomName: string }) {
	const { dimention,roomName } = props;
	const dimentionX = Number(dimention.split(',')[0])
	const dimentionY = Number(dimention.split(',')[1])
	// console.log(dimention.split(','))
	const position: LatLngTuple = [dimentionX, dimentionY];
	return (
		<MapContainer
			center={position}
			zoom={13}
			scrollWheelZoom={false}
			className="w-[100%] h-[100%] "
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker  position={position} icon={ICON}>
				<Popup  className="font-bold text-purple-700">{roomName}</Popup>
			</Marker>
		</MapContainer>
	);
}

export default MapWrapper;
