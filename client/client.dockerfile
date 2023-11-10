FROM node:alpine3.17

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package.json yarn.lock ./

# Install node packages
RUN yarn install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . .

# Build the app
RUN yarn run build

EXPOSE 3000

# Start the app
CMD [ "yarn", "start" ]
