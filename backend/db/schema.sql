
-- *************** SqlDBM: PostgreSQL ****************;
-- ***************************************************;

CREATE DATABASE uralla;

\c uralla

-- *************** SqlDBM: PostgreSQL ****************;
-- ***************************************************;


-- ************************************** "users"

CREATE TABLE IF NOT EXISTS "users"
(
 "id"              serial NOT NULL,
 "email"           text NOT NULL,
 "password_digest" text NOT NULL,
 "description"     text NULL,
 "username"        text NOT NULL,
 "token"           text NOT NULL,
 CONSTRAINT "PK_table_6" PRIMARY KEY ( "id" )
);

-- ************************************** "tags"

CREATE TABLE IF NOT EXISTS "tags"
(
 "id"  serial NOT NULL,
 "tag" text NOT NULL,
 CONSTRAINT "PK_tags" PRIMARY KEY ( "id" )
);

-- ************************************** "posts"

CREATE TABLE IF NOT EXISTS "posts"
(
 "id"       serial NOT NULL,
 "title"    text NULL,
 "text"     text NOT NULL,
 "location" point NOT NULL,
 "user_id"  integer NOT NULL,
 "image"    text NULL,
 "date"     date NOT NULL DEFAULT CURRENT_DATE,
 "tag_id"   integer NOT NULL,
 CONSTRAINT "PK_post" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_47" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_71" FOREIGN KEY ( "tag_id" ) REFERENCES "tags" ( "id" )  ON DELETE CASCADE
);

CREATE INDEX "fkIdx_47" ON "posts"
(
 "user_id"
);

CREATE INDEX "fkIdx_71" ON "posts"
(
 "tag_id"
);


-- ************************************** "comments"

CREATE TABLE IF NOT EXISTS "comments"
(
 "id"      serial NOT NULL,
 "user_id" integer NOT NULL,
 "post_id" integer NOT NULL,
 "comment" text NOT NULL,
 "date"    date NOT NULL,
 CONSTRAINT "PK_comments" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_27" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_30" FOREIGN KEY ( "post_id" ) REFERENCES "posts" ( "id" ) ON DELETE CASCADE
);

CREATE INDEX "fkIdx_27" ON "comments"
(
 "user_id"
);

CREATE INDEX "fkIdx_30" ON "comments"
(
 "post_id"
);

-- ************************************** "likes"

CREATE TABLE IF NOT EXISTS "likes"
(
 "id"      serial NOT NULL,
 "user_id" integer NOT NULL,
 "post_id" integer NOT NULL,
 CONSTRAINT "PK_likes" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_20" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_23" FOREIGN KEY ( "post_id" ) REFERENCES "posts" ( "id" ) ON DELETE CASCADE
);

CREATE INDEX "fkIdx_20" ON "likes"
(
 "user_id"
);

CREATE INDEX "fkIdx_23" ON "likes"
(
 "post_id"
);

