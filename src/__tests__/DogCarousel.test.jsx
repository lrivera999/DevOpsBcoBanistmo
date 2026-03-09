import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import DogCarousel from "../components/DogCarousel";

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          url: "https://testdog.com/dog.jpg",
          breeds: [
            {
              name: "Labrador",
              description: "Friendly dog"
            }
          ]
        }
      ])
  })
);

describe("DogCarousel", () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  test("muestra loader inicialmente", () => {
    render(<DogCarousel />);
    expect(screen.getByText(/Cargando perros adorables/i)).toBeInTheDocument();
  });

  test("renderiza datos de perro desde la API", async () => {

    render(<DogCarousel />);

    const dog = await screen.findByText(/Labrador/i);

    expect(dog).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);

  });

});