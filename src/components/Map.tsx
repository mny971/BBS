import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Session, ActivityType } from '../types';
import { MAP_CENTER } from '../constants';

const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  sessions: Session[];
  selectedSessionId: string | null;
  onSelectSession: (session: Session) => void;
}

const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, {
      animate: true,
      duration: 1.5
    });
  }, [center, map]);
  return null;
};

const MapView: React.FC<MapProps> = ({ sessions, selectedSessionId, onSelectSession }) => {
  
  const createCustomIcon = (session: Session, isSelected: boolean) => {
    // Base color derived from activity type
    let typeClass = 'wake'; // Default Blue
    let emoji = '🏄';
    
    if (session.type === ActivityType.FISHING) {
        typeClass = 'fishing'; // Orange
        emoji = '🎣';
    }

    const seatsLeft = session.totalSeats - session.bookedSeats;
    const isUrgent = seatsLeft > 0 && seatsLeft <= 2;
    const isFull = seatsLeft === 0;
    const isRequested = session.isRequested;
    
    // Add 'urgent' class for animation, but keep typeClass for color
    const urgentClass = isUrgent ? 'urgent' : '';

    // Determine badge content
    let badgeHtml = '';
    if (isFull) {
        badgeHtml = `<span class="badge" style="background: #EF4444; border-color: #EF4444;">FULL</span>`;
    } else if (isRequested) {
        badgeHtml = `<span class="badge" style="background: #374151; border-color: #374151;">REQ</span>`;
    } else if (isUrgent) {
        badgeHtml = `<span class="badge">${seatsLeft} LEFT</span>`;
    }

    // Requested trips appear grayed out or distinct
    const requestedStyle = isRequested ? 'filter: grayscale(100%);' : '';

    return L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div class="marker-pin ${typeClass} ${urgentClass} ${isSelected ? 'selected' : ''} ${isFull ? 'grayscale opacity-80' : ''}" style="${requestedStyle}">
          <span>${emoji}</span>
          ${badgeHtml}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 46]
    });
  };

  return (
    <MapContainer 
      center={MAP_CENTER} 
      zoom={13} 
      style={{ height: '100%', width: '100%', zIndex: 0 }} 
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {sessions.map(session => (
        <Marker
          key={session.id}
          position={session.coordinates}
          icon={createCustomIcon(session, selectedSessionId === session.id)}
          eventHandlers={{
            click: () => onSelectSession(session),
          }}
        />
      ))}

      {selectedSessionId && sessions.find(s => s.id === selectedSessionId) && (
        <MapController center={sessions.find(s => s.id === selectedSessionId)!.coordinates} />
      )}
    </MapContainer>
  );
};

export default MapView;