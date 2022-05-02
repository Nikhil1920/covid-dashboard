import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

const Copyright: NextPage = () => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
                mt: 4,
                mb: 10,
            }}
        >
            {"Copyright © "}
            <MuiLink color="inherit" href="https://anreddy.in">
                Nikhil Reddy Avuthu
            </MuiLink>{" "}
            {new Date().getFullYear()}.
        </Typography>
    );
};

export default Copyright;
