import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Divider
} from "@mui/material";

function BillCard({

    flat,

    bill,

    selected,

    onClick

}) {

    const outstanding =
        bill?.outstandingAmount ?? 0;

    const received =
        bill?.receivedAmount ?? 0;

    const total =
        bill?.totalAmount ?? 0;

    const status =
        bill?.status ?? "NOT GENERATED";

    const chipColor =

        status === "PAID"

            ? "success"

            : status === "PARTIAL"

                ? "warning"

                : status === "PENDING"

                    ? "error"

                    : "default";

    return (

        <Card

            onClick={onClick}

            sx={{

                cursor: "pointer",

                border:

                    selected

                        ? "2px solid #1976d2"

                        : "1px solid #e5e7eb",

                transition: ".25s",

                "&:hover": {

                    transform:

                        "translateY(-2px)",

                    boxShadow: 4
                }

            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    {flat.flatNo}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {bill?.residentName ?? "Vacant"}
                </Typography>

                <Divider
                    sx={{ my: 1.5 }}
                />

                <Stack
                    spacing={0.5}
                >

                    <Typography
                        variant="body2"
                    >
                        Bill :
                        ₹ {total.toLocaleString()}
                    </Typography>

                    <Typography
                        variant="body2"
                    >
                        Paid :
                        ₹ {received.toLocaleString()}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="error.main"
                        fontWeight={700}
                    >
                        Due :
                        ₹ {outstanding.toLocaleString()}
                    </Typography>

                </Stack>

                <Chip

                    label={status}

                    color={chipColor}

                    size="small"

                    sx={{
                        mt: 2
                    }}

                />

            </CardContent>

        </Card>

    );

}

export default BillCard;