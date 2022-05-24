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
con una respuesta de login true, en caso contrario de enviar una pass incorrecta enviara un login false. Luego de 5 login con respuesta false el usuario sera bloqueado.

Para realizar los request utilizamos la aplicacion postman y enviamos los datos del body a traves del formato JSON.

### Metodo GET

El metodo GET utilizado para testear fue el siguiente:

```
http://localhost:5000/blocked
```
a través de este se reciben los usuarios que han sido bloqueados luego de mas de 5 intentos de inicio de sesion incorrectos.


# Preguntas
1. ¿Por qué Kafka funciona bien en este escenario?

Kafka es un sistema de intermediación de mebsajes y esta diseñado para reaccionar a eventos en tiempo real y no permite manejar mensajes muy grandes (+ de 1 MB) por lo que para un sistema de login como el que se ha implementado no resulta un inpedimento el tamaño de los mensajes.

De manera que en este escenario es idoneo para la comunicacion entre servicios, por el hecho de que se necesita un registro de los usuarios que han sido bloqueados y kafka comunica login-blocked para la ralización de esta tarea.

2. Basado en las tecnologías que usted tiene a su disposición (Kafka, backend) ¿Qué haría usted para manejar una gran cantidad de usuarios al mismo tiempo? 