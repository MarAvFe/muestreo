WebService
=== 

# Para comenzar a desarrollar
Cree el esquema provisto en la misma carpeta que este readme de la misma manera que se explica en el readme de la base de datos, por medio de la consola para poder automatizar el proceso más adelante.

### Pendientes
Se deben poder ejecutar las siguientes acciones

 - Consultar los datos de una tabla y retornarlos en un json.

    ```select * from user;```

 - Ejecutar procedimientos almacenados.

    ```
    call pSelectPersons();
    call pInsertUser(pName,pLastname,pBorn,pExperience,pLefty);
    ```

    Los que retornen valores deben retornar de una manera similar a la siguiente:
    ```javascript
    {
        users : [
        {
            name: "Michael",
            lastname: "Mena",
            born: "1997-03-06",
            experience: "9",
            lefty: true
            },
        {
            name: "Andrea",
            lastname: "Ramirez",
            born: "1987-08-07",
            experience: "56",
            lefty: 1
            },
        ...
        ]
    }
    ```
    El formato de la fecha y del booleano puede ser cualquiera, pero debe ser definido.

### Rutas
Las rutas pueden ser variables. Sin embargo las que sean GET deben recibir los parámetros separados por `/`

Por ejemplo las rutas podrían ser como:
```
GET http://localhost:2700/api/getPersons
GET http://localhost:2700/ws/insertUser?name=Carlos&lastname=Rodriguez&born=20100905&experience=12&lefty=1
POST http://localhost:2700/api/insertUser
```

### Resultados
El resultado no debe ser impreso en ningún navegador, sino más sencillo por medio de `console.log(JSON.stringify(resultado))`.

### Herramientas recomendadas
Sin embargo, si desea trabajar con algun otro framework para webservice, adelante. Lo que sea más rápido y mejor. Por ahí vi el anuncio de un tal [Fastify](http://www.fastify.io/)
- [Express](http://expressjs.com/)
- [MySQLJS](https://github.com/mysqljs/mysql)

Estos programas ayudan a ejecutar las peticiones con distintos métodos HTTP.
- [Postman](https://www.getpostman.com/)
- [Insomnia](https://insomnia.rest/)
