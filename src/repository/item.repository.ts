import {Item} from '@/repository/types/item.model';
import {CrudRepository} from '@/repository/crud.repository';
import {firestore} from './database';
import { MESSAGE_ID_REQUIRED, MESSAGE_ITEM_REQUIRED } from '../common/exception.constants';
import { shortDateFormat } from '../common/date';

const ROOT_COLLECTION_PATH = 'views';
const ITEM_COLLECTION_PATH = 'items';

class ItemRepository implements CrudRepository<Item> {
    get = async (id: string): Promise<Item> => {
        if (!id) throw Error(MESSAGE_ID_REQUIRED);

        const date = shortDateFormat(new Date());

        const snapshot = await firestore
          .collection(ROOT_COLLECTION_PATH)
          .doc(date)
          .collection(ITEM_COLLECTION_PATH)
          .doc(id)
          .get()

        return snapshot.data() as Item;
    }
    save = async (item: Item): Promise<void> => {
        if (!item || !item.id) throw Error(MESSAGE_ITEM_REQUIRED);

        const date = shortDateFormat(new Date());

        await firestore
          .collection(ROOT_COLLECTION_PATH)
          .doc(date)
          .collection(ITEM_COLLECTION_PATH)
          .doc(item.id)
          .set(item);
    }
}

export default ItemRepository;
