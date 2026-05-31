import {
    Card,
    CardContent,
} from "@mui/material";

function AppCard({
    children,
    sx = {},
    contentSx = {},
}) {

    return (

        <Card
            elevation={0}

            sx={{

                borderRadius: 2,

                border:
                    "1px solid #e5e7eb",

                boxShadow:
                    "0 1px 2px rgba(0,0,0,0.04)",

                backgroundColor:
                    "#ffffff",

              

                ...sx,
            }}
        >

            <CardContent
                sx={{

                    p: 2,

                    "&:last-child": {
                        pb: 2,
                    },

                    ...contentSx,
                }}
            >

                {children}

            </CardContent>

        </Card>

    );

}

export default AppCard;