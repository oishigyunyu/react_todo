FROM ubuntu:20.04

RUN apt-get update && apt-get install -y nodejs npm
RUN npm install n -g 
RUN n stable
RUN apt-get purge -y nodejs npm