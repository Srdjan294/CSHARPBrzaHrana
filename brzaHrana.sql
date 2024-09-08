SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_aace85_brzahrana SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aace85_brzahrana COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aace85_brzahrana SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO


drop table stavke;
drop table narudzbe;
drop table korisnici;
drop table jelovnici;

create table korisnici(
sifra int not null primary key identity(1,1),
ime varchar(100) not null,
prezime varchar(100) not null,
email varchar(200) not null
);

create table jelovnici(
sifra int not null primary key identity(1,1),
naziv_jela varchar(100) not null,
kategorija varchar(100) not null,
cijena decimal(18,2) not null
);

create table narudzbe(
sifra int not null primary key identity(1,1),
korisnik int not null,
adresa varchar(200),
datum datetime not null,
ukupna_cijena decimal(18,2) not null
);

create table stavke(
narudzba int not null,
jelovnik int not null,
kolicina int not null
);



alter table narudzbe add foreign key (korisnik) references korisnici(sifra);
alter table stavke add foreign key (narudzba) references narudzbe(sifra);
alter table stavke add foreign key (jelovnik) references jelovnici(sifra);



-- inserti

insert into korisnici (ime, prezime, email) values
('Igor','Balažić','igorbalazic11@gmail.com'),
('Damir','Bukvašević','damirbukvasevic@gmail.com'),
('Senka','Banjac','sbanjac88@gmail.com'),
('Igor','Brzica','igorbrzica1@gmail.com'),
('Ivan','Mesarić','mesaritchievan@gmail.com'),
('Mirko','Ereš','mirko.eres1@gmail.com'),
('Lea','Raguž','raguz.leaa@gmail.com'),
('Dominik  ','Daraždi','dominikdarazdi@gmail.com'),
('Dean','Vagner','deanvagner@yahoo.com'),
('Marko','Mudrovčić','markomudrovcic12@gmail.com'),
('Mario','Kušen','kusen.mario@gmail.com'),
('Leon','Jalovičar','ringerajacar@gmail.com');


insert into jelovnici (naziv_jela, kategorija, cijena) values
('hamburger', 'govedina', 1.70),
('cheeseburger', 'govedina', 1.70),
('double cheeseburger' , 'govedina', 3.20),
('Big Mac', 'govedina', 4.20),
('Big Tasty', 'govedina', 5.10),
('Big Tasty Bacon', 'govedina', 5.70),
('Double Big Tasty Bacon', 'govedina', 7.20),
('Royal', 'govedina', 4.20),
('McChicken', 'piletina', 4.20),
('Chicker', 'piletina', 1.80),
('McWrap Crispy Chicken', 'piletina', 4.30),
('McWrap Grilled Chicken', 'piletina', 4.30),
('6 McNuggets', 'piletina', 4.10),
('9 McNuggets', 'piletina', 4.60),
('Chicken Box', 'piletina', 11.00),
('Ceasar McCrispy', 'piletina', 5.00),
('Ceasar Grilled Chicken', 'piletina', 5.00),
('3 Strips', 'piletina', 3.70),
('5 Strips', 'piletina', 5.00),
('Snack Wrap', 'piletina', 1.80),
('Country', 'svinjetina', 4.20),
('Fish-o-fillet', 'riba', 3.90),
('Vege Maestro', 'vegetarijanski', 5.90),
('Vege Ceasar', 'vegetarijanski', 5.00);


insert into narudzbe (korisnik, adresa, datum, ukupna_cijena) values
(1, 'Josipa Jurja Strosmayera 4', '2024-06-03', 15.00),
(2, 'Retfala Nova 19', '2024-06-03', 16.20),
(3, 'Dubrovačka 23', '2024-06-03', 14.30),
(4, 'Vukovarska 12', '2024-06-03', 22.00),
(5, 'Osječka 34', '2024-06-03', 20.00),
(6, 'Makarska 33', '2024-06-03', 20.50);


insert into stavke (narudzba, jelovnik, kolicina) values
(1,3,5),(2,4,3),(3,6,1),(4,1,1),(4,2,1),(4,15,1);
