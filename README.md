# Property Management App

<p style="text-align: center">
<img width="600" alt="Screenshot" src="https://github.com/jun-tsuno/mysql_note_app/assets/110567844/2b5c615b-5c8d-4910-bb8c-f22284a29620">
</p>

Rental housing and shared housing are very widespread in Canada. Some of those owners have multiple homes in various locations, which must be a hassle to manage the renters and whether or not they pay the monthly rent charge. This app is for those who want to smartly handle and manage their properties! No more paper!

## Demo

https://rent-management-2.vercel.app/

## Built With

- `Nextjs: 13.4.3`
- `next-auth`
- `TypeScript`
- `Prisma`
- `PostgreSQL`
- `zod`
- `shadcn UI`
- `tailwindCSS`

## Feature

- Add, Delete, Update house/tenant information.
- Keep record of payment history of this month.
- Utilize modern web development tools. Enable full stack development even faster and easier.

## Challenge

- Figuring out the best approach for using client or server components takes some serious thought. In my strategy, I go for server components whenever there's an API involved, so we can fetch data smoothly and efficiently.
- This is a revised version of my previous work. I changed database structure (Firebase to PostgreSQL) to interact with the DB easier and in more organized way.
- I used 'prisma/client' for the type definitions, which allows for secure type casting between database and components.

## Upcoming

- Image upload
- Unit/Integration test
