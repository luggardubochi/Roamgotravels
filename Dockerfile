FROM node:24-alpine AS builder

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 5174

FROM builder as production-frontend

CMD ["npm", "start:frontend"] 

FROM builder as production-backend

CMD ["npm", "start:backend"] 