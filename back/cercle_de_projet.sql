CREATE TABLE qcm(
   id SERIAL,
   question TEXT NOT NULL,
   true_response TEXT NOT NULL,
   false_response_one TEXT NOT NULL,
   false_response_two TEXT NOT NULL,
   false_response_three TEXT NOT NULL,
   description VARCHAR(50) NOT NULL,
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

CREATE TABLE qcm_result(
   id SERIAL,
   note INTEGER,
   id_qcm INTEGER NOT NULL,
   id_user_account INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_qcm) REFERENCES qcm(id),
   FOREIGN KEY(id_user_account) REFERENCES user_account(id)
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

CREATE TABLE qcm_has_lesson(
   id_qcm INTEGER,
   id_lesson INTEGER,
   PRIMARY KEY(id_qcm, id_lesson),
   FOREIGN KEY(id_qcm) REFERENCES qcm(id),
   FOREIGN KEY(id_lesson) REFERENCES lesson(id)
);

CREATE TABLE user_account_has_lesson(
   id_user_account INTEGER,
   id_lesson INTEGER,
   PRIMARY KEY(id_user_account, id_lesson),
   FOREIGN KEY(id_user_account) REFERENCES user_account(id),
   FOREIGN KEY(id_lesson) REFERENCES lesson(id)
);
