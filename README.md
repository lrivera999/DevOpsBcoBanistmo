# Dog Carousel App 🐶

Aplicación web desarrollada en **React** que consume una API de perros y muestra un carrusel con imágenes y datos de distintas razas.

El proyecto fue construido con **Vite** para un entorno de desarrollo rápido y optimizado, e incluye pruebas automatizadas para asegurar la calidad del código.

---

## 🚀 Tecnologías utilizadas

* React
* Vite
* Vitest
* Testing Library
* Node.js

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/dog-carousel-app.git
cd dog-carousel-app
```

Instala las dependencias:

```bash
npm install
```

---

## ⚙️ Variables de entorno

El proyecto utiliza un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
VITE_DOG_API_KEY=your_api_key_here
```

En aplicaciones creadas con **Vite**, las variables de entorno deben comenzar con `VITE_`.

---

## ▶️ Ejecutar la aplicación

Modo desarrollo:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación desde:

```
http://localhost:5173
```

---

## 🧪 Ejecutar pruebas

Las pruebas unitarias se ejecutan utilizando **Vitest**.

Para correr los tests manualmente:

```bash
npx vitest
```

o en modo CI:

```bash
npx vitest run
```

Las pruebas verifican:

* Renderizado inicial del componente
* Estado de carga (loader)
* Consumo de la API
* Renderizado de datos recibidos

---

## 🧪 Estructura de pruebas

Los tests se encuentran junto a los componentes o dentro de carpetas `__tests__`.

Ejemplo:

```
src/
 ├── components/
 │   ├── DogCarousel.jsx
 │   └── DogCarousel.test.jsx
```

Las pruebas utilizan **Testing Library** para validar el comportamiento del componente desde la perspectiva del usuario.

---

## 🏗️ Build de producción

Para generar el build optimizado:

```bash
npm run build
```

El resultado se genera en la carpeta:

```
dist/
```

---

## 🔁 Integración Continua

Este proyecto está preparado para ejecutarse en pipelines de CI utilizando **GitHub Actions**, donde se ejecutan los siguientes pasos:

1. Instalación de dependencias
2. Lint del código
3. Ejecución de pruebas con Vitest
4. Build de la aplicación

---

## 📄 Licencia

Este proyecto es de uso educativo y para demostraciones técnicas.
