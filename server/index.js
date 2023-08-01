require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.post('/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "users" ("username", "hashedPassword")
        VALUES ($1, $2)
        RETURNING "userId", "username"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
}
);

app.use(authorizationMiddleware);

app.post('/auth/likes', (req, res, next) => {
  const { userId } = req.user;
  const favoritedItem = req.body;
  const movieId = req.body.id;

  const sql = `
  INSERT INTO "favorites" ("userId", "favoritedItem", "movieId")
  VALUES ($1, $2, $3)
  RETURNING "userId", "favoriteId", "favoritedItem", "movieId";`;
  const params = [userId, favoritedItem, movieId];
  db.query(sql, params)
    .then(result => {
      const like = result.rows;
      res.status(201).json(like);
    }).catch(err => next(err));
});

app.get('/auth/get-likes', (req, res, next) => {
  const { userId } = req.user;

  const sql = `
  SELECT "favoritedItem"
  FROM "public"."favorites"
  WHERE "userId" = $1;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const favoritesList = result.rows;
      res.status(201).json(favoritesList);
    }).catch(err => next(err));
});

app.delete('/auth/unlike', (req, res, next) => {
  const { userId } = req.user;
  const movieId = req.body.id; // Assuming you're sending the item ID as req.body.data.id
  console.log(req.body.id);

  const sql = `
    DELETE FROM "favorites"
    WHERE "movieId" = $1
    AND "userId" = $2;
  `;

  const params = [movieId, userId];

  db.query(sql, params)
    .then(result => {
      // Check if any rows were deleted
      if (result.rowCount > 0) {
        res.sendStatus(204); // Successfully deleted, no content to send back
      } else {
        res.sendStatus(404); // Not found or already deleted
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.use(ClientError);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
