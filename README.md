# Tarea 1 

## Integrantes
- Eduardo Galvez
- Fernando Vergara


### Ejecutar

Para ejecutar este proyecto
Se debe ejecutar:

```sh
docker-compose build
docker-compose up
```

### Metodos GET

Los metodos GET utilzados para testear fueron son los siguientes:

```
http://localhost/
```
Esta consulta entrega todos los productos de la base de datos.

```
http://localhost/Mens
```
Esta consulta entrega los productos que contegan la palabra Mens

```
http://localhost/SSD
```
Esta consulta entrega los productos que contegan la palabra SSD

\
Además de esto se usó en get.http los GET, en donde fueron consultadas con la extensión [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de visual studio code. Esto no es necesario solo fue utilizado para simplificar la ejecución de las consultas

### Configuración redis

Se ha configurado redis con una politica de remoción de `LRU` y un cache de 1mb, esto se configuro a través de docker-compose 

```
command: /opt/bitnami/script/redis/run.h --maxmemory 1mb --maxmemory-policy allkeys-lru
```
