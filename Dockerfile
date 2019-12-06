FROM node:12
ARG WORKDIR=/home/node/app

WORKDIR $WORKDIR

CMD ["npm","start"]
COPY package.json .
COPY package-lock.json .
COPY wait.sh .
RUN npm install
COPY . .

