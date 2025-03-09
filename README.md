## Start App

To start the app in development environment:  
`docker compose --env-file .env.development -f docker-compose.dev.yml up -d`

To start the app in production environment:  
`docker compose --env-file .env.production -f docker-compose.prod.yml up -d`

## Hints:

- Development environment uses in memory objects. Some dummy data will be seeded on service init.
- Production development remains completely empty and will not be seeded on start.
- There is a api-tester collection in /api-tester for bruno, if you want to save time (-> https://www.usebruno.com/)
