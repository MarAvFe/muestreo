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

#### Reiniciar la base de datos
Para reiniciar la base de datos se deben seguir los siguientes pasos:
- Abrir una consola y navegar a la carpeta con los archivos de la base de datos, por ejemplo:
    ```bash
    ~$ cd Documents/proyecto/muestreo/baseDeDatos
    ```
- Conectarse a la base de datos con el comando:
    ```bash
    ~/Documents/proyecto/muestreo/baseDeDatos$ mysql -u root -p
    ```
- Obtendrá un resultado como este
    ```bash
    Enter password:
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 27
    Server version: 5.7.19-0ubuntu0.16.04.1 (Ubuntu)

    Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql>
    ```
- En la consola de mysql, ingrese:
    ```sql
    mysql> source resetDb.sql
    ...
    Query OK, 0 rows affected (0,00 sec)
    ...
    ```
    Al ejecutarse este procedimiento, se pueden presentar múltiples errores de sql, si existen. Tome nota y corríjalos on consúltelos de ser así.

- Luego vamos a probar la nueva creación con una consulta simple:
    ```sql
    mysql> use muestreo;
    mysql> select * from User;
    Empty set (0,00 sec)

    mysql> select * from user;
    ERROR 1146 (42S02): Table 'muestreo.user' doesn t exist
    mysql>
    ```
    Recuerde que SQL es case sensitive. En caso de haber algún resultado diferente, podría haber un error. Este procedimiento solo debe ejecutarse la primera vez que se crea la base de datos.
