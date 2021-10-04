import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

type Props = {
    filter: Filter;
};

export const ToolBar = (props: Props) => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        arial-label="menu"
                        sx={{ mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography>{props.filter}</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}