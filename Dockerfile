# Build client
FROM node:16-alpine AS client-build
WORKDIR /code/
COPY ./app/package*.json /code/
RUN npm install
COPY ./app/public/ /code/public/
COPY ./app/src/ /code/src/
COPY ./app/tsconfig.json /code/
RUN npm run build && npm prune --production

# Build server
FROM python:3.10-slim
WORKDIR /code/
COPY --from=client-build /code/build /code/build
COPY ./src/requirements.txt /code/
RUN pip3 install --no-cache-dir -r requirements.txt
COPY ./src/ /code/

CMD ["python", "server.py"]