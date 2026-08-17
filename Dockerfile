# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Run stage ----
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/vite.config.js ./
RUN npm install --omit=dev

EXPOSE 4173

CMD ["npm", "run", "preview"]
