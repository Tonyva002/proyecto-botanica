import { render, screen } from "@testing-library/react";
import App from "../../../App";

// Mockear paginas para aislar el test del router
jest.mock(
  "../../../presentation/pages/list-plants/PlantasPage",
  () => () => <div>Plantas Page</div>
);

jest.mock(
  "../../../presentation/pages/plant-care/CuidadosPage",
  () => () => <div>Cuidados Page</div>
);

jest.mock(
  "../../../presentation/pages/plant-details/PlantaDetailPage",
  () => () => <div>Planta Detail Page</div>
);


describe("App routing y titulos", () => {
  beforeEach(() => {
    // Resetear URL antes de cada test
    window.history.pushState({}, "", "/");
  });
  test("renderiza el titulo de la plantas en/", () => {
    render(<App />);

    expect(screen.getByText("🌱 Plantas")).toBeInTheDocument();
    expect(screen.getByText("Plantas Page")).toBeInTheDocument();
  });

  test("renderiza PlantasPage en /plantas", () => {
    window.history.pushState({}, "", "/plantas");
    render(<App />);

    expect(screen.getByText("🌱 Plantas")).toBeInTheDocument();
    expect(screen.getByText("Plantas Page")).toBeInTheDocument();
  });

  test("renderiza PlantaDetailPage y titulo correcto en /plantas/:id", () => {
    window.history.pushState({}, "", "/plantas/1");
    render(<App />);

    expect(screen.getByText("🌿 Detalles de la planta")).toBeInTheDocument();
    expect(screen.getByText("Planta Detail Page")).toBeInTheDocument();
  });

  test("renderiza CuidadosPage y título correcto en /plantas/:id/cuidados", () => {
    window.history.pushState({}, "", "/plantas/1/cuidados");
    render(<App />);

    expect(screen.getByText("🪴 Cuidados de la planta")).toBeInTheDocument();
    expect(screen.getByText("Cuidados Page")).toBeInTheDocument();
  });

  test("renderiza página no encontrada en ruta inválida", () => {
    window.history.pushState({}, "", "/ruta-que-no-existe");
    render(<App />);

    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
  });
});
