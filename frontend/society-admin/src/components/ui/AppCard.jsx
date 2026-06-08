import {
    Card,
    CardContent,
} from "@mui/material";

function AppCard({
    children,
    sx = {},
    contentSx = {},
    ...props
}) {

    return (

        <Card
            {...props}
            
            elevation={0}

            sx={{

                borderRadius: 2,

                border:
                    "1px solid #e5e7eb",

                boxShadow:
                    "0 1px 2px rgba(0,0,0,0.04)",

                backgroundColor:
                    "#ffffff",

                display: "flex",

                flexDirection: "column",

                minHeight: 0,

                ...sx,
            }}
        >

            <CardContent
                sx={{

                    p: 1.5,

                    flex: 1,

                    minHeight: 0,

                    display: "flex",

                    flexDirection: "column",

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