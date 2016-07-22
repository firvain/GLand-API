CREATE TABLE public.categories (
  id           serial NOT NULL,
  description  varchar(50),
  parent_id    integer,
  /* Keys */
  CONSTRAINT categories_pkey
    PRIMARY KEY (id),
  /* Foreign keys */
  CONSTRAINT foreign_key01
    FOREIGN KEY (parent_id)
    REFERENCES public.categories(id)
) WITH (
    OIDS = FALSE
  )
