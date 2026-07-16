# Web Project Around

`Around` es una aplicación web interactiva inspirada en un perfil social de viajes. Permite mostrar la información del usuario y administrar una galería de tarjetas con imágenes de lugares visitados. Todos los datos (perfil, avatar, tarjetas y likes) se guardan en un servidor y persisten entre sesiones.

Este proyecto fue desarrollado con HTML, CSS y JavaScript vanilla, con una estructura modular orientada a componentes y conectado a una API REST.

## Funcionalidades

- Carga del perfil del usuario y de las tarjetas desde el servidor al abrir la página (con `Promise.all`, las tarjetas se renderizan solo después de recibir el id del usuario).
- Edición del perfil del usuario desde un formulario emergente, guardada en el servidor.
- Actualización de la foto de perfil: al pasar el cursor sobre el avatar aparece un icono de edición que abre el formulario.
- Creación de nuevas tarjetas con título e imagen, guardadas en el servidor.
- Eliminación de tarjetas con ventana emergente de confirmación; el icono de papelera solo aparece en las tarjetas creadas por el propio usuario.
- Botón de like en cada tarjeta, sincronizado con el servidor (PUT/DELETE).
- Indicador de carga "Guardando..." en los botones de todos los formularios mientras la solicitud está en curso.
- Vista ampliada de imagen en popup.
- Cierre de popups con botón, overlay o tecla `Escape`.
- Validación de formularios con mensajes de error.
- Manejo de errores del servidor: las respuestas fallidas rechazan el promise y se registran en consola.
- Diseño responsivo para escritorio y mobile.

## Tecnologías

- HTML5 semántico
- CSS3
- JavaScript ES6+ (clases, módulos, promesas)
- API REST con `fetch` (GET, POST, PATCH, PUT, DELETE)
- Metodología BEM para clases y organización de estilos
- Programación orientada a objetos: clases `Api`, `Card`, `Section`, `UserInfo`, `FormValidator`, `Popup` y sus subclases (`PopupWithForm`, `PopupWithImage`, `PopupWithConfirmation`)

Repositorio publicado en GitHub Pages:

[https://scastrox.github.io/web_project_around/](https://scastrox.github.io/web_project_around/)
