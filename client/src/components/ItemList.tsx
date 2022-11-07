import React, { useEffect } from 'react';

import { Stack } from '@mui/material';

import { useAppSelector } from '../redux/hooks';
import { selectItemsListById } from '../redux/features/itemListsSlice';

import Item from './Item';
import ItemListMeta from './ItemListMeta';
import { TypeDBItemList } from '../types/item';

import '../styles/components/itemlist.css';

type Props = {
  listId: TypeDBItemList['_id'];
};
function ItemList({ listId }: Props) {
  const itemList = useAppSelector((s) => selectItemsListById(s, listId)) as TypeDBItemList;

  useEffect(() => {
    console.log('ItemList updated');
  }, [itemList]);

  return (
    <Stack className="item-list" spacing={2} alignItems="center">
      <ItemListMeta itemList={itemList} />
      {itemList.items.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </Stack>
  );
}

export default ItemList;
