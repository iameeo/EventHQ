FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Nest CLI 설치
RUN npm install --save-dev @nestjs/cli

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]