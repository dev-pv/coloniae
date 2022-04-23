FROM node:14

WORKDIR /game_app
COPY . /game_app

RUN echo "deb http://deb.debian.org/debian stretch-backports main contrib non-free" >> /etc/apt/sources.list; \
apt-get update; \
apt-get -t stretch-backports install git -y
RUN npm install
RUN npm audit fix
RUN npm run-script build

EXPOSE 5000

CMD npm run start
