create database pxldb;
\c pxldb

create user secadv with password 'ilovesecurity';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

-- insert into users (user_name, password) values ('pxl-admin', 'insecureandlovinit') ;
-- insert into users (user_name, password) values ('george', 'iwishihadbetteradmins') ;
insert into users (user_name, password) values ('pxl-admin', '$2a$12$M2uu.LOVFaQS0favriLdmu2lfVlzedvR5X8Wh1GCUywVAYt5FTG2i') ;
insert into users (user_name, password) values ('george', '$2a$12$Oc920J0isyU8OkYUBEGe/eNyttAgv0l8/1EQbDUiY91DLNx.BOOfG') ;

COMMIT;