import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const DogCarousel = () => {
  const [dogs, setDogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const API_KEY = (!import.meta.env.VITE_DOG_API_KEY ? import.meta.env.VITE_DOG_API_KEY : "");

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      setLoading(true);
      if (!API_KEY === "" ) console.warn("DOG API KEY no definida");

      // Añadimos include=breed para asegurar que devuelva toda la información de la raza
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=5&has_breeds=1&api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Mensaje de error personalizado: No se pudieron cargar los perros. Por favor, inténtalo de nuevo más tarde.');
      }
      
      const data = await response.json();
      console.log('=== DATOS COMPLETOS DE LA API ===');
      console.log(data);
      console.log('=== PRIMER PERRO ===');
      console.log(data[0]);
      console.log('=== RAZAS DEL PRIMER PERRO ===');
      console.log(data[0]?.breeds);
      
      setDogs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dogs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? dogs.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = () => {
    console.log('Click en imagen');
    if (dogs[currentIndex]) {
      console.log('Abriendo modal con perro:', dogs[currentIndex]);
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
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
          <p className="mt-4 text-gray-600 font-semibold">Cargando perros adorables...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={fetchDogs}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-600 mb-3">
            🐕 Galería de Perros
          </h1>
          <p className="text-gray-600 text-lg">Descubre hermosos perros y haz clic para más detalles</p>
        </div>

        {/* Carrusel */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative w-full aspect-square md:aspect-video bg-gray-200">
            {/* Imagen */}
            <img
              src={currentDog.url}
              alt={`Perro ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
              onClick={handleImageClick}
            />

            {/* Overlay con información al hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition flex items-end">
              <div className="w-full p-6 bg-gradient-to-t from-black via-black/50 to-transparent text-white opacity-0 hover:opacity-100 transition">
                <p className="text-sm font-semibold">✓ Haz clic para ver más detalles</p>
              </div>
            </div>

            {/* Botón anterior */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition shadow-lg hover:shadow-xl z-10"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>

            {/* Botón siguiente */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition shadow-lg hover:shadow-xl z-10"
            >
              <ChevronRight className="w-6 h-6 text-orange-600" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {dogs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition ${
                    index === currentIndex
                      ? 'bg-orange-500 w-8'
                      : 'bg-white bg-opacity-60 w-3 hover:bg-opacity-100'
                  }`}
                  aria-label={`Ir a perro ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Información del carrusel */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {breed?.name || 'Perro sin raza identificada'}
              </h2>
              <span className="text-lg font-semibold text-orange-600">
                {currentIndex + 1}/{dogs.length}
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {breed?.description || 'No hay descripción disponible'}
            </p>
            <button
              onClick={handleImageClick}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              Ver Detalles Completos
            </button>
          </div>
        </div>
      </div>

      {/* Modal con detalles */}
      {showModal && selectedDog && selectedDog.breeds && selectedDog.breeds.length > 0 ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden">
            {/* Encabezado del modal */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {selectedDog.breeds?.[0]?.name || 'Detalles del Perro'}
              </h2>
              <button
                onClick={closeModal}
                className="bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 transition"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Imagen grande */}
              <img
                src={selectedDog.url}
                alt="Detalle del perro"
                className="w-full h-80 object-cover rounded-xl mb-8 shadow-lg"
              />

              <div className="space-y-6">
                {selectedDog.breeds.map((breed, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-orange-600 mb-4">{breed.name}</h3>
                    
                    {/* Descripción */}
                    {breed.description && (
                      <div className="mb-6 pb-6 border-b border-orange-200">
                        <p className="text-gray-700 leading-relaxed">{breed.description}</p>
                      </div>
                    )}

                    {/* Características en grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {breed.temperament && (
                        <div className="bg-white p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">😊 Temperamento</p>
                          <p className="text-gray-600 text-sm">{breed.temperament}</p>
                        </div>
                      )}
                      
                      {breed.origin && (
                        <div className="bg-white p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">🌍 Origen</p>
                          <p className="text-gray-600 text-sm">{breed.origin}</p>
                        </div>
                      )}

                      {breed.weight && (
                        <div className="bg-white p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">⚖️ Peso</p>
                          <p className="text-gray-600 text-sm">{breed.weight.metric} kg</p>
                        </div>
                      )}

                      {breed.height && (
                        <div className="bg-white p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">📏 Altura</p>
                          <p className="text-gray-600 text-sm">{breed.height.metric} cm</p>
                        </div>
                      )}

                      {breed.life_span && (
                        <div className="bg-white p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">🎂 Esperanza de vida</p>
                          <p className="text-gray-600 text-sm">{breed.life_span}</p>
                        </div>
                      )}

                      {breed.breed_group && (
                        <div className="bg-white p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">🏷️ Grupo</p>
                          <p className="text-gray-600 text-sm">{breed.breed_group}</p>
                        </div>
                      )}
                    </div>

                    {/* Información adicional */}
                    {breed.bred_for && (
                      <div className="mt-6 bg-white p-4 rounded-lg">
                        <p className="font-semibold text-gray-800 mb-2">🎯 Criado para</p>
                        <p className="text-gray-600 text-sm">{breed.bred_for}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : showModal ? (
        // Modal sin datos - para debuggear
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <button
              onClick={closeModal}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">⚠️ Sin datos de raza</h2>
            <p className="text-gray-600 mb-4">
              Esta imagen no tiene información de raza disponible en la API.
            </p>
            <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-auto max-h-48">
              {JSON.stringify(selectedDog, null, 2)}
            </pre>
            <button
              onClick={closeModal}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
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