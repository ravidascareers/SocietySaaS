import { Button } from "@mui/material";

function AppButton({

    children,

    variant = "contained",

    color = "primary",

    sx = {},

    ...props

}) {

    return (

        <Button

            variant={variant}

            color={color}

            disableElevation

            sx={{

                borderRadius: 2,

                textTransform: "none",

                fontWeight: 600,

                px: 2,

                minHeight: 36,

                boxShadow: "none",

                whiteSpace: "nowrap",

                ...sx,
            }}

            {...props}
        >

            {children}

        </Button>

    );

}

export default AppButton;