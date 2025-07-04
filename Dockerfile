# Stage 1: Build
FROM node:24-alpine AS builder

#  Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY package*.json ./
RUN npm install
COPY * .
# RUN npm run build

# Stage 2: Run
FROM node:24-alpine
# FROM demisto/python3:3.12.11.3982393

# Set the working directory
WORKDIR /app

# COPY --from=builder /app/dist ./dist
# COPY package*.json ./
COPY . /app
RUN npm install 

# Expose the application port
# EXPOSE 5000

# Start the application
CMD ["npm", "run", "start:backend"] 
