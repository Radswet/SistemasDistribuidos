# Tarea 3

## Integrantes
- Eduardo Galvez
- Fernando Vergara


## Ejecutar

Para ejecutar este proyecto
Se debe ejecutar:

```sh
cd Tarea3
docker-compose up
```
## Preguntas

### Pregunta 1 
 
1. Explique la arquitectura que Cassandra maneja. 
    <!--
    La estructura de casandra es una arbol de nodos, cada nodo tiene una lista de nodos que le siguen, y cada nodo tiene una lista de nodos que le anteceden.
    -->    
> La estructura de casandra esta construida como un sistema Peer to Peer, los datos se distribuyen a cada nodo dentro de cluster, de esta manera se asegura la tolerancia a fallos mediante la replicación

2. Cuando se crea el cluster ¿Cómo los nodos se conectan? 

>Cuando se crea un cluster los nodos se conectan con una topologia de anillo. 

3. ¿Que ocurre cuando un cliente realiza una petición a uno de los nodos? 
>Dependiendo del tipo de petición se actúa de distintas formas: En el caso de una peticion de escritura el nodo coordinador envía la solicitud a todos los nodos que contenga la fila en la que se realizará la escritura, en caso de ser una petición de borrado, se marca la fila a borrar como eliminada dependiendo de lo solicitado, en caso de ser una peticion de lectura, se realiza la acción dependiendo del tipo de lectura (en cassandra existen 3 tipos: Direct read request, Digest request,background read repai request) en el caso de direct read request el nodo cordinador contacta a un nodo que tenga la replica requerida.

4. ¿Qué ocurre cuando uno de los nodos se desconecta?

>Si un nodo se desconecta una replica puede responder a las peticiones que le lleguen.

5. ¿La red generada entre los nodos siempre es eficiente? 
> No, siempre es eficiente ya que el tiempo de conexion entre nodos puede ser largo por el tiempo que demoran en generar la red. Ademas que ciertas consultas pueden tener un tiempo de respuesta muy largo por la misma particularidad de la red, mas especificamente las ejecuciones de escritura son de una excelente velocidad a diferencia de las de escritura que pueden sufrir y en caso de tener varias se puede provocar una disminucion del rendimiento.

6. ¿Existe balanceo de carga?
> Sí existe balanceo de carga, en donde los datos se distribuyen entre los nodos. En el caso de esta tarea, se usó los keyspaces y estos se distribuyeron en la cantidad de nodos indicada.

### Pregunta 2
1. Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuales son estos? 

>Las estrategias de replicacion de datos que existen en cassandra son: SimpleStrategy y NetworkTopologyStrategy.
2. ¿Cual es la ventaja de uno sobre otro? 

>SimpleStrategy sirve para replicar datos en un solo datacenter pero no requiere de una red por lo que es mas eficiente, NetworkTopologyStrategy sirve para replicar datos en varios datacenter.
3. ¿Cual utilizaría usted para en el caso actual y por que? Justifique apropiadamente su respuesta.

>Utilizariamos SimpleStrategy  ya que se utiliza un único datacenter.

    
### Pregunta 3
1. Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? 
>Si, ya que se logra de manera eficiente y tolerable a fallos.

2. ¿Qué ocurre cuando se quiere escalar en la solución?

>Se implementan más nodos, y de ser necesario, se cambiaría la estrategia de replicación a NetworkTopologyStrategy para que se pueda tener mas datacenter y poder especificar cuántas réplicas se desea en cada datacenter.
3. ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (la replicacion/distribucion de los datos) y comente una estrategia que podría seguir para ordenar los datos.
>Cambiar a NetworkTopologyStrategy ,nuevos datacenter con nodos que mantengan conexiones entre clústers permitiendo mayor tolerancia a fallos y redundancia.   
