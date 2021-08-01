import ItemRepository from '../src/repository/item.repository';
import { Item } from '../src/repository/types/item.model';
import * as admin from 'firebase-admin';

const itemIdOne = 'sdgerhrndf46346sfh';
const itemIdTwo = 'sdgerhrndf4623346sfh';

const data = jest.fn();
const get = jest.fn(() => ({data}));
const update = jest.fn();
const set = jest.fn();
const doc = jest.fn(() => ({update, set, get}));
const collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue((({ doc } as unknown) as any));

describe('ItemRepository', () => {
  const repository = new ItemRepository();

  it('when received valid id, then returns item from database successfully', async () => {
    const item = {
      id: itemIdOne,
      viewCount: 1000,
    };

    data.mockResolvedValue(item);

    const result = await repository.get(itemIdOne);
    expect(result).toEqual(item);
    expect(collection).toHaveBeenCalledWith('items');
    expect(doc).toHaveBeenCalledWith(itemIdOne);
    expect(get).toHaveBeenCalled();
  });

  it('when received a valid item then saves it into database successfully', async () => {
    const newItem = {
      id: itemIdTwo,
      viewCount: 2,
    } as Item;
    const result = await repository.save(newItem);
    expect(result).toEqual(undefined);
    expect(collection).toHaveBeenCalledWith('items');
    expect(doc).toHaveBeenCalledWith(itemIdTwo);
    expect(set).toHaveBeenCalledWith(newItem);
  });
});
