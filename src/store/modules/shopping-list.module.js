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
    },
    mutations: {
        setShoppingList(state, { shoppingList }) {
            console.log("shoppingList:", shoppingList)
            state.shoppingList = shoppingList;
        },
        removeShoppingItem({ shoppingList }, { id }) {
            const idx = shoppingList.findIndex((shoppingItem) => shoppingItem._id === id);
            shoppingList.splice(idx, 1);
        },
        saveShoppingItem({ shoppingList }, { shoppingItem }) {
            const idx = shoppingList.findIndex((currShoppingItem) => currShoppingItem._id === shoppingItem._id);
            idx === -1 ? shoppingList.push(shoppingItem) : shoppingList.splice(idx, 1, shoppingItem);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadShoppingList(context) {
            try {
                const filterBy = { ...context.state.filterBy };
                const shoppingList = await shoppingService.query(filterBy);
                context.commit({ type: 'setShoppingList', shoppingList });
            } catch (err) {
                console.log("can't load shoppingList:", err);
            }
        },
        async removeShoppingItem({ commit }, { id }) {
            try {
                await shoppingService.remove(id);
                commit({ type: 'removeShoppingItem', id });
            } catch (err) {
                console.log('cannot remove shoppingItem', err);
            }
        },
        async toggleShoppingItemDoneStatus({ commit, dispatch }, { shoppingItem }) {
            try {
                console.log("shoppingItem:", shoppingItem)
                const toggledItem = {
                    ...shoppingItem,
                    isComplete: !shoppingItem.isComplete
                }
                console.log("toggledItem:", toggledItem)
                dispatch({type: 'saveShoppingItem', shoppingItem: toggledItem})
                // await shoppingService.remove(id);
                // commit({ type: 'removeShoppingItem', id });
            } catch (err) {
                console.log('cannot remove shoppingItem', err);
            }
        },
        async saveShoppingItem({ commit }, { shoppingItem }) {
            try {
                const savedShoppingItem = await shoppingService.save(shoppingItem);
                commit({ type: 'saveShoppingItem', shoppingItem: savedShoppingItem });
                return savedShoppingItem;
            } catch (err) {
                console.log(`can't save shoppingItem ${shoppingItem._id || ''}: ${err}`);
            }
        },
        async getShoppingItemById(context, { shoppingItemId }) {
            try {
                return await shoppingService.getById(shoppingItemId);
            } catch (err) {
                console.log(`can't get shoppingItem ${shoppingItemId}: ${err}`);
            }
        },
        async setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            await dispatch({ type: 'loadShoppingList' });
        },
    },
};

// loadShoppingList(context, state) {
// // console.log(state.filterBy); // with proxy , state.filterBy is undifend
// let filterBy = { ...context.state.filterBy }; // important use context.state.filterBy
// //server side filter
// return shoppingService
//     .query(filterBy)
//     .then((shoppingList) => {
//         context.commit({ type: 'setShoppingList', shoppingList });
//     })
//     .catch((err) => {
//         console.log('Error: cannot get shoppingList', err);
//         throw err;
//     });
// },
//       context.commit   payload.id
// removeShoppingItem({ commit }, { id }) {
//     return shoppingService
//         .remove(id)
//         .then(() => {
//             commit({ type: 'removeShoppingItem', id });
//         })
//         .catch((err) => {
//             console.log('Error: cannot remove shoppingItem', err);
//             throw err;
//         });
// },
// saveShoppingItem({ commit }, { shoppingItem }) {
//     return shoppingService
//         .save(shoppingItem)
//         .then((savedShoppingItem) => {
//             commit({ type: 'saveShoppingItem', shoppingItem: savedShoppingItem });
//             console.log('savedShoppingItem', savedShoppingItem);
//             return savedShoppingItem; // can return if you we want showMsg
//         })
//         .catch((err) => {
//             console.log('Error: cannot save shoppingItem', err);
//             throw err;
//         });
// },
// getShoppingItemById(context, { shoppingItemId }) {
//     return shoppingService
//         .getById(shoppingItemId)
//         .then((shoppingItem) => {
//             //can add commit if needed
//             return shoppingItem;
//         })
//         .catch((err) => {
//             console.log('Error: cannot get shoppingItem', err);
//             throw err;
//         });
// },
// //set the filter and run the loadShoppingList with the filter
// setFilterAct({ commit, dispatch }, { filterBy }) {
//     commit({ type: 'setFilter', filterBy });
//     dispatch({ type: 'loadShoppingList' });
// },
