
# UniTareas

## Descripción del proyecto

UniTareas es una aplicación web desarrollada para ayudar a los estudiantes a registrar, organizar y consultar sus actividades académicas. Permite administrar tareas, fechas de entrega, prioridades y estados de cumplimiento.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap 5
- Git y GitHub

## API REST externa utilizada

El proyecto utiliza la API pública **Nager.Date**, que proporciona información sobre los días festivos de diferentes países.

### ¿Para qué se utiliza?

Se utiliza para consultar los días festivos de Colombia y mostrarlos en la sección "Días festivos de Colombia" de UniTareas.

### Endpoint utilizado

https://date.nager.at/api/v3/PublicHolidays/{año}/CO

El año se obtiene automáticamente mediante JavaScript y el código `CO` identifica a Colombia.

### Método de consulta

Se utiliza el método HTTP GET mediante la Fetch API de JavaScript para obtener los datos en formato JSON.

### Autenticación

La consulta pública utilizada no requiere una clave API ni autenticación.

### Manejo de respuestas

La aplicación contempla los siguientes estados:

- Carga: informa al usuario mientras se consultan los días festivos.
- Éxito: muestra la lista de días festivos obtenidos.
- Error: presenta un mensaje cuando no es posible completar la consulta.

## Instalación y ejecución

1. Clonar el repositorio.
2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el proyecto:

```bash
npm run dev
```

## Autor

Proyecto académico desarrollado individualmente.

