import { styled, Drawer as MuiDrawer } from '@mui/material';

export const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
    position: "relative",
    top: "56px",
    zIndex: 1,
    flexShrink: 0,
    minWidth: 240,
    "& .MuiDrawer-paper": {
        minWidth: 240,
        position: "absolute",
        transition: "none !important",
        width: "auto",
        maxWidth: "100%",
        maxheight: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            minWidth: "100%",
        },
    },
    "&.MuiDrawer-docked": {
        flexShrink: 0,
        width: "30%", // Adjust this value as needed
        flexBasis: "30%", // Ensure the drawer retains its width in the docked state
        position: "relative",
    },
}));
