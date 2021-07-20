import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export type Props = {
  lat: number;
  lng: number;
};

const Map: React.FC<Props> = ({ lat, lng }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;