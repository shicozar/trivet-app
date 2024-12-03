# Use the official Node.js image for the arm64 platform
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5173 for React development server
EXPOSE 5173

# Start the React development server
CMD ["npm", "run", "dev","--","--host"]