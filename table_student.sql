create table student
(
	student_id int unsigned auto_increment,
    name varchar(100),
    email varchar(100),
    address varchar(200),
    phone varchar(14),
    punctuation varchar(11),
    primary key (student_id)
    
);

insert into student (name, email, address, phone, punctuation) values ('Carlos Santos', 'caralos@email.com', 'Rua Número 2', '11933662244', '5');