import CuidadosPage from "../plant-care/CuidadosPage";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import useCuidadosViewModel from "../plant-care/useCuidadosViewModel";

//✅ Mock del viewModel
jest.mock("../plant-care/useCuidadosViewModel");

//✅ Mock explícito de useParams (clave para evitar NaN)
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

  expect(screen.getByRole("heading", { name: /cuidados de aloe vera/i })).toBeInTheDocument();
  expect(screen.getByText("Riego")).toBeInTheDocument();
  expect(screen.getByText("Poda")).toBeInTheDocument();
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

  fireEvent.change(screen.getByLabelText(/fecha inicio/i), {
    target: { value: "2025-01-16" },
  });

  fireEvent.click(screen.getByRole("button", { name: /agregar/i }));

  await waitFor(() => {
  expect(mockCrearCuidado).toHaveBeenCalledWith(
    expect.objectContaining({
      plantaId: 1,
      tipo: "Riego",
      fechaInicio: "2025-01-16",
    })
  );
});

});

});
