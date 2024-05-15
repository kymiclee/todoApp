import usePut from '../hooks/API/usePut';
const { todoItems, dispatch: dispatchItems } = UseTodoItemsContext() // useContext for all todo list for user
const { state: currentList, dispatch: setCurrentList } = UseCurrentTodoList()


const EditItem = async (itemId, formData) => {
    const { putFetch, data, loading, error } = usePut(`/api/todo/items/${currentList._id}/${itemId}`);

    try {
        await putFetch(formData);
        // Handle success, if needed
        dispatchItems({ type: 'PATCH_TODOITEM', payload: data })
    } catch (error) {
        // Handle error, if needed
        console.error('Error:', error.status, error);
    }
};