FROM node:14.15.5

ENV APP_HOME /usr/src/app

WORKDIR $APP_HOME
COPY . $APP_HOME

RUN npm run clean
RUN npm install -g pm2
RUN npm install
RUN npm run build

ENV NODE_ENV production
EXPOSE 3006
CMD [ "pm2-runtime", "process.config.js" ]