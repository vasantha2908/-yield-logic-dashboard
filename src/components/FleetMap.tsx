import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';

const createTruckIcon = (color: string) => divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="
      background-color: #ffffff;
      padding: 4px;
      border-radius: 50%;
      border: 2px solid ${color};
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      box-sizing: border-box;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10h1"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
    </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

const farmIcon = divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="
      background-color: var(--accent-emerald);
      padding: 6px;
      border-radius: 8px;
      border: 2px solid #fff;
      box-shadow: 0 4px 15px rgba(121, 149, 63, 0.4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
    </div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -44]
});

export default function FleetMap({ previewOnly }: { previewOnly?: boolean }) {
  // A generic farmland location (e.g. coordinates in Midwest US)
  const farmLocation: [number, number] = [41.8781, -93.6298];

  const [trucks, setTrucks] = useState([
    { id: 1, pos: [41.8900, -93.6500] as [number, number], color: 'var(--accent-emerald)', label: 'Pickup 1 - 15 mins away' },
    { id: 2, pos: [41.8500, -93.6000] as [number, number], color: 'var(--accent-cyan)', label: 'Pickup 2 - 30 mins away' },
  ]);

  useEffect(() => {
    if (previewOnly) return; // Prevent messy movements on summary page if desired, or let them move. We'll let them move!
    
    const interval = setInterval(() => {
      setTrucks(prev => prev.map(t => {
        const latDiff = farmLocation[0] - t.pos[0];
        const lngDiff = farmLocation[1] - t.pos[1];
        
        // Stop moving if very close
        if (Math.abs(latDiff) < 0.0005 && Math.abs(lngDiff) < 0.0005) {
          return { ...t, pos: [farmLocation[0], farmLocation[1]] };
        }
        
        return {
          ...t,
          pos: [
             t.pos[0] + (latDiff * 0.05) + (Math.random() * 0.0002 - 0.0001), 
             t.pos[1] + (lngDiff * 0.05) + (Math.random() * 0.0002 - 0.0001)
          ]
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [previewOnly]);

  return (
    <div className="glass-panel" style={{ height: previewOnly ? '350px' : '600px', display: 'flex', flexDirection: 'column' }}>
       <h3 style={{ marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>WHERE ARE MY TRUCKS?</h3>
       <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>Watch your scheduled pickup trucks arrive in real-time. We automatically handle all routing for you.</p>
       
       <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative', zIndex: 0 }}>
         <MapContainer 
           center={farmLocation} 
           zoom={13} 
           style={{ height: '100%', width: '100%', backgroundColor: '#e5e7eb' }} 
           zoomControl={!previewOnly}
           scrollWheelZoom={!previewOnly}
           dragging={!previewOnly}
         >
           <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           
           <Marker position={farmLocation} icon={farmIcon}>
             <Popup><strong>YOUR FARM</strong><br/>Storage Status: Optimal</Popup>
           </Marker>
           
           {trucks.map(t => (
             <Marker key={t.id} position={t.pos} icon={createTruckIcon(t.color)}>
                <Popup><strong>{t.label}</strong></Popup>
             </Marker>
           ))}
         </MapContainer>
       </div>
    </div>
  );
}
