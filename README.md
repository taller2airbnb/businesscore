# businesscore

npm start # levanta la aplicacion en el puerto 3000

# docker

docker system prune -a --volumes #elimina todas los volumenes 
docker rm $(docker ps -aq) ## elimina todos los contenedores
docker rmi $(docker images -q) ## elimina todos las imagenes
docker stop $(docker ps -aq) ##apaga todas las instancias de docker corriendo
docker login
docker build -t cordobacesar/taller2airbnb .
docker run -p 3001:3000 -d cordobacesar/taller2airbnb

docker ps # ver todos los contenedores corriendo
docker logs -f <nombre del contenedor>

docker pull cordobacesar/taller2airbnb ## bajar la imagen
docker push cordobacesar/taller2airbnb ## psuhea la imagen

# test
node run test