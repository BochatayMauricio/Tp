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
  image varchar(45),
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS administrators;
CREATE TABLE administrators(
dni int not null,
name varchar(20) not null,
surname varchar(20) not null,
email varchar(50) not null,
password varchar(200) not null,
PRIMARY KEY(dni)
);

DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
 dni int not null,
 name varchar(20) not null,
 surname varchar(20) not null,
 email varchar(50) not null,
 password varchar(20) not null,
 PRIMARY KEY(dni)
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
	id int not null,
    costForKm float not null,
    costShipping float not null,
    postalCode varchar(10) not null,
    PRIMARY KEY(id),
    CONSTRAINT street_ship_fk foreign key (postalCode) REFERENCES domicile(postalCode) on update cascade
);

DROP TABLE IF EXISTS sales;
CREATE TABLE sales(
 dniCustomer int not null,
 idProduct int not null,
 quantity int not null,
 idShipping int null,
 dateSale varchar(20) not null,
 PRIMARY KEY(dniCustomer,idProduct,dateSale),
 CONSTRAINT cust_sale_fk foreign key (dniCustomer) REFERENCES customers(dni) on update cascade,
 CONSTRAINT prod_sale_fk foreign key (idProduct) REFERENCES products(id) on update cascade,
 CONSTRAINT ship_sale_fk foreign key (idShipping) REFERENCES shippings(id) on update cascade
);

DROP TABLE IF EXISTS publications;
CREATE TABLE publications(
	dniAdministrator int not null,
    idProduct int not null,
    datePublication varchar(20) not null,
    PRIMARY KEY(dniAdministrator,idProduct),
    CONSTRAINT adm_pub_fk foreign key (dniAdministrator) REFERENCES administrators(dni) on update cascade,
    CONSTRAINT prod_pub_fk foreign key (idProduct) REFERENCES products(id) on update cascade
);

INSERT INTO `products` (`model`, `brand`,`description`,`price`, `stock`,`date_register`,`date_updated`) VALUES 
  ('J3','SAMUSNG','GAMA BAJA',140.50,5,'12/05/2022','12/08/2022'),
  ('XS MAX','IPHONE','GAMA ALTA',605.00,2,'12/05/2022','12/08/2022');
COMMIT;

select * from administrators;
select * from products;
select * from sales;

insert into sales (dniCustomer,idProduct,quantity,idShipping,dateSale) values
	(44644784,7,1,null,'18/05/2021');
commit;


insert into customers (dni,name,surname,email,password) values
	(44644784,'maurico','bochatay','mauriboch@gmail.com','4464487Mauri');
commit;

select * from customers;
