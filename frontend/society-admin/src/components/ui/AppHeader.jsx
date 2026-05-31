import {
    Box,
    Typography,
} from "@mui/material";

function AppHeader({

    title = "",

    subtitle = "",

    action = null,

}) {

    return (

        <Box
            sx={{

                display: "flex",

                alignItems: "center",

                justifyContent:
                    "space-between",

                gap: 2,

                minHeight: 48,
            }}
        >

            {/* LEFT SECTION */}
            <Box>

                <Typography
                    variant="h5"

                    sx={{

                        fontWeight: 700,

                        color: "#111827",

                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (

                    <Typography
                        variant="body2"

                        sx={{

                            color: "#6b7280",

                            mt: 0.3,
                        }}
                    >
                        {subtitle}
                    </Typography>

                )}

            </Box>

            {/* RIGHT ACTIONS */}
            <Box
                sx={{

                    display: "flex",

                    alignItems: "center",

                    gap: 1,
                }}
            >

                {action}

            </Box>

        </Box>

    );

}

export default AppHeader;