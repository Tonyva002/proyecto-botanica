import { render, screen } from "@testing-library/react";
import { usePlantasViewModel } from "../../viewmodels/usePlantasViewModel";
import PlantasPage from "../PlantasPage";
import { MemoryRouter } from "react-router-dom";

// Mock del viewModel
jest.mock("../../viewmodels/usePlantasViewModel");

const mockUsePlantasViewModel = usePlantasViewModel as jest.MockedFunction<
  typeof usePlantasViewModel
>;

const renderWithRouter = (ui: React.ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("PlantasPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra loading cuando esta cargando", () => {
    mockUsePlantasViewModel.mockReturnValue({
      plantas: [],
      loading: true,
    });

    renderWithRouter(<PlantasPage />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renderiza la lista de plantas", () => {
    mockUsePlantasViewModel.mockReturnValue({
      loading: false,
      plantas: [
        {
          id: 1,
          nombre: "Aloe Vera",
          especie: "Suculenta",
          ubicacion: "Patio",
          fechaRegistro: "2025-02-01",
        },
        {
          id: 2,
          nombre: "Rosa",
          especie: "Flor",
          ubicacion: "Jardin",
          fechaRegistro: "2025-03-01",
        },
      ],
    });

    renderWithRouter(<PlantasPage />);

    expect(screen.getByText("🌱 Plantas")).toBeInTheDocument();
    expect(screen.getByText("Aloe Vera")).toBeInTheDocument();
    expect(screen.getByText("Suculenta")).toBeInTheDocument();
    expect(screen.getByText("Rosa")).toBeInTheDocument();
    expect(screen.getAllByText("Ver detalles")).toHaveLength(2);
  });
});
