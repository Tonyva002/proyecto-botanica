import CuidadosPage from "../CuidadosPage";
import useCuidadosViewModel from "../../viewmodels/useCuidadosViewModel";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock del viewModel
jest.mock("../../viewmodels/useCuidadosViewModel");

const mockUseCuidadosViewModel = useCuidadosViewModel as jest.MockedFunction<
  typeof useCuidadosViewModel
>;

const renderWithRouter = (ui: React.ReactNode, route = "/plantas/1") =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/plantas/:id" element={ui} />
      </Routes>
    </MemoryRouter>,
  );

describe("CuidadosPage", () => {
  const mockCrearCuidado = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra loading cuando esta cargando", () => {
    mockUseCuidadosViewModel.mockReturnValue({
      cuidados: [],
      plantaNombre: "",
      loading: true,
      crearCuidado: mockCrearCuidado,
    });

    renderWithRouter(<CuidadosPage />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renderiza la lista de cuidados", () => {
    mockUseCuidadosViewModel.mockReturnValue({
      loading: false,
      plantaNombre: "Aloe Vera",
      crearCuidado: mockCrearCuidado,
      cuidados: [
        {
          id: 1,
          tipo: "Riego",
          fechaInicio: "2025-02-23",
          fechaFin: "2025-02-24",
          planta: {
            id: 1,
            nombre: "Aloe Vera",
            especie: "Suculenta",
            ubicacion: "Patio",
            fechaRegistro: "2025-02-01",
          },
        },
        {
          id: 2,
          tipo: "Poda",
          fechaInicio: "2025-03-10",
          fechaFin: "2025-03-11",
          planta: {
            id: 2,
            nombre: "Rosa",
            especie: "Flor",
            ubicacion: "Jardin",
            fechaRegistro: "2025-03-01",
          },
        },
      ],
    });

    renderWithRouter(<CuidadosPage />);

    expect(screen.getByText("🌿 Cuidados")).toBeInTheDocument();
    expect(screen.getByText("Aloe Vera - Riego")).toBeInTheDocument();
    expect(screen.getByText("Rosa - Poda")).toBeInTheDocument();
  });

  test("envia el formulario y llama a crearCuidado con plantaId", async () => {
    mockUseCuidadosViewModel.mockReturnValue({
      loading: false,
      plantaNombre: "Aloe Vera",
      cuidados: [],
      crearCuidado: mockCrearCuidado,
    });

    renderWithRouter(<CuidadosPage />);

    fireEvent.change(screen.getByLabelText(/tipo/i), {
      target: { value: "Riego" },
    });

    fireEvent.change(screen.getByLabelText(/fecha/i), {
      target: { value: "2025-01-16" },
    });

    fireEvent.click(screen.getByRole("button", { name: /agregar/i }));

    await waitFor(() => {
      expect(mockCrearCuidado).toHaveBeenCalledWith({
        plantaId: 1,
        tipo: "Riego",
        fechaInicio: "2025-01-16",
      });
    });
  });
});
