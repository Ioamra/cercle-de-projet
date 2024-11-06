CREATE TABLE quiz(
   id SERIAL,
   title TEXT NOT NULL,
   description TEXT NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE lesson(
   id SERIAL,
   title TEXT NOT NULL,
   img TEXT,
   video VARCHAR(255),
   content TEXT NOT NULL,
   description TEXT NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE avatar(
   id SERIAL,
   img VARCHAR(255) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE question(
   id SERIAL,
   content TEXT NOT NULL,
   id_quiz INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_quiz) REFERENCES quiz(id)
);

CREATE TABLE response(
   id SERIAL,
   content VARCHAR(255) NOT NULL,
   is_correct BOOLEAN NOT NULL,
   id_question INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_question) REFERENCES question(id)
);

CREATE TABLE user_account(
   id SERIAL,
   email VARCHAR(255) NOT NULL,
   pseudo VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   first_name VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   role VARCHAR(50) DEFAULT 'user',
   id_avatar INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_avatar) REFERENCES avatar(id)
);

CREATE TABLE quiz_result(
   id SERIAL,
   note INTEGER NOT NULL,
   creation_date TIMESTAMP DEFAULT NOW(),
   id_quiz INTEGER NOT NULL,
   id_user_account INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_quiz) REFERENCES quiz(id),
   FOREIGN KEY(id_user_account) REFERENCES user_account(id)
);

CREATE TABLE user_response(
   id SERIAL,
   id_response INTEGER NOT NULL,
   id_question INTEGER NOT NULL,
   id_quiz_result INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_response) REFERENCES response(id),
   FOREIGN KEY(id_question) REFERENCES question(id),
   FOREIGN KEY(id_quiz_result) REFERENCES quiz_result(id)
);

CREATE TABLE user_account_has_friend(
   id_user_account INTEGER,
   id_friend INTEGER,
   accepted BOOLEAN DEFAULT false,
   PRIMARY KEY(id_user_account, id_friend),
   FOREIGN KEY(id_user_account) REFERENCES user_account(id),
   FOREIGN KEY(id_friend) REFERENCES user_account(id)
);

CREATE TABLE lesson_has_similary(
   id_lesson INTEGER,
   id_lesson_similary INTEGER,
   PRIMARY KEY(id_lesson, id_lesson_similary),
   FOREIGN KEY(id_lesson) REFERENCES lesson(id),
   FOREIGN KEY(id_lesson_similary) REFERENCES lesson(id)
);

CREATE TABLE quiz_has_lesson(
   id_quiz INTEGER,
   id_lesson INTEGER,
   PRIMARY KEY(id_quiz, id_lesson),
   FOREIGN KEY(id_quiz) REFERENCES quiz(id),
   FOREIGN KEY(id_lesson) REFERENCES lesson(id)
);

CREATE TABLE user_account_has_lesson(
   id_user_account INTEGER,
   id_lesson INTEGER,
   PRIMARY KEY(id_user_account, id_lesson),
   FOREIGN KEY(id_user_account) REFERENCES user_account(id),
   FOREIGN KEY(id_lesson) REFERENCES lesson(id)
);
