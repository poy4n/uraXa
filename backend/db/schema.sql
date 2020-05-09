
-- *************** SqlDBM: PostgreSQL ****************;
-- ***************************************************;

CREATE DATABASE uralla;

\c uralla

-- ************************************** users

CREATE TABLE  users (
    id              serial NOT NULL,
    email           varchar(250) NOT NULL,
    password_digest varchar(400) NOT NULL,
    avatar          varchar(500) NOT NULL,
    description     varchar(500) NOT NULL,
    username        varchar(50) NOT NULL,
    CONSTRAINT PK_users PRIMARY KEY ( id ),
    CONSTRAINT unique_email UNIQUE (email)
);

-- ************************************** posts

CREATE TABLE  posts
(
    id       serial NOT NULL,
    title    varchar(250) NOT NULL,
    text     varchar(140) NOT NULL,
    location point NOT NULL,
    user_id  integer NOT NULL,
    CONSTRAINT PK_posts PRIMARY KEY ( id ),
    CONSTRAINT FK_users FOREIGN KEY ( user_id ) REFERENCES users ( id ) ON DELETE CASCADE
);

CREATE INDEX fkIdx_47 ON posts
(
    user_id
);

-- ************************************** post_images

CREATE TABLE  post_images
(
    id      serial NOT NULL,
    img_url varchar(600) NOT NULL,
    post_id integer NOT NULL,
    CONSTRAINT PK_post_images PRIMARY KEY ( id ),
    CONSTRAINT FK_posts FOREIGN KEY ( post_id ) REFERENCES posts ( id ) ON DELETE CASCADE
);

CREATE INDEX fkIdx_42 ON post_images
(
    post_id
);

-- ************************************** tags

CREATE TABLE  tags
(
    id  serial NOT NULL,
    tag varchar(50) NOT NULL,
    CONSTRAINT PK_tags PRIMARY KEY ( id )
);
-- ************************************** likes

CREATE TABLE  likes
(
    id      serial NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    CONSTRAINT PK_likes PRIMARY KEY ( id ),
    CONSTRAINT FK_users FOREIGN KEY ( user_id ) REFERENCES users ( id ) ON DELETE CASCADE,
    CONSTRAINT FK_posts FOREIGN KEY ( post_id ) REFERENCES posts ( id ) ON DELETE CASCADE
);

CREATE INDEX fkIdx_20 ON likes
(
    user_id
);

CREATE INDEX fkIdx_23 ON likes
(
    post_id
);

-- ************************************** comments

CREATE TABLE  comments
(
    user_id integer NOT NULL,
    id      serial NOT NULL,
    post_id integer NOT NULL,
    CONSTRAINT PK_comments PRIMARY KEY ( id ),
    CONSTRAINT FK_users FOREIGN KEY ( user_id ) REFERENCES users ( id ) ON DELETE CASCADE,
    CONSTRAINT FK_posts FOREIGN KEY ( post_id ) REFERENCES posts ( id ) ON DELETE CASCADE
);

CREATE INDEX fkIdx_27 ON comments
(
    user_id
);

CREATE INDEX fkIdx_30 ON comments
(
    post_id
);

-- ************************************** posts_tags

CREATE TABLE  posts_tags
(
    id      serial NOT NULL,
    post_id integer NOT NULL,
    tag_id  integer NOT NULL,
    CONSTRAINT PK_posts_tags PRIMARY KEY ( id ),
    CONSTRAINT FK_posts FOREIGN KEY ( post_id ) REFERENCES posts ( id ),
    CONSTRAINT FK_tags FOREIGN KEY ( tag_id ) REFERENCES tags ( id )
);

CREATE INDEX fkIdx_62 ON posts_tags
(
    post_id
);

CREATE INDEX fkIdx_65 ON posts_tags
(
    tag_id
);
