import {
    Box,
    Typography,
    Chip,
    Avatar,
    IconButton
}
from "@mui/material";

import GavelIcon
from "@mui/icons-material/Gavel";

import LockIcon
from "@mui/icons-material/Lock";

import EditIcon
from "@mui/icons-material/Edit";

import DeleteIcon
from "@mui/icons-material/Delete";

import CurrencyRupeeIcon
from "@mui/icons-material/CurrencyRupee";

import AppCard
from "../ui/AppCard";

import ActionChip
from "../ui/ActionChip";

function RuleCard({

    rule,

    onEdit,

    onDelete

}) {

    const isArea =

        rule.calculationMethod ===
        "AREA";

    return (

        <AppCard

            sx={{

                cursor: "pointer",

                minHeight: 220,

                border:

                    "1px solid #e5e7eb",

                borderLeft:

                    isArea

                        ? "5px solid #2563eb"

                        : "5px solid #f59e0b",

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

                            bgcolor:

                                isArea

                                    ? "#dbeafe"

                                    : "#fef3c7",

                            color:

                                isArea

                                    ? "#2563eb"

                                    : "#d97706"
                        }}
                    >

                        <GavelIcon
                            sx={{
                                fontSize: 16
                            }}
                        />

                    </Avatar>

                    <Typography
                        fontWeight={700}
                        fontSize={18}
                    >
                        {rule.ruleName}
                    </Typography>

                </Box>

                <Chip

                    size="small"

                    label={
                        rule.isActive
                            ? "Active"
                            : "Inactive"
                    }

                    color={
                        rule.isActive
                            ? "success"
                            : "default"
                    }
                />

            </Box>

            {/* METHOD */}

            <Box
                sx={{
                    mb: 2
                }}
            >

                <ActionChip

                    label={
                        isArea
                            ? "Area Based"
                            : "Fixed Amount"
                    }

                    type={
                        isArea
                            ? "primary"
                            : "warning"
                    }
                />

            </Box>

            {/* HERO */}

            <Box
                sx={{
                    mb: 2
                }}
            >

                <Typography

                    sx={{

                        fontSize: 28,

                        fontWeight: 700,

                        lineHeight: 1
                    }}
                >

                    {
                        isArea

                            ? `₹${rule.ratePerSqft}`

                            : `₹${rule.fixedAmount}`
                    }

                </Typography>

                <Typography

                    sx={{

                        fontSize: 11,

                        color: "#64748b"
                    }}
                >

                    {
                        isArea

                            ? "Per SqFt"

                            : "Fixed Charge"
                    }

                </Typography>

            </Box>

            {/* RULE METADATA */}

            <Box
                sx={{

                    display: "flex",

                    flexWrap: "wrap",

                    gap: 1,

                    mb: 2
                }}
            >

                <ActionChip
                    label={
                        `${rule.graceDays} Days Grace`
                    }
                    type="success"
                />

                <ActionChip
                    label={
                        `${rule.penaltyPercent}% Penalty`
                    }
                    type="warning"
                />

                <ActionChip
                    label={
                        `${rule.interestPercent}% Interest`
                    }
                    type="primary"
                />

            </Box>

            {/* FOOTER */}

            <Box

                sx={{

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center"

                    
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    {

                        rule.isLocked

                            ?

                            <Chip

                                size="small"

                                icon={<LockIcon />}

                                label="Locked"

                                color="error"
                            />

                            :

                            <Chip

                                size="small"

                                label={
                                    rule.interestMode
                                }

                                variant="outlined"
                            />
                    }

                </Box>

                <Box>

                    <IconButton

                        size="small"

                        onClick={() =>
                            onEdit(rule)
                        }

                        disabled={
                            rule.isLocked
                        }
                    >

                        <EditIcon />

                    </IconButton>

                    <IconButton

                        size="small"

                        onClick={() =>
                            onDelete(rule)
                        }

                        disabled={
                            rule.isLocked
                        }
                    >

                        <DeleteIcon />

                    </IconButton>

                </Box>

            </Box>

        </AppCard>

    );

}

export default RuleCard;