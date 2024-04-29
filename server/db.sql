-- Active: 1714263204479@@dpg-comopj21hbls73f7cf4g-a.oregon-postgres.render.com@5432

-- DROP FUNCTION public.calcular_costo_total_producto();

CREATE OR REPLACE FUNCTION public.calcular_costo_total_producto()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE 
  usd decimal;
 euro decimal;
mlc decimal;
zelle decimal;
 
BEGIN
  SELECT precio INTO usd FROM monedas WHERE moneda = 'USD';
 SELECT precio INTO euro FROM monedas WHERE moneda = 'EURO';
SELECT precio INTO mlc FROM monedas WHERE moneda = 'MLC';
SELECT precio INTO zelle FROM monedas WHERE moneda = 'ZELLE';
  NEW.costo_total := NEW.costo_unitario * NEW.existencia;
  NEW.costo_usd := NEW.costo_unitario / usd;
 NEW.costo_euro := NEW.costo_unitario / euro;
NEW.costo_mlc := NEW.costo_unitario / mlc;
NEW.costo_zelle := NEW.costo_unitario / zelle;
  RETURN NEW;
END;
$function$
;

create or replace trigger tr_actualizar_costo_total_producto before
insert
    or
update
    on
    public.productos for each row execute function calcular_costo_total_producto();



    -- DROP FUNCTION public.insertar_movimiento();

CREATE OR REPLACE FUNCTION public.insertar_movimiento()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE productos
  SET existencia = existencia - NEW.cantidad
  WHERE id_producto = NEW.id_producto;

  INSERT INTO movimientos (id_producto, tipo, cantidad)
  VALUES (NEW.id_producto, 'Venta', NEW.cantidad);

  RETURN NEW;
END;
$function$
;


create or replace trigger tr_insertar_movimiento after
insert
    on
    public.ventas for each row execute function insertar_movimiento();


    ALTER TABLE public.movimientos ALTER COLUMN "createdAt" SET DEFAULT CURRENT_DATE;
ALTER TABLE public.movimientos ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_DATE;


-- DROP FUNCTION public.calcular_costo_total_producto();


--calcular al actualizar monedas



CREATE OR REPLACE FUNCTION public.actualizar_costo_productoMLC()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE 
  usd decimal;
 euro decimal;
mlc decimal;
zelle decimal;
 
BEGIN
  SELECT new.precio INTO usd FROM monedas WHERE moneda = 'USD';
 SELECT new.precio INTO euro FROM monedas WHERE moneda = 'EURO';
SELECT new.precio INTO mlc FROM monedas WHERE moneda = 'MLC';
SELECT new.precio INTO zelle FROM monedas WHERE moneda = 'ZELLE';
UPDATE productos
SET costo_usd = costo_unitario / usd,
    costo_euro = costo_unitario / euro,
    costo_mlc = costo_unitario / mlc,
    costo_zelle = costo_unitario / zelle;

  RETURN NEW;
END;
$function$
;



create or replace trigger trMoneda_actualizar_costo_total_producto after
insert
    or
update
    on
    public.monedas for each row execute function actualizar_costo_productoMLC()



