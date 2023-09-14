# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Expose port 8080 for the backend
EXPOSE 8080

# Start the backend app
CMD ["npm", "start"]
