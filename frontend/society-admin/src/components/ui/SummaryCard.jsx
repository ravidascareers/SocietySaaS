import {
    Typography,
} from "@mui/material";

import AppCard from "./AppCard";

function SummaryCard({

    title = "",

    value = "",

    bgColor = "#ffffff",

}) {

    return (

        <AppCard
            sx={{
                backgroundColor:
                    bgColor,
            }}
        >

            <Typography
                color="text.secondary"
            >
                {title}
            </Typography>

            <Typography
                variant="h5"

                sx={{
                    fontWeight: 700,
                    mt: 1,
                }}
            >
                {value}
            </Typography>

        </AppCard>

    );

}

export default SummaryCard;