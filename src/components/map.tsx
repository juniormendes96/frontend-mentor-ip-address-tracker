import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type Coordinates = {
  lat: number;
  lng: number;
};
type ViewSetterProps = Coordinates;
export type MapProps = Coordinates;

const ViewSetter: React.FC<ViewSetterProps> = ({ lat, lng }) => {
  const map = useMap();
  map.setView({ lat, lng });
  return null;
};

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}></Marker>
      <ViewSetter lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default Map;
