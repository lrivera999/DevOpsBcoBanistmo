import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import DogCarousel from "../components/DogCarousel";

const mockFetch = vi.fn();

globalThis.fetch = mockFetch;

describe("DogCarousel", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            url: "https://testdog.com/dog.jpg",
            breeds: [
              {
                name: "Labrador",
                description: "Friendly dog",
              },
            ],
          },
        ]),
    });
  });

  test("muestra loader inicialmente", () => {
    render(<DogCarousel />);
    expect(screen.getByText(/Cargando perros adorables/i)).toBeInTheDocument();
  });

  test("renderiza datos de perro desde la API", async () => {
    render(<DogCarousel />);

    const dog = await screen.findByText(/Labrador/i);

    expect(dog).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});