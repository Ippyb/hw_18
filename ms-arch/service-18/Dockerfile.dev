FROM node:18-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install TypeScript compiler
RUN npm install -g typescript

# Copy source files
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3018
CMD ["npm", "start"]