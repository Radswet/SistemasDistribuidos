# Tarea 2

## Integrantes
- Eduardo Galvez
- Fernando Vergara


### Ejecutar

Para ejecutar este proyecto
Se debe ejecutar:

```sh
cd Tarea2
docker-compose build
docker-compose up
```


### Metodo POST

El metodo POST utilizado para testear fue el siguiente:

```
http://localhost:3000/login
```
y se envia un usuario en formato jsdon a través del body de la siguiente forma:

```
{
    user: "feña@mail.udp.cl",
    pass: "123",
}
```



### Metodo GET

El metodo GET utilizado para testear fue el siguiente:

```
http://localhost:5000/blocked
```
a través de este se reciben los usuarios que han sido bloqueados luego de mas de 5 intentos de inicio de sesion incorrectos.
