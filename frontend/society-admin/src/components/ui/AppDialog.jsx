import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
} from "@mui/material";

function AppDialog({

    open,

    onClose,

    title = "",

    children,

    actions,

    maxWidth = "md",

    scrollable = false,

    bodyHeight = "60vh",

}) {

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth={true}

            maxWidth={maxWidth}


        >

            {/* HEADER */}
            <DialogTitle
                sx={{

                    borderBottom:
                        "1px solid #eef1f6",

                    px: 2,

                    py: 1.5,
                }}
            >

                <Box
                    sx={{
                        fontWeight: 700,
                        fontSize: 18,
                    }}
                >
                    {title}
                </Box>

            </DialogTitle>

            {/* CONTENT */}
            <DialogContent
                sx={{

                    overflowY:
                        scrollable
                            ? "auto"
                            : "visible",

                    maxHeight:
                        scrollable
                            ? bodyHeight
                            : "none",

                    pt: 2,
                }}

            >
                {children}

            </DialogContent>

            {/* FOOTER */}
            {actions && (

                <DialogActions
                    sx={{

                        borderTop:
                            "1px solid #eef1f6",

                        px: 2,

                        py: 1.5,
                    }}
                >

                    {actions}

                </DialogActions>

            )}

        </Dialog>

    );

}

export default AppDialog;