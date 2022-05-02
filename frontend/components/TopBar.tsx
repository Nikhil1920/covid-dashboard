import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

type AppBarProps = {
    title: string;
    link: string;
};
const TopBar = ({ title, link }: AppBarProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <NextLink href={link} passHref>
                        <Link href={link} color="inherit" underline="none">
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                {title}
                            </Typography>
                        </Link>
                    </NextLink>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopBar;
