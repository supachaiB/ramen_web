import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ResetCenterView({ position }) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();   // บังคับให้ map render ใหม่
      map.setView(position);  // เซ็ตให้อยู่ตรงกลางอีกครั้ง
    }, 100);
  }, [map, position]);

  return null;
}
