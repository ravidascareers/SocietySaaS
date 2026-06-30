import {
    Box,
    Button,
    MenuItem,
    TextField
} from "@mui/material";

import { useState } from "react";

function BillingToolbar({
    onGenerate
}) {

    const today = new Date();

    const [billMonth, setBillMonth] =
        useState(
            today.getMonth() + 1
        );

    const [billYear, setBillYear] =
        useState(
            today.getFullYear()
        );

    return (

        <Box
            sx={{
                display: "flex",
                gap: 2,
                mb: 2,
                alignItems: "center",
                flexWrap: "wrap"
            }}
        >

            <TextField
                select
                label="Month"
                size="small"
                value={billMonth}
                onChange={(e) =>
                    setBillMonth(
                        Number(e.target.value)
                    )
                }
                sx={{ width: 140 }}
            >
                {
                    Array.from(
                        { length: 12 },
                        (_, i) => (
                            <MenuItem
                                key={i + 1}
                                value={i + 1}
                            >
                                {new Date(
                                    2000,
                                    i
                                ).toLocaleString(
                                    "default",
                                    {
                                        month: "long"
                                    }
                                )}
                            </MenuItem>
                        ))
                }
            </TextField>

            <TextField
                label="Year"
                size="small"
                type="number"
                value={billYear}
                onChange={(e) =>
                    setBillYear(
                        Number(e.target.value)
                    )
                }
                sx={{ width: 120 }}
            />

            <Button
                variant="contained"
                onClick={() =>
                    onGenerate({
                        billMonth,
                        billYear
                    })
                }
            >
                Generate Bills
            </Button>

        </Box>

    );

}

export default BillingToolbar;