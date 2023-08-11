# Comando de inicio

``` shell 

    npm run command -- addUser -e admin@admin.com -fn admin -ln admin -p 123456 -a 25 -ia true

```


## Docker Commands

Construir imágen

* docker build -t coder39740:1.3 .

Listar las imágenes del docker

* docker images

Mostrar los proceso (contenedores) que se estan ejecutando

* docker ps -a

Crear contenedor y corerlo en el puerto 8081 con el nombre node_coder

* docker run -p 8080:8080 --name node_coder -d coder39740:1.3

Destruir el contenedor

* docker rm node_coder

Parar la ejecución

* docker stop node_coder

Para levantarlo

* docker start node_coder

Mostrar los logs del contenedor, para salir presionar ctrl +c

* docker logs -f node_coder

# Docker compose

Levantar contendedor

* docker-compose up

Detener contenedor

* docker-compose stop

Remover contenedores

* docker-compose down

Armarlo

* docker-compose build
