import axios from "axios";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PlantasPage from "./pages/PlantasPage";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("carga las plantas", async () => {
 
  mockedAxios.get.mockResolvedValueOnce({
    data: [{ id: 1, nombre: "Rosa" }]
  });

  render(
    <MemoryRouter>
      <PlantasPage />
    </MemoryRouter>
  );

  // espera que el elemento asíncrono aparezca
  const planta = await screen.findByText("Rosa");
  expect(planta).toBeInTheDocument();
});