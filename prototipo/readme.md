Prototipo
===

Para comenzar a familiarizarse con la plantilla de [akveo](http://akveo.com/blur-admin-mint/#/dashboard), lo mejor es comenzar con las páginas de login y reestablecer contraseña que vienen siendo prácticamente lo mismo.

Todo el prototipo pretende mostrar el mínimo necesario del contenido en las pantallas. Sin embargo no es imperativo que se vea tal cual está sugerido. Guíense en su mayoría por lo que está utilizado en akveo. Hay que andar con cuidado. Aunque pareza que la plantilla del dashboard es solo eliminar todo el contenido, no es tan simple.

### Dashboard
Luego lo mejor es hacer la del dashboard vacía y guardarla aparte como plantilla para copiar y pegar y comenzar las demás desde ahí.

### CRUD

El mantenimiento de los datos de la base se van a dividir en 4 pantallas básicas:
 - Crear
 - Editar
 - Eliminar
 - Consultar

##### Crear, Editar, Eliminar

Las primeras tres son muy similares, excepto por el prototipo que trae cada módulo de mantenimiento. Por ejemplo, la de create trae algunos ejemplos de varios módulos a crear y a partir de ahí se pueden reutilizar algunos módulos solo cambiando los formularios. En el caso de editar, cada módulo tendrá la misma información pero se le agrega un dropdown que a nivel de código trae el id, pero ese id no se le muestra nunca al usuario. El prototipo de eliminar no permite ningún ingreso de datos, solo la muestra de los datos del módulo que sea seleccionado y luego se elimina. Cada botón de crear, editar o eliminar debe lanzar un mensaje pertinente.

 - Crear debe lanzar por ejemplo: "Se ha creado el muestreo MT037"
 - Editar debe lanzar por ejemplo: "Se ha editado el muestreo MT037"
 - Eliminar debe lanzar primero "Está seguro de que desea eliminar MT037?" y luego "Se ha eliminado el muestreo MT037".

##### Consulta
Esta pantalla es la más simple en términos de concepto. Pero se le agrega complejidad ya que algunas de las tablas podrían tener una extensión demasiado larga. Entonces alguno de los ejemplos debe tener un ejemplo con paginación y alguna con filtros.

### Análisis
Esta pantalla contiene dos distintos tipos de gráficos que no están ilustrados en el dibujo por que no encontré gráficos en la herremienta que usé para dibujar.

El gráfico de lineas es aquel conversado en una reunión donde el eje Y es la productividad y el eje X es el tiempo en días. El gráfico de pastel muestra las improductividades en un proyecto. Por ejemplo 60% por celular, 25% por esperar la mezcladora y 15% por estar comiendo.

### Interacciones
La mayor cantidad de interacciones la traerá la plantilla, ya que desde ahí se accede a todas las demás páginas. Cada una de las imágenes trae en la ruta del "navegador" el nombre que debe llevar la página. Se omite la extensión por cercanía al uso final en la aplicación; pero el prototipo deberá llevar por ejemplo "create.html" y poner en la plantilla, el botón correspondiente del menú lateral que se dirija a ```href="./create.html"```.

En el caso de la pantalla de inicio de sesión, el botón se dirige a la pantalla de Consultas.

La pantalla de reestablecer contraseña, se dirige al inicio de sesión.
