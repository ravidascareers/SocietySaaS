import { Chip } from "@mui/material";

const colorMap = {

    primary: {
        bg: "#dbeafe",
        color: "#1d4ed8",
    },

    success: {
        bg: "#dcfce7",
        color: "#166534",
    },

    warning: {
        bg: "#fef3c7",
        color: "#92400e",
    },

    danger: {
        bg: "#fee2e2",
        color: "#991b1b",
    },

    default: {
        bg: "#f3f4f6",
        color: "#374151",
    },
};

function ActionChip({

    label,

    type = "default",

    onClick = null,

    sx = {},
}) {

    const selected =
        colorMap[type] ||
        colorMap.default;

    return (

        <Chip

            label={label}

            clickable={!!onClick}

            onClick={onClick}

            size="small"

            sx={{

                borderRadius: 2,

                fontWeight: 600,

                backgroundColor:
                    selected.bg,

                color:
                    selected.color,

                height: 24,
                fontSize:"12px",

                "& .MuiChip-label": {
                    px: 1.2,
                },

                ...sx,
            }}
        />

    );

}

export default ActionChip;