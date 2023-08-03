set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "public"."users" (
  "userId"         serial,
  "username"       text           not null,
  "hashedPassword" text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  PRIMARY KEY ("userId"),
  UNIQUE ("username")
);

CREATE TABLE "public"."favorites" (
  "favoriteId"    serial,
  "userId"        serial,
  "favoritedItem" jsonb        NOT NULL,
  "movieId"       jsonb        NOT NULL,
  "favoritedAt"   timestamptz(6) NOT NULL DEFAULT now(),
  PRIMARY KEY ("favoriteId"),

  FOREIGN KEY ("userId") REFERENCES "public"."users" ("userId") ON DELETE CASCADE
);
