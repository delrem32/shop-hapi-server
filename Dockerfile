#FROM node:latest
#
## add files to container
#ADD . /app
#
## specify the working directory
#WORKDIR app
#
#RUN chmod -R 777 .
#
#RUN npm install nodemon -g
#RUN npm install
#RUN npm run build
## build process
#
#EXPOSE 5000
#
## run application
#CMD ["npm", "start"]

# Node.js app Docker file

FROM ubuntu:latest

# ENV DEBIAN_FRONTEND noninteractive
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN apt-get update
RUN apt-get -qq update
# TODO could uninstall some build dependencies
RUN apt-get install -y curl supervisor python-pip && pip install supervisor-stdout
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash
# fucking debian installs `node` as `nodejs`
RUN apt-get install -y nodejs
#RUN apt-get install gcc g++ make
#RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10
#VOLUME ["/data"]
USER root
ADD . /app
COPY package.json /app/package.json
WORKDIR app
#RUN npm i npm@latest -g
RUN npm i && npm run build
RUN mkdir log
EXPOSE 5000

CMD ["/usr/bin/supervisord"]
