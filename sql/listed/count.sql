SELECT
  COUNT(public.listings.id) AS count,
  public.estates.category_id
FROM
  public.listings
   JOIN public.estates ON (public.listings.estates_gid = public.estates.gid)
 WHERE public.listings.sale = ${sale}
GROUP BY
  public.estates.category_id
