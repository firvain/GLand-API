CREATE TABLE public.users (
  id             serial NOT NULL,
  first_name     text,
  last_name      text,
  phone_number   text,
  fax_number     text,
  email          text,
  street_name    text,
  street_number  text,
  ps_code        text,
  city           text,
  country        text,
  is_active      boolean NOT NULL DEFAULT false,
  /* Keys */
  CONSTRAINT users_pkey
    PRIMARY KEY (id)
) WITH (
    OIDS = FALSE
  );
