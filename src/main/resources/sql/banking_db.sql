DROP DATABASE;
CREATE DATABASE banking_app;

create table bank (
   bank_id   int primary key AUTO_INCREMENT,
   bank_name varchar(255) not null,
   created_date datetime,
   last_updated_date datetime
);
// This will be the company

create table country (
   country_id   int primary key AUTO_INCREMENT,
   country_name varchar(255) not null,
   bank_id int,
   created_date datetime,
   last_updated_date datetime,	
   FOREIGN KEY (bank_id)
   REFERENCES bank(bank_id)
);

create table state (
    state_id int primary key AUTO_INCREMENT,
    state_name varchar(255) not null, 
    bank_id int,
    country_id int,
    created_date datetime,
    last_updated_date datetime,	
	FOREIGN KEY (bank_id) REFERENCES bank(bank_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (country_id) REFERENCES country(country_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE	
);

create table city (
    city_id int primary key AUTO_INCREMENT,
    city_name varchar(255) not null,
    state_id int,
    bank_id int,
    created_date datetime,
    last_updated_date datetime,	
	FOREIGN KEY (bank_id) REFERENCES bank(bank_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (state_id) REFERENCES state(state_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

create table branch (
    branch_id int primary key AUTO_INCREMENT,
    branch_name varchar(255) not null,
    activeate_code varchar(255),
    branch_status boolean not null default 0,
    city_id int,
    bank_id int,
    created_date datetime,
    last_updated_date datetime,
	FOREIGN KEY (bank_id) REFERENCES bank(bank_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (city_id) REFERENCES city(city_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE	
);


create table bank_content (
    bank_content_id int not null,
    branch_id int,
    bank_id int,
    content_type varchar(255),
    content_name varchar(255),
    content_path varchar(1024),
    content_order int,
    content_status boolean,
    content_schedule_start datetime,
    content_schedule_end datetime,
    created_date datetime,
    last_updated_date datetime,
	FOREIGN KEY (bank_id) REFERENCES bank(bank_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE	
);