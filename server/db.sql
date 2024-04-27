Create Table huellasAPP_Movimientos (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    tipo Varchar(200) NOT NULL,
    pruducto Varchar(300),
    cantidad Decimal,
    creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);