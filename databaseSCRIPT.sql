drop database if exists venta_celulares;
CREATE DATABASE venta_celulares;

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int NOT NULL auto_increment,
  `model` varchar(20) NOT NULL,
  `brand` varchar(20) not null,
  `description` varchar(30) not null,
  `price` float not null,
  `stock` int not null,
  `date_register` varchar(20) not null,
  `date_updated` varchar(20) null,
  `image` varchar(100),
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users(
id int not null auto_increment,
dni int not null,
name varchar(20) not null,
surname varchar(20) not null,
email varchar(50) not null,
password varchar(200) not null,
isAdmin boolean not null,
PRIMARY KEY(id)
);

DROP TABLE IF EXISTS domicile;
CREATE TABLE domicile (
	postalCode varchar(10) not null,
    street varchar(30) not null,
    number int,
    PRIMARY KEY(postalCode)
);
DROP TABLE IF EXISTS shippings;
CREATE TABLE shippings(
	id int not null auto_increment,
    costForKm float not null,
    costShipping float not null,
    postalCode varchar(10) not null,
    PRIMARY KEY(id),
    CONSTRAINT street_ship_fk foreign key (postalCode) REFERENCES domicile(postalCode) on update cascade
);

DROP TABLE IF EXISTS sales;
CREATE TABLE sales(
 idCustomer int not null,
 idProduct int not null,
 quantity int not null,
 idShipping int null,
 dateSale varchar(20) not null,
 PRIMARY KEY(idCustomer,idProduct,dateSale),
 CONSTRAINT cust_sale_fk foreign key (idCustomer) REFERENCES users(id) on update cascade,
 CONSTRAINT prod_sale_fk foreign key (idProduct) REFERENCES products(id) on update cascade,
 CONSTRAINT ship_sale_fk foreign key (idShipping) REFERENCES shippings(id) on update cascade
);

DROP TABLE IF EXISTS publications;
CREATE TABLE publications(
	idAdministrator int not null,
    idProduct int not null,
    datePublication varchar(20) not null,
    PRIMARY KEY(idAdministrator,idProduct),
    CONSTRAINT adm_pub_fk foreign key (idAdministrator) REFERENCES users(id) on update cascade,
    CONSTRAINT prod_pub_fk foreign key (idProduct) REFERENCES products(id) on update cascade
);

INSERT INTO `products` (`model`, `brand`,`description`,`price`, `stock`,`date_register`,`date_updated`) VALUES 
  ('J3','SAMUSNG','GAMA BAJA',140.50,5,'12/05/2022','12/08/2022'),
  ('XS MAX','IPHONE','GAMA ALTA',605.00,2,'12/05/2022','12/08/2022');
COMMIT;

select * from products;
select * from sales;
select * from publications;
select * from users;
insert into sales (idCustomer,idProduct,quantity,idShipping,dateSale) values
    (2,2,3,null,'29/09/2023');
commit;


insert into users (dni,name,surname,email,password,isAdmin) values
    (12345678,'Alfano','rodrgiuez','alfano@gmail.com','123Alfano',true),
    (44644784,'Mauricio','Bochatay','mauribochatay@gmail.com','asdasdasdasda',false);
commit;

