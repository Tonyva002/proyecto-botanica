import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App navigation", () => {
  test("renders navigation links", () => {
    render(<App />); 

    expect(screen.getAllByText(/Plantas/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Cuidados/i)).toBeInTheDocument();
  });
});
