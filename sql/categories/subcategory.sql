with recursive tree as (
  select
    id,
    categories.description,
    array[10]::integer[] as ancestors
  from categories
  where
    parent_id = $1
  union all
  select
    categories.id,
    categories.description,
    tree.ancestors || categories.parent_id
  from categories, tree
  where
    categories.parent_id = tree.id
)
select
  description as name,
  id as value
from tree;
