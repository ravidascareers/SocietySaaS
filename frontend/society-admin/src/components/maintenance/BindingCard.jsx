import {
    Box,
    Typography,
    Chip,
    Avatar,
    IconButton
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AppCard from "../ui/AppCard";

function BindingCard({

    binding,

    onEdit,

    onDelete

}) {

    return (

        <AppCard

            sx={{

                borderLeft:
                    "5px solid #2563eb",

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

                    mb: 2
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
                            width: 30,
                            height: 30,
                            bgcolor: "#dbeafe",
                            color: "#2563eb"
                        }}
                    >
                        <LinkIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                    </Avatar>

                    <Typography
                        fontWeight={700}
                    >
                        {binding.ruleName}
                    </Typography>

                </Box>

                <Chip

                    size="small"

                    label={
                        binding.isActive
                            ? "Active"
                            : "Inactive"
                    }

                    color={
                        binding.isActive
                            ? "success"
                            : "default"
                    }
                />

            </Box>

            {/* ENTITY */}

            <Typography

                sx={{
                    fontSize: 12,
                    color: "#64748b"
                }}
            >
                Entity Type
            </Typography>

            <Typography
                fontWeight={600}
                mb={2}
            >
                {binding.entityType}
            </Typography>

            <Typography

                sx={{
                    fontSize: 12,
                    color: "#64748b"
                }}
            >
                Applied To
            </Typography>

            <Typography
                fontWeight={600}
                mb={2}
            >
                {binding.entityName}
            </Typography>

            {/* DATES */}

            <Typography

                sx={{
                    fontSize: 12,
                    color: "#64748b"
                }}
            >
                Effective From
            </Typography>

            <Typography mb={2}>
                {
                    new Date(
                        binding.effectiveFrom
                    ).toLocaleDateString(
                        "en-IN"
                    )
                }
            </Typography>

            {/* FOOTER */}

            <Box

                sx={{

                    display: "flex",

                    justifyContent:
                        "flex-end",

                    gap: 1
                }}
            >

                <IconButton

                    size="small"

                    onClick={() =>
                        onEdit(binding)
                    }
                >
                    <EditIcon />
                </IconButton>

                <IconButton

                    size="small"

                    onClick={() =>
                        onDelete(binding)
                    }
                >
                    <DeleteIcon />
                </IconButton>

            </Box>

        </AppCard>

    );

}

export default BindingCard;