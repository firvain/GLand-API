CREATE TABLE public.listings (
  id            serial NOT NULL,
  estates_gid  integer NOT NULL,
  sale          boolean DEFAULT false,
  start_date    date NOT NULL DEFAULT CURRENT_DATE,
  end_end       date,
  short         boolean DEFAULT false,
  pets          boolean DEFAULT false,
  /* Keys */
  CONSTRAINT listing_pkey
    PRIMARY KEY (id),
  CONSTRAINT listing_estates_gid_key
    UNIQUE (property_id),
  /* Foreign keys */
  CONSTRAINT foreign_key01
    FOREIGN KEY (estates_gid)
    REFERENCES public.estates(gid)
) WITH (
    OIDS = FALSE
  );
