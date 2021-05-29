CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

SELECT u.user_name, t.todo_id, t.description, t.day, t.time, t.date 
FROM todos AS t 
LEFT JOIN users AS u 
ON t.user_id = u.user_id 
WHERE t.day = 'Friday'

-- CREATE OR REPLACE FUNCTION public.total()
--     RETURNS integer
--     LANGUAGE 'plpgsql'
--     VOLATILE
--     PARALLEL UNSAFE
--     COST 100
    
-- AS $BODY$
-- declare
-- total integer;
-- begin
-- select count(*) into total from film;
-- return total;
-- end;
-- $BODY$;