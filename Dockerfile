FROM nginx:alpine
RUN apk update && apk add nodejs
WORKDIR /app
ADD package.json .
RUN npm install
ADD src ./src
ADD public ./public
RUN npm run build
RUN cp -r build/* /usr/share/nginx/html
