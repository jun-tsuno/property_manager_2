# Property Management App

<p style="text-align: center">
<img width="600" alt="Screenshot" src="https://github.com/jun-tsuno/mysql_note_app/assets/110567844/2b5c615b-5c8d-4910-bb8c-f22284a29620">
</p>

Rental housing and shared housing are very widespread in Canada. Some of those owners have multiple homes in various locations, which must be a hassle to manage the renters and whether or not they pay the monthly rent charge. This app is for those who want to smartly handle and manage their properties! No more paper!

## Demo

## Built With

- `Nextjs: 13.4.3`
- `TanStack Qeury(React-Query)`
- `next-auth`
- `TypeScript`
- `PostgreSQL`
- `Prisma`
- `zod`
- `shadcn UI`
- `tailwindCSS`

## Feature

- Add, Delete, Update house & tenant information.
- Utilize TanStack Query to fetch cached data, and mutate data when it's updated.
- Following SEO practices, optimize images, fonts, and module import so that the app runs efficiently.
- Interact with PostgreSQL database through Prisma ORM.

## Challenge

- Figuring out the best approach for using client or server components takes some serious thought. In my strategy, I try to make the top-level page server-components, and set the meta tag on the page.
- Understanding and structuring the React Query required a bit of time. I carefully read the documentation and tried to make the function reusable by using custom hooks.
- I used 'prisma/client' for the type definitions, which allows for secure type casting between database and components.

## Upcoming

- Image upload
- Payment record tracker
