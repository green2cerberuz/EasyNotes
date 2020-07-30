docker rm -f nodejs-demo
docker build -t node-image -f ./Dockerfile ../
docker run -it --name nodejs-demo -p 80:5500 -v ${pwd}:/home/node/app node-image
