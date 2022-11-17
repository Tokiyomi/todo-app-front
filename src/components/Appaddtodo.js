import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function AddTodoButton() {
    return (
        <Box sx={{ my: 2 }}>
            <Button variant="contained">Add New Todo</Button>
        </Box>
    );
}