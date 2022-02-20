FROM node:14-alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN yarn --production --silent --pure-lockfile --force

COPY . .

COPY ./ci/.env.development ./.env

RUN yarn add --force node-sass@4.14.1

RUN yarn build

FROM node:14-alpine
# set working directory
WORKDIR /app

ARG APP_ENV=development

# ENV PATH ./node_modules/.bin:$PATH
# install app dependencies
RUN yarn add express dotenv http-proxy-middleware compression faker http-status-codes cors serve-favicon --silent
RUN yarn global add pm2
COPY --from=builder /app/build ./dist
# COPY --from=builder /app/mock ./mock
COPY --from=builder /app/server ./server
COPY --from=builder /app/ci/.env.$APP_ENV ./.env
COPY --from=builder /app/processes.json ./
COPY --from=builder /app/public ./public


EXPOSE 8000
CMD ["pm2", "start", "processes.json", "--silent", "--no-daemon"]
