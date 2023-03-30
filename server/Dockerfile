FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @prisma/client

COPY . .

EXPOSE ${PORT}

CMD ["npx", "prisma", "generate"]
CMD [ "npm", "run", "dev" ]