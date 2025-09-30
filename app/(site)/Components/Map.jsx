'use client'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import ResetCenterView from './ResetCenterView';

const position = [13.778922, 100.4754889]

export default function Map() {
    return (
        <div className="w-full h-full mt-8" >
            <MapContainer
                className="w-full h-full "
                center={position} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        ramen noodles 
                    </Popup>
                </Marker>
                <ResetCenterView position={position} />

            </MapContainer>
        </div>
    )
}