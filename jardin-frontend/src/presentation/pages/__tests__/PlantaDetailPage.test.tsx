import { render, screen } from "@testing-library/react";
import usePlantaDetailViewModel from "../../viewmodels/usePlantaDetailViewModel";
import { MemoryRouter } from "react-router-dom";
import PlantaDetailPage from "../PlantaDetailPage";

// Mock del ViewModel
jest.mock("../../viewmodels/usePlantaDetailViewModel");

const mockUsePlantaDetailViewModel =
  usePlantaDetailViewModel as jest.MockedFunction<
    typeof usePlantaDetailViewModel
  >;

const renderWithRouter = (ui: React.ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

// Mock de useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

describe("PlantaDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra loading mientras carga", () => {
    mockUsePlantaDetailViewModel.mockReturnValue({
      planta: null,
      loading: true,
    });

    renderWithRouter(<PlantaDetailPage />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("muestra mensaje cuando no existe la planta", () => {
    mockUsePlantaDetailViewModel.mockReturnValue({
      planta: null,
      loading: false,
    });

    renderWithRouter(<PlantaDetailPage />);

    expect(screen.getByText(/no se encontro la planta/i)).toBeInTheDocument();
  });

  test("renderiza los datos principales de la planta", () => {
    mockUsePlantaDetailViewModel.mockReturnValue({
      loading: false,
      planta: {
        id: 1,
        nombre: "Aloe Vera",
        especie: "Suculenta",
        ubicacion: "Patio",
        fechaRegistro: "2025-02-01",
        cuidados: [],
      },
    });

    renderWithRouter(<PlantaDetailPage />);

    expect(screen.getByText("Aloe Vera (Suculenta)")).toBeInTheDocument();
    expect(screen.getByText(/ubicacion: patio/i)).toBeInTheDocument();
    expect(screen.getByText("Cuidados")).toBeInTheDocument();
    expect(screen.getByText("No hay cuidados registrados")).toBeInTheDocument();
  });

  test("renderiza la lista de cuidados", () => {
    mockUsePlantaDetailViewModel.mockReturnValue({
      loading: false,
      planta: {
        id: 1,
        nombre: "Aloe Vera",
        especie: "Suculenta",
        ubicacion: "Patio",
        fechaRegistro: "2025-02-01",
        cuidados: [
          {
            id: 1,
            tipo: "Riego",
            fechaInicio: "2025-02-10",
            fechaFin: null,
            notas: "Cada 3 dias",
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
            fechaInicio: "2025-02-15",
            fechaFin: null,
            notas: "",
            planta: {
              id: 1,
              nombre: "Aloe Vera",
              especie: "Suculenta",
              ubicacion: "Patio",
              fechaRegistro: "2025-02-01",
            },
          },
        ],
      },
    });

    renderWithRouter(<PlantaDetailPage />);

    expect(screen.getByText("Riego - 10/02/2025")).toBeInTheDocument();
    expect(screen.getByText("Cada 3 dias")).toBeInTheDocument();
    expect(screen.getByText("Poda - 15/02/2025")).toBeInTheDocument();
  });
});
