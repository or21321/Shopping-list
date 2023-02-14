import {storageService} from './async-storage-service.js';
import {utilService} from './util-service.js';

const KEY = 'shoppingDB';

export default {
    query,
    getById,
    remove,
    save,
    getEmptyShoppingItem,
};

async function query(filterBy) {
    try {
        var shoppingList = await storageService.query(KEY);
        if (!shoppingList || !shoppingList.length) shoppingList = _createShoppingList();
        // Todo: Save to storage
        return shoppingList;
    } catch (err) {
        console.log("can't get shoppingList:", err);
    }
}

async function getById(id) {
    try {
        return await storageService.get(KEY, id);
    } catch (err) {
        console.log(`can't get shoppingItem ${id}: ${err}`);
    }
}

async function remove(id) {
    try {
        return await storageService.remove(KEY, id);
    } catch (err) {
        console.log(`can't delete shoppingItem ${id}: ${err}`);
    }
}

async function save(shoppingItem) {
    try {
        return (await shoppingItem._id)
            ? storageService.put(KEY, shoppingItem)
            : storageService.post(KEY, shoppingItem);
    } catch (err) {
        console.log(`can't save shoppingItem ${id || ''}: ${err}`);
    }
}

function getEmptyShoppingItem() {
    return {
        _id: '',
        name: '',
        price: 10,
        labels: [],
        createdAt: new Date(Date.now()).toLocaleString(),
        isComplete: false,
    };
}

function _createShoppingList() {
    var shoppingList = JSON.parse(localStorage.getItem(KEY));
    if (!shoppingList || !shoppingList.length) {
        shoppingList = [
            _createShoppingItem('Apple', 5, ['Food', 'Fruits']),
            _createShoppingItem('Bread', 15, ['Food', 'Carbohydrates']),
            _createShoppingItem('White cheese', 10, ['Food', 'Milk']),
            _createShoppingItem('Char', 50, ['Furniture'])
        ];
        localStorage.setItem(KEY, JSON.stringify(shoppingList));
    }
    return shoppingList;
}

function _createShoppingItem(name, price, labels) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        isComplete: false,
        createdAt: new Date(Date.now()).toLocaleString(),
    };
}
