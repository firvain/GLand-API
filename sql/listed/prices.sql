SELECT
    MAX(public.listings.price) AS maxprice,
    MIN(public.listings.price) AS minprice,
    public.estates.category_id
  FROM
    public.listings
    INNER JOIN public.estates ON (public.listings.estates_gid = public.estates.gid)
  WHERE public.listings.sale = ${sale}
  GROUP BY
    public.estates.category_id
