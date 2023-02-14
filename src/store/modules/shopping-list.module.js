import shoppingService from "../../services/shopping-service.js";

export default {
    state: {
        shoppingList: [],
        filterBy: {
            name: '',
            labelId: ''
        }
    },
    getters: {
        shoppingList(state) {
            return state.shoppingList;
        },
        shoppingListForDisplay(state) {
            var shoppingListForDisplay = state.shoppingList;
            var {name} = state.filterBy
            if (name) {
                const regex = new RegExp(name, 'i')
                shoppingListForDisplay = shoppingListForDisplay.filter((shoppingItem) => regex.test(shoppingItem.name));
            }
            return shoppingListForDisplay;
        },
        getAllItemsPriceSum(state) {
            let isAllPricesNumbers = true
            const pricesSum = state.shoppingList.reduce((pricesSum, item) => {
                if (Number.isInteger(+item.price)) pricesSum += +item.price
                else isAllPricesNumbers = false
                return pricesSum
            }, 0)

            if (isAllPricesNumbers) return pricesSum
            else return 'Not all prices are number type'
        },
    },
    mutations: {
        setShoppingList(state, {shoppingList}) {
            state.shoppingList = shoppingList;
        },
        removeShoppingItem({shoppingList}, {id}) {
            const idx = shoppingList.findIndex((shoppingItem) => shoppingItem._id === id);
            shoppingList.splice(idx, 1);
        },
        saveShoppingItem({shoppingList}, {shoppingItem}) {
            const idx = shoppingList.findIndex((currShoppingItem) => currShoppingItem._id === shoppingItem._id);
            idx === -1 ? shoppingList.push(shoppingItem) : shoppingList.splice(idx, 1, shoppingItem);
        },
        setFilter(state, {filterBy}) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadShoppingList(context) {
            try {
                const filterBy = {...context.state.filterBy};
                const shoppingList = await shoppingService.query(filterBy);
                context.commit({type: 'setShoppingList', shoppingList});
            } catch (err) {
                console.log("can't load shoppingList:", err);
            }
        },
        async removeShoppingItem({commit}, {id}) {
            try {
                await shoppingService.remove(id);
                commit({type: 'removeShoppingItem', id});
            } catch (err) {
                console.log('cannot remove shoppingItem', err);
            }
        },
        async toggleShoppingItemDoneStatus({commit, dispatch}, {shoppingItem}) {
            try {
                const toggledItem = {
                    ...shoppingItem,
                    isComplete: !shoppingItem.isComplete
                }
                dispatch({type: 'saveShoppingItem', shoppingItem: toggledItem})
            } catch (err) {
                console.log('cannot remove shoppingItem', err);
            }
        },
        async saveShoppingItem({commit}, {shoppingItem}) {
            try {
                const savedShoppingItem = await shoppingService.save(shoppingItem);
                commit({type: 'saveShoppingItem', shoppingItem: savedShoppingItem});
                return savedShoppingItem;
            } catch (err) {
                console.log(`can't save shoppingItem ${shoppingItem._id || ''}: ${err}`);
            }
        },
        async getShoppingItemById(context, {shoppingItemId}) {
            try {
                return await shoppingService.getById(shoppingItemId);
            } catch (err) {
                console.log(`can't get shoppingItem ${shoppingItemId}: ${err}`);
            }
        },
        async setFilter({commit, dispatch}, {filterBy}) {
            commit({type: 'setFilter', filterBy});
            await dispatch({type: 'loadShoppingList'});
        },
    },
};

