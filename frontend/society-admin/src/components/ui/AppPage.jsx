import { Box } from "@mui/material";

function AppPage({ children }) {

    return (

        <Box
            sx={{

                flex: 1,

                minHeight: 0,

                height: "100%",

                display: "flex",

                flexDirection: "column",

                width: "100%",

                overflow: "hidden",

                p: 1.5,

                gap: 0.1,

                boxSizing: "border-box",
            }}
        >

            {children}

        </Box>

    );

}

export default AppPage;