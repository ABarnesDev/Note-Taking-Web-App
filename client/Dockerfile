FROM node:latest AS build
WORKDIR /usr/local/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.14.2
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/local/app/dist/client/browser /usr/share/nginx/html
EXPOSE 80
