Base de Datos
===

En esta carpeta se incluyen todos los aspectos relacionados a la base de datos y en este readme las instrucciones para cargar la base limpia cada iteración o necesidad de limpiar los datos.

## Modelo.mwb
Este archivo contiene el modelo de la base de datos en el formato de MySQL Workbench. Permite el diseño de la base de datos de forma visual y permitir centrarse en las relaciones de la base y no en el código. Este archivo permite también generar el código para crear la base de forma automática.

#### Instalar MySQL Workbench
Descargar [la herramienta](https://www.mysql.com/products/workbench/) y utilizar los credenciales:
 - Usuario: root
 - Contraseña: 123456

Esto para facilitar el desarrollo y evitar conflictos de acceso en el webservice más adelante.

#### Abrir el modelo
Para abrirlo debe abrir MySQL Workbench.  Seguidamente ir a ```File > Open Model...``` y buscar el archivo ```modelo.mwb```.

Siéntase en libertad de editar columnas y relaciones, simplemente recuerde los cambios que ejecute para que sean documentados más adelante.

#### Generar la base de datos
- Con el modelo abierto, ir a ```Database > Forward Engineer``` o ```Ctrl+G```.
- Lea cada uno de los pasos, pero la secuencia será básicamente de ```Next > Next > ...```.
- Al llegar a la pantalla de ```Review the SQL Script to be Executed```, hacer click en el botón de ```Save to File...``` y sobreescribir el archivo ```./muestreo/baseDeDatos/tablesFks.sql``` del repositorio.
