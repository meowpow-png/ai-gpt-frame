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

# Build Tailwind CSS (ensure Tailwind is installed)
RUN npx tailwindcss -o ./src/output.css

#RUN npm run build

# Expose the port for Vite
EXPOSE 5173

# Start Vite development server with Tailwind watching for changes
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
