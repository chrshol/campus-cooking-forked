![](https://raw.githubusercontent.com/ics-software-engineering/nextjs-example-form/main/doc/create-student-page.png)

Campus Cooking is a sample Next.js 14 application designed to streamline recipe creation and sharing for students. It illustrates the use of modern frameworks and tools like [React Hook Form](https://www.react-hook-form.com/) and [Yup](https://www.npmjs.com/package/yup) for form development and validation, as well as Prisma ORM for database management.

Features: 
- Recipe Management:
  - Create Recipe and Edit Recipe pages for adding and modifying recipes.
- Form Validation:
  - Easy-to-use validation with [Yup](https://www.npmjs.com/package/yup).
- Form Controls:
  - Text fields for recipe names and description.
  - Specification for appliance needed.
  - Multiple selections for ingredients.
- Database Integration:
  - Type-safe mapping between TypeScript and PostgreSQL tables using [Prisma ORM](https://www.prisma.io/).
  - Flexible handling of multiple tables to showcase non-linear form-data mapping.

## Installation

First, [install PostgreSQL](https://www.postgresql.org/download/). Then create a database for your application.

```

$ createdb campus-cooking
Password:
$

```

Second, download this repository to your computer. You can download it as a zip file, or you can click the "Use as template" button to create your own copy of the system, then clone it to your local computer.

Third, go to your newly created repository, and click the "Clone or download" button to download your new GitHub repo to your local file system. Using [GitHub Desktop](https://desktop.github.com/) is a great choice if you use MacOS or Windows.

Fourth, cd into the directory of your local copy of the repo, and install third party libraries with:

```
$ npm install
```

Fifth, create a `.env` file from the `sample.env`. Set the `DATABASE_URL` variable to match your PostgreSQL database you created in the first step. See the Prisma docs [Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql). Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```
$ npx prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "<your database name>", schema "public" at "localhost:5432"

Applying migration `20241129235803_`

The following migration(s) have been applied:

migrations/
  └─ 20241129235803_/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 57ms

$
```

## Running the system

Once the libraries are installed and the database is migrated, you can run the application by invoking the "dev" script in the [package.json file](https://github.com/Campus-Cooking/site-M1/blob/main/package.json):

```shell
$ npm run dev

> campus-cooking@0.1.0 dev
> next dev

  ▲ Next.js 14.2.10
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1436ms

```

### Viewing the running app

If all goes well, the application will appear at [http://localhost:3000](http://localhost:3000).

### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the imports/ directory with:

```
$ npm run lint

> nextjs-example-form3@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
```

If you see a Typescript warning you can ignore it.

### Prerequisites

To best understand this application, it is useful to familiarize yourself with:

- [Bootstrap 5 React](https://react-bootstrap.github.io/). We use Bootstrap 5 for this template.

- [React Hook Form](https://www.react-hook-form.com/). React hook form is a performant, flexible and extensible forms with easy-to-use validation.

## Walkthrough

A description of Campus Cooking can be found [here](https://campus-cooking.github.io/college-cooking.github.io/). This includes what you can do on our website along with images of the different pages.

Landing Page:
The homepage of the Campus Cooking site greets users with a clean and easy-to-navigate layout.
- Sign Up/Login Button: Option to create an account or log in to save favorite recipes and submit new ones.
- Recipes: Takes you to the recipes page.
- Blog: Takes you to the blog page.
- Contact: How you can contact us.
- About Us: Learn about Campus Cooking.
- Popular Recipes: A section featuring some of the most popular or trending recipes among users.
- Recipe Categories: A set of links to different recipe categories (e.g., Breakfast, Dinner, Snacks), making it easy to browse.
- Instagram: Includes the latest posts from our Instagram.
- More Recipes: A section with more recipes for you to explore.
- Email Subscription: Option to enter your email address to receive the latest recipes and updates.

Viewing Recipes:
When you click on any recipe category, you are redirected to a page displaying all recipes within that category.
- Recipe Name: The title of the recipe:
- Ingredients: A list of ingredients requried to make the recipe.
- Cooking Instructions: A step-by-step gudie to prepare the meal.

Recipes Details Page: 
When you click on a recipe name, you are taken to the Recipe Details page.
- Full Recipe Name: The complete title of the recipe.
- Ingredients: A detailed list of ignredients with quantities.
- Instructions: Clear, step-by-step instructions to guide you through the cooking process.

Submitting a Recipe: 
If you're logged in, you can submit your own recipe by clicking on the Submit Recipe button in the navigation bar. The Submit Recipe form has the following fields: 
- Recipe Name: A required field to provide the title of your recipe.
- Short Description: A required text area where you provide a brief description of your recipe.
- Ingredients: A required text area where you list all the ingredients needed for the recipe.
- Steps/Long Description: A required text area for the step-by-step cooking instructions.
- Appliances Needed: Checkboxes for selecting appliances required for the recipe, such as Rice Cooker, Toaster Oven, Microwave, etc.
- Recipe Hero Image: A file input to upload an image that represents the recipe (optional).
- Category: A text area where you can specify the category or categories (e.g., Breakfast, Lunch, Dessert).

User Account:
By logging into the website, users gain the ability to: 
- Submit Recipes: Contribute your own recipes to the site.
