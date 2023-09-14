# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the frontend app
CMD ["npm", "start"]
