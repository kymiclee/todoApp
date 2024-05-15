import useDelete from '../hooks/API/DeleteHook';

const { todoItems, dispatch: dispatchItems } = UseTodoItemsContext() // useContext for all todo list for user
const { state: currentList, dispatch: setCurrentList } = UseCurrentTodoList()

const DeleteItem = async (itemId, formData) => {
    const { deleteFetch, loading, error } = useDelete(`items/${currentList._id}/${itemId}`)
    try {
        await deleteFetch();
        // Handle success, if needed
        dispatchItems({ type: 'DELETE_TODOITEM', payload: itemId })

    } catch (error) {
        // Handle error, if needed
        console.error('Error:', error.status, error);
    }
}

export default DeleteItem;
