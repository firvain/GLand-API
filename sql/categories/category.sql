select
  description as name,
  id as value
from categories
where
  parent_id is null
