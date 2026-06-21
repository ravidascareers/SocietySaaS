import {
    Box,
    Typography,
    Chip,
    Avatar,
    Divider
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";

import AppCard from "../ui/AppCard";

function ResidentDetailPanel({

    selectedFlat,

    selectedOccupancy

}) {

    if (!selectedFlat)
        return null;

    const occupied =
        !!selectedOccupancy;

    return (

        <AppCard
            sx={{
                position: "sticky",
                top: 16,
            }}
        >

            {/* PROFILE */}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center"
                }}
            >

                <Avatar
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor:
                            occupied
                                ? "#2563eb"
                                : "#94a3b8"
                    }}
                >

                    {
                        occupied

                            ? <PersonIcon />

                            : <HomeIcon />
                    }

                </Avatar>

                <Typography
                    variant="h7"
                    fontWeight={600}
                    sx={{ mt: 0.5 }}
                >
                    {
                        selectedOccupancy
                            ?.residentName

                        ||

                        "Available Home"
                    }
                </Typography>

                <Typography
                    variant="h7"
                    sx={{
                        color: "#64748b",
                        fontSize: 13
                    }}
                >
                    {
                        occupied

                            ? selectedOccupancy
                                ?.occupancyType === "OWNER"

                                ? "Home Owner"

                                : "Resident Tenant"

                            : "Ready To Move In"
                    }
                </Typography>

            </Box>

            <Divider
                sx={{ my: 1.5 }}
            />

            {/* HOME INFO */}

            <Typography
                variant="h7"
                fontWeight={600}
                sx={{ mb: 0.5 }}
            >
                Home Information
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5
                }}
            >

                <Typography>

                    <DoorFrontIcon
                        sx={{
                            fontSize: 16,
                            mr: 1,
                            verticalAlign: "middle"
                        }}
                    />

                    {selectedFlat.flatNo}

                </Typography>

                <Typography>

                    <ApartmentIcon
                        sx={{
                            fontSize: 16,
                            mr: 1,
                            verticalAlign: "middle"
                        }}
                    />

                    {selectedFlat.towerName}

                </Typography>

                <Typography>

                    <HomeIcon
                        sx={{
                            fontSize: 16,
                            mr: 1,
                            verticalAlign: "middle"
                        }}
                    />

                    {
                        selectedFlat.flatTypeName
                    }

                </Typography>

            </Box>

            <Divider
                sx={{ my: 0.1 }}
            />


            {/* OCCUPANCY */}

            <Typography
                fontWeight={700}
                sx={{ mb: 0.5 }}
            >
                Occupancy Details
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5
                }}
            >

                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <EventIcon
                        sx={{
                            fontSize: 16
                        }}
                    />

                    Living Since

                    <Box
                        component="span"
                        sx={{
                            fontWeight: 600,
                            color: "#111827"
                        }}
                    >
                        {
                            selectedOccupancy?.startDate

                                ? new Date(
                                    selectedOccupancy.startDate
                                ).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    }
                                )

                                : "-"
                        }
                    </Box>

                </Typography>

                <Chip

                    size="small"

                    label={
                        occupied
                            ? "Living Here"
                            : "Available Home"
                    }

                    sx={{

                        width: "fit-content",

                        bgcolor:
                            occupied
                                ? "#eff6ff"
                                : "#f3f4f6",

                        color:
                            occupied
                                ? "#2563eb"
                                : "#64748b",

                        fontWeight: 600
                    }}
                />

            </Box>

            <Divider sx={{ my: 1 }} />

            {/* ACTIONS */}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}
            >

                <Chip
                    label="Transfer Resident"
                    clickable
                    color="primary"
                />

                <Chip
                    label="Vacate Home"
                    clickable
                    color="warning"
                />

                <Chip
                    label="Occupancy History"
                    clickable
                />

            </Box>

        </AppCard>

    );

}

export default ResidentDetailPanel;