FROM node:16.0.0 AS builder

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM node:16.0.0 AS runner
ENV NODE_ENV=production

RUN mkdir /build && chown node:node /build

USER node

WORKDIR /build
COPY --from=builder /app/build .

RUN chown node: .

EXPOSE 8080
CMD [ "node", "server.js" ]
