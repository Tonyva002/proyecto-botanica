import { useLocation } from "react-router-dom";

export function usePageTitle() {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/plantas") {
    return "🌱 Plantas";
  }

  if (/^\/plantas\/\d+$/.test(location.pathname)) {
    return "🌿 Detalles de la planta";
  }

  if (/^\/plantas\/\d+\/cuidados$/.test(location.pathname)) {
    return "🪴 Cuidados de la planta";
  }

  return "🌱 Jardín App";
}
