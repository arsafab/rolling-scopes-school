const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [
                action.data,
                ...state,
            ];

        case 'REMOVE_ITEM':
            return action.data;

        case 'UPDATE_STORE':
            return [...state];

        default:
            break;
    }
        return state;
    };

export default reducer;
