FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE ${PORT}


CMD [ "npm", "run", "dev" ]