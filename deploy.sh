git pull

docker build . -t srizan10/femboybot

docker stop femboy

docker rm femboy

docker run -d -t --name femboy --restart unless-stopped srizan10/femboybot