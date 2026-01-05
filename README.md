# Sistema de Gestión de Finanzas (Challenge Técnico)

Este repositorio contiene la solución completa al desafío técnico para la Práctica de Programación. Es una aplicación Full Stack que realiza la ingesta, normalización y visualización de datos financieros a partir de archivos PDF.

## 🚀 Tecnologías Utilizadas

* **Backend:** NestJS (Node.js), TypeORM, MySQL, JWT (Passport), PDF-Parse.
* **Frontend:** Vue 3, Vuetify 3, Pinia (State Management), Axios.
* **Base de Datos:** MySQL.
* **Business Intelligence:** Power BI Desktop.

## 📋 Funcionalidades Implementadas

* ✅ **Ingesta de PDF:** Algoritmo robusto con *Regex* para extraer y normalizar datos desde `../data/data.pdf`.
* ✅ **Idempotencia:** Estrategia de *Upsert* para evitar duplicados en la base de datos.
* ✅ **Auditoría:** Generación automática de archivos `raw.csv`, `normalized.csv`, `raw.json` y `normalized.json` tras la carga en la carpeta `data/`.
* ✅ **Autenticación:** Sistema de Login seguro con Tokens JWT e interceptores en Frontend.
* ✅ **Gestión de Estado:** Implementación de **Pinia** para el manejo de sesión de usuario.
* ✅ **CRUD Completo:** Interfaz para crear, leer, editar y eliminar registros manualmente.
* ✅ **Dashboard BI:** Archivo `.pbix` conectado a la base de datos con métricas clave.

---

## 🛠️ Instrucciones de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Base de Datos (MySQL)

1.  Asegúrate de tener MySQL corriendo (XAMPP, Laragon o servicio nativo).
2.  Crea una base de datos vacía llamada:
    ```sql
    CREATE DATABASE test_programacion;
    ```
    *(Nota: El backend se encargará de crear las tablas automáticamente al iniciar).*

### 2. Backend (API NestJS)

1.  Abrir una terminal en la carpeta `backend`:
    ```bash
    cd backend
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Iniciar el servidor en modo desarrollo:
    ```bash
    npm run start:dev
    ```
    * La API estará disponible en: `http://localhost:3001`
    * **Credenciales de prueba:**
        * Usuario: `admin@test.com`
        * Contraseña: `123456`

### 3. Frontend (Vue 3 + Vuetify)

1.  Abrir una **nueva** terminal en la carpeta `frontend`:
    ```bash
    cd frontend
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Iniciar la aplicación web:
    ```bash
    npm run dev
    ```
    * La web estará disponible generalmente en: `http://localhost:3000` (o el puerto que indique la terminal).

---

## 📊 Dashboard Power BI

El archivo del dashboard se encuentra en la raíz del repositorio con el nombre:
📂 **`Dashboard.pbix`**

Para visualizarlo:
1.  Abrir el archivo con **Power BI Desktop**.
2.  Si es necesario, actualizar el origen de datos a tu servidor local de MySQL (`localhost` o `127.0.0.1`) y la base de datos `test_programacion`.

---

## 🧪 Cómo probar la Ingesta de Datos

1.  Inicia sesión en la aplicación web con las credenciales de prueba.
2.  En el panel principal, haz clic en el botón **"Cargar PDF"**.
3.  El sistema leerá el archivo ubicado en `../data/data.pdf`.
4.  Una vez procesado, verás los registros en la tabla y se generarán los archivos de auditoría (CSV/JSON) en la carpeta `data/`.

---

**Autor:** Francisco Javier Cartes Jara
**Fecha:** Enero 2026