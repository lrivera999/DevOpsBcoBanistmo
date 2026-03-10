import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const DogCarousel = () => {
  const [dogs, setDogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_KEY = import.meta.env.VITE_DOG_API_KEY || '';

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true);

        if (API_KEY === '') {
          console.warn('DOG API KEY no definida');
        }

        const response = await fetch(
          `https://api.thedogapi.com/v1/images/search?limit=5&has_breeds=1&api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Error al obtener los datos de los perros');
        }

        const data = await response.json();
        setDogs(data);
        setError(null);
        setCurrentIndex(0);
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, [API_KEY]);

  const retryFetchDogs = async () => {
    try {
      setLoading(true);

      if (API_KEY === '') {
        console.warn('DOG API KEY no definida');
      }

      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=5&has_breeds=1&api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Error al obtener los datos de los perros');
      }

      const data = await response.json();
      setDogs(data);
      setError(null);
      setCurrentIndex(0);
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (dogs.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dogs.length);
  };

  const prevSlide = () => {
    if (dogs.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dogs.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = () => {
    if (dogs[currentIndex]) {
      setSelectedDog(dogs[currentIndex]);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDog(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-b-4 border-orange-500"></div>
          <p className="mt-4 font-semibold text-gray-600">Cargando perros adorables...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <p className="mb-4 font-semibold text-red-600">{error}</p>
          <button
            onClick={retryFetchDogs}
            className="rounded-lg bg-orange-500 px-6 py-2 text-white transition hover:bg-orange-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (dogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <p className="text-gray-600">No se encontraron perros</p>
      </div>
    );
  }

  const currentDog = dogs[currentIndex];
  const breed = currentDog.breeds?.[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold text-orange-600">🐕 Galería de Perros</h1>
          <p className="text-lg text-gray-600">
            Descubre hermosos perros y haz clic para más detalles
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="relative w-full aspect-square bg-gray-200 md:aspect-video">
            <img
              src={currentDog.url}
              alt={`Perro ${currentIndex + 1}`}
              className="h-full w-full cursor-pointer object-cover transition hover:opacity-90"
              onClick={handleImageClick}
            />

            <div className="absolute inset-0 flex items-end bg-black bg-opacity-0 transition hover:bg-opacity-40">
              <div className="w-full bg-gradient-to-t from-black via-black/50 to-transparent p-6 text-white opacity-0 transition hover:opacity-100">
                <p className="text-sm font-semibold">✓ Haz clic para ver más detalles</p>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-80 p-3 shadow-lg transition hover:bg-opacity-100 hover:shadow-xl"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6 text-orange-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-80 p-3 shadow-lg transition hover:bg-opacity-100 hover:shadow-xl"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-6 w-6 text-orange-600" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {dogs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition ${
                    index === currentIndex
                      ? 'w-8 bg-orange-500'
                      : 'w-3 bg-white bg-opacity-60 hover:bg-opacity-100'
                  }`}
                  aria-label={`Ir a perro ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {breed?.name || 'Perro sin raza identificada'}
              </h2>
              <span className="text-lg font-semibold text-orange-600">
                {currentIndex + 1}/{dogs.length}
              </span>
            </div>

            <p className="mb-4 line-clamp-2 text-gray-600">
              {breed?.description || 'No hay descripción disponible'}
            </p>

            <button
              onClick={handleImageClick}
              className="w-full rounded-lg bg-orange-500 py-3 font-bold text-white shadow-lg transition hover:bg-orange-600 hover:shadow-xl"
            >
              Ver Detalles Completos
            </button>
          </div>
        </div>
      </div>

      {showModal && selectedDog && selectedDog.breeds && selectedDog.breeds.length > 0 ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
          <div className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 p-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedDog.breeds?.[0]?.name || 'Detalles del Perro'}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-full bg-white bg-opacity-20 p-2 transition hover:bg-opacity-40"
                aria-label="Cerrar modal"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-8">
              <img
                src={selectedDog.url}
                alt="Detalle del perro"
                className="mb-8 h-80 w-full rounded-xl object-cover shadow-lg"
              />

              <div className="space-y-6">
                {selectedDog.breeds.map((breed, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 p-6"
                  >
                    <h3 className="mb-4 text-2xl font-bold text-orange-600">{breed.name}</h3>

                    {breed.description && (
                      <div className="mb-6 border-b border-orange-200 pb-6">
                        <p className="leading-relaxed text-gray-700">{breed.description}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {breed.temperament && (
                        <div className="rounded-lg bg-white p-4">
                          <p className="mb-2 font-semibold text-gray-800">😊 Temperamento</p>
                          <p className="text-sm text-gray-600">{breed.temperament}</p>
                        </div>
                      )}

                      {breed.origin && (
                        <div className="rounded-lg bg-white p-4">
                          <p className="mb-2 font-semibold text-gray-800">🌍 Origen</p>
                          <p className="text-sm text-gray-600">{breed.origin}</p>
                        </div>
                      )}

                      {breed.weight && (
                        <div className="rounded-lg bg-white p-4">
                          <p className="mb-2 font-semibold text-gray-800">⚖️ Peso</p>
                          <p className="text-sm text-gray-600">{breed.weight.metric} kg</p>
                        </div>
                      )}

                      {breed.height && (
                        <div className="rounded-lg bg-white p-4">
                          <p className="mb-2 font-semibold text-gray-800">📏 Altura</p>
                          <p className="text-sm text-gray-600">{breed.height.metric} cm</p>
                        </div>
                      )}

                      {breed.life_span && (
                        <div className="rounded-lg bg-white p-4">
                          <p className="mb-2 font-semibold text-gray-800">🎂 Esperanza de vida</p>
                          <p className="text-sm text-gray-600">{breed.life_span}</p>
                        </div>
                      )}

                      {breed.breed_group && (
                        <div className="rounded-lg bg-white p-4">
                          <p className="mb-2 font-semibold text-gray-800">🏷️ Grupo</p>
                          <p className="text-sm text-gray-600">{breed.breed_group}</p>
                        </div>
                      )}
                    </div>

                    {breed.bred_for && (
                      <div className="mt-6 rounded-lg bg-white p-4">
                        <p className="mb-2 font-semibold text-gray-800">🎯 Criado para</p>
                        <p className="text-sm text-gray-600">{breed.bred_for}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={closeModal}
                className="mt-8 w-full rounded-lg bg-orange-500 py-3 font-bold text-white shadow-lg transition hover:bg-orange-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={closeModal}
              className="float-right text-gray-500 hover:text-gray-700"
              aria-label="Cerrar modal sin datos"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="mb-4 text-2xl font-bold text-orange-600">⚠️ Sin datos de raza</h2>
            <p className="mb-4 text-gray-600">
              Esta imagen no tiene información de raza disponible en la API.
            </p>
            <pre className="mb-4 max-h-48 overflow-auto rounded bg-gray-100 p-4 text-xs">
              {JSON.stringify(selectedDog, null, 2)}
            </pre>
            <button
              onClick={closeModal}
              className="w-full rounded-lg bg-orange-500 py-2 font-bold text-white hover:bg-orange-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DogCarousel;