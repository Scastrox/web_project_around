# Web Project Around

**Web Project Around** es un perfil social donde se muestra la información de un usuario y una galería de tarjetas con imágenes de lugares visitados.

## Funcionalidades

- Ver y editar el nombre y descripción del perfil.
- Galería de tarjetas con imágenes de lugares.
- Agregar nuevas tarjetas con título e imagen.
- Eliminar tarjetas existentes.
- Marcar tarjetas con "me gusta".
- Ver la imagen de una tarjeta en un popup a pantalla completa.
- Validación de formularios en tiempo real.
- Cierre de popups con botón, clic en overlay o tecla Escape.

## Tecnologías usadas

- HTML
- CSS
- JavaScript (Vanilla JS)

## Arquitectura JavaScript

El código está dividido en cuatro módulos:

| `scripts/Card.js` | Clase `Card`: genera y gestiona cada tarjeta de la galería |
| `scripts/FormValidator.js` | Clase `FormValidator`: valida los campos de un formulario |
| `scripts/utils.js` | Funciones reutilizables para abrir/cerrar popups y sus controladores de eventos |
| `scripts/index.js` | Punto de entrada: importa los módulos, selecciona el DOM e inicializa la app |

## https://scastrox.github.io/web_project_around/
