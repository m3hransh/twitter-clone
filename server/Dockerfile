FROM node:14-alpine as builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn generate
RUN yarn tsc


FROM node:14-alpine 
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 4000
CMD  ["yarn", "start"]
# FROM node:14-alpine as runner
# WORKDIR /app



# COPY --from=builder  /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json


