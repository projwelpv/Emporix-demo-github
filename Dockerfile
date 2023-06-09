# Stage 1
FROM node:16.1 as react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build


#Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


#FROM node:16.1
#WORKDIR /app
#COPY . ./
#EXPOSE 3000
#RUN npm install
#CMD ["npm", "run", "dev"]
