FROM node:alpine as base
WORKDIR /app

ADD package.json .
ADD package-lock.json .

RUN npm install

CMD [ "npm", "start" ]

# If deployment / testing are used, we could also use other build stages
# We can also use a stage to add our tools if we don't want them in the devDepencies (cf apiDoc for ex.)
