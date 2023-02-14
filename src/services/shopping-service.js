import {storageService} from './async-storage-service.js';
import {utilService} from './util-service.js';

const descriptionMock = 'The tomato is the edible berry of the plant Solanum lycopersicum,[1][2] commonly known as a tomato plant. ' +
    'The species originated in western South America and Central America.[2][3] The Nahuatl (the language used by the Aztecs) word tomatl gave rise to the ' +
    'Spanish word tomate, from which the English word tomato derived.[3][4] Its domestication and use as a cultivated food may have originated with' +
    ' the indigenous peoples of Mexico.[2][5] The Aztecs used tomatoes in their cooking at the time of the Spanish conquest of the Aztec Empire, and ' +
    'after the Spanish encountered the tomato for the first time after their contact with the Aztecs, they brought the plant to Europe. From there, the' +
    ' tomato was introduced to other parts of the European-colonized world during the 16th century.[2]'

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
            _createShoppingItem('Apple', 5, ['Food', 'Fruits'], descriptionMock),
            _createShoppingItem('Bread', 15, ['Food', 'Carbohydrates'], descriptionMock),
            _createShoppingItem('White cheese', 10, ['Food', 'Milk'], descriptionMock),
            _createShoppingItem('Char', 50, ['Furniture'], descriptionMock)
        ];
        localStorage.setItem(KEY, JSON.stringify(shoppingList));
    }
    return shoppingList;
}

function _createShoppingItem(name, price, labels, description) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        description,
        isComplete: false,
        createdAt: new Date(Date.now()).toLocaleString(),
    };
}
