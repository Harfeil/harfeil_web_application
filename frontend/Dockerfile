# Step 1: Build React app
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve it using Nginx
FROM nginx:alpine

# Remove default nginx static assets config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx config (optional)
# COPY nginx/react.conf /etc/nginx/conf.d/

# Copy built files from React build stage
COPY --from=build /app/build /usr/share/nginx/html
