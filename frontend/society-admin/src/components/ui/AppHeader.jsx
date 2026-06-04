import {
    Box,
    Typography,
    Avatar
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";

import {
    getTenantName
} from "../../utils/session";

function AppHeader({
    title,
    action
}) {

    const tenantName =
        getTenantName();

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5
            }}
        >

            <Box>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "#0f172a",
                        mb: 0.5
                    }}
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 0.25
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 5,
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #e2e8f0"
                        }}
                    >

                        <ApartmentIcon
                            sx={{
                                fontSize: 16,
                                color: "#64748b"
                            }}
                        />

                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 600,
                                color: "#475569",
                                letterSpacing: "0.2px"
                            }}
                        >
                            {tenantName}
                        </Typography>

                    </Box>

                </Box>

            </Box>

            <Box>
                {action}
            </Box>

        </Box>

    );
}

export default AppHeader;