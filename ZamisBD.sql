-- Crear la base de datos
CREATE DATABASE tienda;
USE tienda;

-- Tabla usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

-- Tabla productos
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(255)
);

-- Tabla contactos
CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla pagos
CREATE TABLE pagos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  total DECIMAL(10,2) NOT NULL,
  metodo_pago VARCHAR(50) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);



INSERT INTO usuarios (nombre, correo, contraseña)
VALUES
('Juan Pérez', 'juan@example.com', '1234'),
('María López', 'maria@example.com', 'abcd'),
('Carlos Ramírez', 'carlos@example.com', 'pass123');

INSERT INTO productos (nombre, precio, descripcion, imagen) 
VALUES 
('Camiseta Zamis', 45000, 'Camiseta de algodón 100% con estampado', 'camiseta.jpg'),
('Gorra Zamis', 25000, 'Gorra ajustable con logo bordado', 'gorra.jpg'),
('Mochila Zamis', 80000, 'Mochila resistente al agua con compartimientos', 'mochila.jpg');

INSERT INTO contactos (nombre, email, mensaje)
VALUES
('Laura Torres', 'laura@example.com', 'Me gustaría saber más sobre los productos de Zamis.'),
('Pedro Gómez', 'pedro@example.com', '¿Tienen envíos internacionales?'),
('Ana Martínez', 'ana@example.com', 'Quiero hacer un pedido mayorista, ¿cómo puedo contactarlos?');

INSERT INTO pagos (usuario_id, total, metodo_pago)
VALUES
(1, 95000, 'Tarjeta de Crédito'),
(2, 25000, 'Nequi'),
(3, 125000, 'Efectivo');

CREATE USER 'root'@'localhost' IDENTIFIED BY '@lejandr0gmail';
GRANT ALL PRIVILEGES ON tienda.* TO 'root'@'localhost';
FLUSH PRIVILEGES;