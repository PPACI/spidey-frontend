FROM nginx:alpine
RUN apk update && apk add nodejs
WORKDIR /app
ADD src ./src
ADD public ./public
ADD package.json .
RUN npm install
RUN npm run build
RUN cp -r build/* /usr/share/nginx/html
