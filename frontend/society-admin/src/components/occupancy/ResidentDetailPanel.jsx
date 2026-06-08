import { Box, Typography, Chip } from "@mui/material";

import AppCard from "../ui/AppCard";

function ResidentDetailPanel({

    selectedFlat,

    selectedOccupancy
}) {

    if (!selectedFlat)
        return null;

    return (

        <AppCard
            sx={{
                position: "sticky",
                top: 16
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
            >
                {selectedFlat.flatNo}
            </Typography>

            <Typography
                sx={{ mt: 2 }}
            >
                Floor :
                {selectedFlat.floorNo}
            </Typography>

            <Chip

                label={
                    selectedFlat.status
                }

                color={
                    selectedFlat.status ===
                    "Occupied"

                        ? "success"

                        : "default"
                }

                sx={{
                    mt: 2
                }}
            />

            <Typography
                sx={{
                    mt: 3,
                    fontWeight: 700
                }}
            >
                Resident
            </Typography>

            <Typography>
                {
                    selectedOccupancy
                        ?.residentName
                    ||
                    "Vacant"
                }
            </Typography>

            <Typography
                sx={{
                    mt: 2,
                    fontWeight: 700
                }}
            >
                Occupancy Type
            </Typography>

            <Typography>
                {
                    selectedOccupancy
                        ?.occupancyType
                    ||
                    "-"
                }
            </Typography>

            <Typography
                sx={{
                    mt: 2,
                    fontWeight: 700
                }}
            >
                Occupied Since
            </Typography>

            <Typography>
                {
                    selectedOccupancy
                        ?.startDate
                    ||
                    "-"
                }
            </Typography>

            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}
            >

                <Chip
                    label="Transfer"
                    clickable
                    color="primary"
                />

                <Chip
                    label="Vacate"
                    clickable
                    color="warning"
                />

                <Chip
                    label="History"
                    clickable
                />

            </Box>

        </AppCard>

    );

}

export default ResidentDetailPanel;