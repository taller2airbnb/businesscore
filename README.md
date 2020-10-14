# businesscore

https://jessitron.com/2020/05/25/develop-in-docker-node-js-express-postgresql-on-heroku/

docker-compose -f .devcontainer/docker-compose.yml --project-name aribnb_devcontainer down -v

https://hub.docker.com/r/heroku/nodejs

Crearse una cuenta en https://hub.docker.com/

Ejecutar

docker login -u username -p password

Buildear la imagen con:

docker build -t taller2airbnb/airbnb .
  
Correr la imagen con:

docker run -p 3000:3000 -d taller2airbnb/airbnb


