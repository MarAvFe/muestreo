WebService
===

## Instalar dependencias del WebService
Navegue en su consola (donde ejecute node) hasta la carpeta del webservice y ejecute:
``` bash
developer:~/path/to/muestreo/webservice$ npm install
```
Verifique en el archivo `./path/to/muestreo/webservice/conf/default.json` los valores de conexión a mysql y la consistencia del puerto a escuchar, que sea el mismo en express y en el generador.

## Ejecutar WebService
Navegue en su consola (donde ejecute node) hasta la carpeta del webservice y ejecute:
``` bash
developer:~/path/to/muestreo/webservice$ node server.js
```

## Generar WebService
Para generar las funciones del webservice según la base de datos, debe tener corriendo el WebService en otra consola y ejecutar lo siguiente:
``` bash
developer:~/path/to/muestreo/webservice$ node generator/crud.js
developer:~/path/to/muestreo/webservice$ node generator/procedures.js
```
Finalmente reinicie la instancia del WebService en la otra consola.

---

## Consultar WebService
Las consultas al WebService deben llevar los siguientes encabezados:
```
Content-Type : application/x-www-form-urlencoded
Access-Control-Allow-Origin : *
Access-Control-Allow-Headers : Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin
```
En [Postman](https://www.getpostman.com/) el segundo y tercer encabezado se incluyen automáticamente. Para definir el primero, debe ir a la pestaña de `body` y seleccionar `x-www-form-urlencoded`. Abajo se habilitará un formulario donde podrá incluir parámetros al request.

Todas las consultas serán con el método `POST`.

### CRUD sobre una tabla

Para ejecutar tareas sobre alguna tabla en específico, se sigue el formato `http://localhost:2828/NombreDeLaTabla/accion` y se envían los parámetros pertinentes a la misma.

En todos los casos, los parámetros deben ser los existentes en la base de datos y se utilizan para filtrar las acciones.

Asuma la tabla Usuario, con autoincrement en el id.
| idUsuario  | nombre | edad |
|---|---|---|
| 1 | Andrea | 24 |
| 2 | Carlos | 42 |
| 3 | Luis  | 13 |

##### Para agregar una fila
Debe enviar al menos los parámetros que tengan NotNull en la bd. El siguiente request:
```
url : http://localhost:2828/Usuario/add
params : nombre=Marta&edad=30
```
generaría en la bd:
```sql
Insert into Usuario (nombre, edad) values (Marta, 30);
```

##### Para leer filas
Puede enviar tantos parámetros como guste para filtrar los resultados. El siguiente request:
```
url : http://localhost:2828/Usuario/get
params : nombre=Marta&edad=30
```
generaría en la bd:
```sql
Select * From Usuario Where nombre = 'Marta' And edad = 30;
```

##### Para editar
Se envían los valores actualizados con el mismo formato que en el `add`, pero se envían también los valores antigüos con el prefijo `f_` para utilizarlos como filtros del update. El siguiente request:
```
url : http://localhost:2828/Usuario/get
params : f_nombre=Marta&edad=50&f_edad=30
```
generaría en la bd:
```sql
Update Usuario Set edad = 50 Where nombre = 'Marta' And edad = 30;
```

##### Para eliminar
Se envían parámetros de la misma manera que en el `get` para filtrar los valores a eliminar. Recuerde que esta acción es **irreversible**; sea cuidadoso. El siguiente request:
```
url : http://localhost:2828/Usuario/get
params : nombre=Marta&edad=30
```
generaría en la bd:
```sql
Select * From Usuario Where nombre = 'Marta' And edad = 30;
```

### Ejecución de procedimientos
Para ejecutar procedimientos, se sigue el formato `http://localhost:2828/NombreDelProcedimiento` y se envían los parámetros pertinentes a la misma, de la siguiente manera:
```
url : http://localhost:2828/getUsuariosEnRango
params : bajo=30&alto=60
```
generaría en la bd:
```sql
getUsuariosEnRango(30, 60);
```
