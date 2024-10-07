# Use the official Node.js image as the base image
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Use a smaller base image for the final stage
FROM node:14-alpine

# Install bash in the final image
RUN apk add --no-cache bash

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app .

# Command to run the application
CMD ["npm", "run", "start"]