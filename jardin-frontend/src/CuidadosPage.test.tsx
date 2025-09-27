import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CuidadosPage from "../src/pages/CuidadosPage";
import { getCuidados } from "../src/api/cuidados";

// Mock de la API
jest.mock("../src/api/cuidados");

describe("CuidadosPage", () => {
  beforeEach(() => {
    (getCuidados as jest.Mock).mockReset();
  });

  test("renders CuidadosPage with mocked data", async () => {
    // Devuelve directamente un array
    (getCuidados as jest.Mock).mockResolvedValue([
      {
        id: 1,
        planta: { nombre: "Monstera" },
        tipo: "Riego",
        fechaInicio: "2025-09-25T21:30:18.083Z",
        notas: "Cada 3 días",
      },
    ]);

    render(
      <MemoryRouter>
        <CuidadosPage />
      </MemoryRouter>
    );

    // Esperamos a que los elementos carguen
    expect(await screen.findByText(/Riego/i)).toBeInTheDocument();
    expect(screen.getByText(/Monstera/i)).toBeInTheDocument();
  });

  test("renders CuidadosPage empty state", async () => {
    (getCuidados as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <CuidadosPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/No hay cuidados registrados/i)).toBeInTheDocument();
  });
});
