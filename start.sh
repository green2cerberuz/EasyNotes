docker rm -f nodejs-demo
docker build -t node-image .
docker run -it --name nodejs-demo -p 80:5500 node-image
