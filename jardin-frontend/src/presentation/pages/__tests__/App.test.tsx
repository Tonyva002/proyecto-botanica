import { render, screen } from "@testing-library/react";
import App from "../../../App";

// Mockear paginas para aislar el test del router
jest.mock("../../pages/PlantasPage", () => () => <div>Plantas Page</div>);

jest.mock("../../pages/CuidadosPage", () => () => <div>Cuidados Page</div>);

jest.mock("../../pages/PlantaDetailPage", () => () => (
  <div>Planta Detail Page</div>
));

describe("App routing", () => {
  beforeEach(() => {
    // Limpiar la URL antes de cada test
    window.history.pushState({}, "", "/");
  });
  test("renderiza el titulo de la app", () => {
    render(<App />);

    expect(screen.getByText("🌱 Jardín App")).toBeInTheDocument();
  });

  test("renderiza PlantasPage en / (ruta por defecto)", () => {
    render(<App />);

    expect(screen.getByText("Plantas Page")).toBeInTheDocument();
  });

  test("renderiza PlantaPage en /plantas", () => {
    window.history.pushState({}, "", "/plantas");
    render(<App />);

    expect(screen.getByText("Plantas Page")).toBeInTheDocument();
  });

  test("renderiza CuidadosPage en /cuidados", () => {
    window.history.pushState({}, "", "/cuidados");
    render(<App />);
    expect(screen.getByText("Cuidados Page")).toBeInTheDocument();
  });

  test("renderiza PlantaDetailPage en /plantas/:id", () => {
    window.history.pushState({}, "", "/plantas/1");
    render(<App />);

    expect(screen.getByText("Planta Detail Page")).toBeInTheDocument();
  });

  test("renderiza página no encontrada en ruta inválida", () => {
    window.history.pushState({}, "", "/ruta-que-no-existe");
    render(<App />);

    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
  });
});
