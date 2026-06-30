import {
    Box,
    Typography,
    Divider,
    Button,
    Stack
} from "@mui/material";

function BillDetailPanel({

    bill

}) {

    if (!bill) {

        return null;

    }

    return (

        <Box
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                p: 2,
                bgcolor: "#fff",
                height: "100%"
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                Financial Details
            </Typography>

            <Divider
                sx={{ my: 2 }}
            />

            <Stack
                spacing={1}
            >

                <Typography>

                    <b>Bill No :</b>

                    {bill.billNo}

                </Typography>

                <Typography>

                    <b>Resident :</b>

                    {bill.residentName}

                </Typography>

                <Typography>

                    <b>Flat :</b>

                    {bill.flatNo}

                </Typography>

                <Typography>

                    <b>Tower :</b>

                    {bill.towerName}

                </Typography>

                <Typography>

                    <b>Bill Month :</b>

                    {bill.billMonth}/{bill.billYear}

                </Typography>

                <Typography>

                    <b>Total :</b>

                    ₹ {bill.totalAmount?.toLocaleString()}

                </Typography>

                <Typography>

                    <b>Received :</b>

                    ₹ {bill.receivedAmount?.toLocaleString()}

                </Typography>

                <Typography
                    color="error.main"
                    fontWeight={700}
                >

                    Outstanding :

                    ₹ {bill.outstandingAmount?.toLocaleString()}

                </Typography>

                <Typography>

                    <b>Status :</b>

                    {bill.status}

                </Typography>

            </Stack>

            <Divider
                sx={{ my: 2 }}
            />

            <Stack
                spacing={1}
            >

                <Button
                    variant="contained"
                    fullWidth
                >
                    Invoice PDF
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                >
                    Receive Payment
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                >
                    Receipt PDF
                </Button>

            </Stack>

        </Box>

    );

}

export default BillDetailPanel;