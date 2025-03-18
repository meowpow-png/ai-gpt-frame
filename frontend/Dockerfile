# Use Node.js base image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
CMD ["npm", "run", "dev", "--", "--host"]