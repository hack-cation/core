# nginx alpine image for a lightweight web server
FROM nginx:alpine

# copy the site to the nginx default content directory
COPY ./clients/home/ /usr/share/nginx/html/

# expose port 80 (nginx listens on)
EXPOSE 80