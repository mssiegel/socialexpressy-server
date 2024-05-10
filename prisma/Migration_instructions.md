# Instructions for altering database

1. Make the changes in the schema file
2. Ensure your database_url in .env is pointing to your dev database. Then create migration script and apply it to dev database by running: `npx prisma migrate dev`
3. Read the migration script and check your database and test out your feature to make sure everything's working fine
4. Update your database_url in .env to point to your production database. Then apply the previously created migration script to your production database by running `npx prisma migrate deploy`

More info: https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production
