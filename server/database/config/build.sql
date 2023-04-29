BEGIN;

DROP TABLE IF EXISTS users, posts, votes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  vote INTEGER,
  CONSTRAINT pk_votes_user_post UNIQUE (user_id, post_id)
);

INSERT INTO users(username, email, password, photo) VALUES ('Nour Agha','nour@email.com','$2a$10$hcarVj2MRTYH8uKUwavEouyMoozBb35piGNg.ssd3Uv5CNzVIR8xq','https://i.pinimg.com/236x/51/36/59/5136596882d8bc236285bb9b921790c0.jpg');
INSERT INTO users(username, email, password, photo) VALUES ('Nourrrrrrrrrrrrrrrrrrrrr','remond@email.com','$2a$10$7T7ral8QCgnm9NM5wmEFxOTy7r9F6TOmvrWFsBAkn5IwSvTdgj6.K', 'https://i.pinimg.com/564x/63/71/28/6371280eee2fdd6b3c86753e5de67060.jpg');

INSERT INTO posts (title, body, user_id) VALUES ('Nourrr website','https://i.pinimg.com/564x/e2/20/de/e220de6ace01f07c4e4b0fe73ff9c4d8.jpg', 1);
INSERT INTO posts (title, body, user_id) VALUES ('title User Post','https://www.pinterest.com/', 2);

INSERT INTO votes (user_id, post_id, vote) VALUES (2, 1, 1);
INSERT INTO votes (user_id, post_id, vote) VALUES (1, 1, 1);

COMMIT;


