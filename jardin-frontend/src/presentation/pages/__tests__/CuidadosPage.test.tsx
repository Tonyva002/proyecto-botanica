import CuidadosPage from "../plant-care/CuidadosPage";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import useCuidadosViewModel from "../plant-care/useCuidadosViewModel";

//✅ Mock del viewModel
jest.mock("../plant-care/useCuidadosViewModel");

//✅ Mock explícito de useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

const mockUseCuidadosViewModel = useCuidadosViewModel as jest.MockedFunction<
  typeof useCuidadosViewModel
>;

const renderWithRouter = (ui: React.ReactNode, route = "/plantas/1/cuidados") =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/plantas/:id/cuidados" element={ui} />
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
      tipoCuidados: [],
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
      tipoCuidados: ["Riego", "Poda", "Fertilizacion", "Luz"],
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

    expect(
      screen.getByRole("heading", { name: /cuidados de aloe vera/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Riego")).toBeInTheDocument();
    expect(screen.getByText("Poda")).toBeInTheDocument();
  });

  test("renderiza las opciones de tipo de cuidado", async () => {
    mockUseCuidadosViewModel.mockReturnValue({
      loading: false,
      plantaNombre: "Aloe Vera",
      tipoCuidados: ["Riego", "Poda", "Fertilizacion", "Luz"],
      cuidados: [],
      crearCuidado: mockCrearCuidado,
    });

    renderWithRouter(<CuidadosPage />);

    fireEvent.mouseDown(screen.getByLabelText(/tipo/i));

    expect(await screen.findByText("Riego")).toBeInTheDocument();
    expect(screen.getByText("Poda")).toBeInTheDocument();
    expect(screen.getByText("Fertilizacion")).toBeInTheDocument();
    expect(screen.getByText("Luz")).toBeInTheDocument();
  });

  test("envia el formulario y llama a crearCuidado con plantaId", async () => {
    mockUseCuidadosViewModel.mockReturnValue({
      loading: false,
      plantaNombre: "Aloe Vera",
      tipoCuidados: ["Riego", "Poda", "Fertilizacion", "Luz"],
      cuidados: [],
      crearCuidado: mockCrearCuidado,
    });

    renderWithRouter(<CuidadosPage />);

    fireEvent.mouseDown(screen.getByLabelText(/tipo/i));
    fireEvent.click(await screen.findByText("Riego"));
    fireEvent.change(screen.getByLabelText(/fecha inicio/i), {
      target: { value: "2025-01-16" },
    });

    fireEvent.change(screen.getByLabelText(/fecha fin/i), {
      target: { value: "2025-01-17" },
    });

    fireEvent.change(screen.getByLabelText(/notas/i), {
      target: { value: "Regar por la mañana" },
    });

    fireEvent.click(screen.getByRole("button", { name: /agregar/i }));

    await waitFor(() => {
      expect(mockCrearCuidado).toHaveBeenCalledWith(
        expect.objectContaining({
          plantaId: 1,
          tipo: "Riego",
          fechaInicio: "2025-01-16",
          fechaFin: "2025-01-17",
          notas: "Regar por la mañana",
        }),
      );
    });
  });
   test("muestra dialogo de error si crearCuidado falla", async () => {
    mockCrearCuidado.mockRejectedValueOnce(new Error("Error al crear cuidado"));

    mockUseCuidadosViewModel.mockReturnValue({
      loading: false,
      plantaNombre: "Aloe Vera",
      tipoCuidados: ["Riego", "Poda"],
      cuidados: [],
      crearCuidado: mockCrearCuidado,
    });

    renderWithRouter(<CuidadosPage />);

    fireEvent.mouseDown(screen.getByLabelText(/tipo/i));
    fireEvent.click(await screen.findByText("Riego"));

    fireEvent.change(screen.getByLabelText(/fecha inicio/i), {
      target: { value: "2025-01-16" },
    });

    fireEvent.click(screen.getByRole("button", { name: /agregar/i }));

    expect(
      await screen.findByText(/error al crear cuidado/i),
    ).toBeInTheDocument();
  });
});
