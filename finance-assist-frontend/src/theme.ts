import {createTheme} from "@mui/material";
import {green, red} from '@mui/material/colors';


const theme = createTheme({
    palette: {
        primary: green,
        secondary: red
    }
});

theme.palette.primary.contrastText = "#fff";

export default theme;