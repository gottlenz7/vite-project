FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install  

COPY . .
RUN npm run build  # Собираем статику (результат в /app/dist)


FROM node:18-alpine AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]


FROM node:18-alpine AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"] 
