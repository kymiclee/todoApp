// @ts-nocheck
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import TodoList from '../components/TodoLists';
const TodoPage = () => {
    const theme = useTheme();

    // Assuming you have a way to get the width of the .App class
    const appWidth = 1500; // Example value, replace this with the actual width

    const [listId, setListId] = useState(null);

    const handleListSelection = (id) => {
        setListId(id);
    };

    return (
        <div>
            <Box className='App'>
                <div className='NavBar'>
                    <NavBar />
                </div>
                {/* <div className="Todo">
                    <div className='TodoList'>
                        <TodoLists onSelectList={handleListSelection} />
                    </div>
                    <div className='TodoItems'>
                        <TodoItems listId={listId} />
                    </div>
                </div> */}
                {/* <VerticalTabs /> */}
                {/* <TodoDisplayList /> */}
                <TodoList appWidth={appWidth} />

            </Box>
        </div>

    );
};

export default TodoPage;
