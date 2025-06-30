# Proyecto de IA para Evaluación de Severidad de COVID-19

Este proyecto es una aplicación web full-stack diseñada para evaluar la severidad potencial de los síntomas de COVID-19 utilizando un modelo de machine learning. Consiste en un frontend de Next.js y un backend de FastAPI.

## Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas antes de continuar:

- [Node.js](https://nodejs.org/) (versión 20.x o superior)
- [pnpm](https://pnpm.io/installation) (o puedes usar npm/yarn y ajustar los comandos)
- [Python](https://www.python.org/downloads/) (versión 3.12 o superior)
- [Docker](https://www.docker.com/products/docker-desktop/) (opcional, para ejecutar el backend)

## Estructura del Proyecto

```
.
├── frontend/  # Aplicación Frontend (Next.js)
└── backend/      # Servidor Backend (FastAPI)
```

## Configuración y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 1. Backend (Servidor FastAPI)

El backend es una API de Python que sirve el modelo de machine learning.

#### Opción A: Usando Python Virtual Environment (Recomendado)

1.  **Navega al directorio del backend:**

    ```bash
    cd backend
    ```

2.  **Crea y activa un entorno virtual:**

    ```bash
    python -m venv .venv
    # En Windows
    .\.venv\Scripts\activate
    # En macOS/Linux
    source .venv/bin/activate
    ```

3.  **Instala las dependencias:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Ejecuta el servidor:**
    El servidor se iniciará en `http://localhost:8000`.
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```

#### Opción B: Usando Docker

1.  **Navega al directorio del backend:**

    ```bash
    cd backend
    ```

2.  **Construye la imagen de Docker:**

    ```bash
    docker build -t covid-backend .
    ```

3.  **Ejecuta el contenedor:**
    El servidor se iniciará en `http://localhost:8000`.
    ```bash
    docker run -p 8000:8000 covid-backend
    ```

### 2. Frontend (Aplicación Next.js)

El frontend es una aplicación de React construida con Next.js.

1.  **Navega al directorio del frontend:**

    ```bash
    cd IA-frontend
    ```

2.  **Instala las dependencias:**
    Se recomienda usar `pnpm` debido a la presencia de un archivo `pnpm-lock.yaml`.

    ```bash
    pnpm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo llamado `.env.local` en el directorio `IA-frontend` y añade las siguientes variables. Deberás obtener estos valores de tus cuentas de [Supabase](https://supabase.com/) y [Clerk](https://clerk.com/).

    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=TU_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=TU_CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY=TU_CLERK_SECRET_KEY

    # Backend
    NEXT_PUBLIC_BACKEND_URL = (En local : http://localhost:8000)
    ```

4.  **Aplica las migraciones de la base de datos (IMPORTANTE):**
    Este proyecto utiliza Supabase y requiere que se ejecute un script SQL para configurar el esquema de la base de datos.

    - **Ejecuta el script de migración:**
      Puedes ejecutar dentro del apartado **SQL Editor** el script de la carpeta **migrations**.

5.  **Ejecuta el servidor de desarrollo:**
    La aplicación se iniciará en `http://localhost:3000`.
    ```bash
    pnpm run dev
    ```

Una vez que ambos, el backend y el frontend, estén en ejecución, y las migraciones de la base de datos hayan sido aplicadas, puedes abrir tu navegador y visitar `http://localhost:3000` para usar la aplicación.
