# Trailersflix

A fullstack application made for movie lovers who want a one stop shop that will
help that track and watch the trailers of their favorite movies.

## Why I Built This

I made this application because I wanted to create a movie app that I would actually use.
One that also has functionality beyound just liking and unliking movies. I wanted
a place where someone can track their favorites but also watch a trailer to see if
they'd like it. I also wanted to use TailwindCSS, so styling with inspiration from
Netflix's UI helped me get a grasp on that technology. I wanted to gain some more
experience working with my own database and working with and manipulating data. The result
of that curiosity was this web application, I hope you enjoy it!

## Technologies Used

- React.js
- TailwindCSS
- Webpack
- Node.js
- PostgreSQL
- Express
- Axios
- Argon2
- HTML5
- react-toastify
- React Context API
- The Movie DB API [https://developer.themoviedb.org/docs](https://developer.themoviedb.org/docs)

## Live Demo
You can try the site out here
[https://trailersflix.com/](https://trailersflix.com/)


## Features

- User can create an account
- User can sign into an account
- User can favorite a movie
- User can unfavorite a movie
- User can watch a trailer
- User can search for movies
- User can logout

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher

### Getting Started
1. Make an account with [The Movie DB](https://www.themoviedb.org/signup) to get a a token secret in order to use the API.

2. Install TailwindCSS according to their documentation [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

3. Clone the repository.

   ```shell
   git clone https://github.com/JoshuaAaronBaker/trailers.git
   cd trailers
   ```

4. Install all dependencies with NPM.

    ```shell
    npm install
    ```

5. In .env.example, plug in all the corresponding values for each environment variable.

6. Make a copy of the provided .env.example file and name your copy .env.

    ```shell
    cp .env.example .env
    ```

7. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
