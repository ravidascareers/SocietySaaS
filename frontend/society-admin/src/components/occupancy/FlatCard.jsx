import {
    Box,
    Typography,
    Chip,
    Avatar
} from "@mui/material";

import AppCard from "../ui/AppCard";

import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DoorFrontIcon from "@mui/icons-material/DoorFront";

import ActionChip from "../ui/ActionChip";

function FlatCard({

    flat,

    occupancy,

    selected = false,

    onClick

}) {

    const occupied =
        !!occupancy;

    return (

        <AppCard

            onClick={onClick}

            sx={{

                cursor: "pointer",

                minHeight: 170,

                background:
                    selected
                        ? "#eff6ff"
                        : "#ffffff",

                border:

                    selected

                        ? "3px solid #2563eb"

                        : "1px solid #e5e7eb",

                borderLeft:

                    occupied

                        ? "5px solid #2563eb"

                        : "5px solid #d1d5db",

                transition:
                    "all .2s ease",

                "&:hover": {

                    transform:
                        "translateY(-3px)",

                    boxShadow:
                        "0 12px 20px rgba(0,0,0,.08)"
                }
            }}
        >

            {/* HEADER */}

            <Box
                sx={{

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    mb: 1
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <Avatar

                        sx={{

                            width: 26,

                            height: 26,

                            bgcolor:

                                occupied

                                    ? "#dcfce7"

                                    : "#f1f5f9",

                            color:

                                occupied

                                    ? "#15803d"

                                    : "#64748b"
                        }}
                    >

                        <DoorFrontIcon
                            sx={{
                                fontSize: 14
                            }}
                        />

                    </Avatar>

                    <Typography
                        fontWeight={700}
                        fontSize={18}
                    >
                        {flat.flatNo}
                    </Typography>

                </Box>

                <Chip

                    size="small"

                    label={
                        occupied
                            ? "Living Here"
                            : "Ready To Move In"
                    }

                    color={
                        occupied
                            ? "success"
                            : "default"
                    }
                />

            </Box>

            {/* RESIDENT */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1
                }}
            >

                <Avatar

                    sx={{

                        width: 36,

                        height: 36,

                        bgcolor:

                            occupied

                                ? "#2563eb"

                                : "#f1f5f9",

                        color:

                            occupied

                                ? "#ffffff"

                                : "#64748b"
                    }}
                >

                    {
                        occupied

                            ? <PersonIcon fontSize="small" />

                            : <HomeIcon fontSize="small" />
                    }

                </Avatar>

                <Box>

                    <Typography
                        sx={{
                            fontWeight: 600,
                            lineHeight: 1.2
                        }}
                    >
                        {
                            occupied

                                ? occupancy.residentName

                                : "Available Home"
                        }
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 11,
                            color: "#64748b"
                        }}
                    >

                        {
                            occupied

                                ? `Since ${new Date(
                                    occupancy.startDate
                                ).toLocaleDateString(
                                    "en-IN",
                                    {
                                        month: "short",
                                        year: "numeric"
                                    }
                                )}`

                                : "Ready To Move In"
                        }

                    </Typography>

                </Box>

            </Box>

            {/* OCCUPANCY TYPE */}

            <Box
                sx={{
                    mt: 1,
                    mb: 1
                }}
            >

                <ActionChip

                    label={

                        occupancy?.occupancyType === "OWNER"

                            ? "Home Owner"

                            : occupancy?.occupancyType === "TENANT"

                                ? "Resident Tenant"

                                : ""
                    }

                    type={

                        occupancy?.occupancyType === "OWNER"

                            ? "primary"

                            : occupancy?.occupancyType === "TENANT"

                                ? "warning"

                                : "default"
                    }
                />

            </Box>

            {/* FOOTER */}

            <Box
                sx={{

                    display: "flex",

                    justifyContent:
                        "space-between",

                    mt: "auto"
                }}
            >

                <Typography
                    sx={{
                        fontSize: 11,
                        color: "#64748b"
                    }}
                >
                    {
                        flat.flatTypeName
                    }
                </Typography>

                <Typography
                    sx={{
                        fontSize: 11,
                        color: "#64748b"
                    }}
                >
                    {
                        flat.areaSqft
                    } SqFt
                </Typography>

            </Box>

        </AppCard>

    );

}

export default FlatCard;