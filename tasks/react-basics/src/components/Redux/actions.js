const addItem = item => ({
    type: 'ADD_ITEM',
    data: item,
});

const removeItem = arr => ({
    type: 'REMOVE_ITEM',
    data: arr,
});

const updateStore = arr => ({
    type: 'UPDATE_STORE',
    data: arr,
});

export {
    addItem,
    removeItem,
    updateStore,
};
