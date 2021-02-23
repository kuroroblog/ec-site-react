FROM node:12.20.2-alpine3.12
COPY ./front /front
WORKDIR /front
RUN yarn install
EXPOSE 3000
ENV CI true
CMD yarn start
