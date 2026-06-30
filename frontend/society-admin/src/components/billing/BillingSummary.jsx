import { Box } from "@mui/material";
import SummaryCard from "../ui/SummaryCard";

function BillingSummary({ bills }) {

    const totalBills =
        bills.length;

    const totalDemand =
        bills.reduce(
            (sum, x) =>
                sum + (x.totalAmount || 0),
            0
        );

    const totalCollection =
        bills.reduce(
            (sum, x) =>
                sum + (x.receivedAmount || 0),
            0
        );

    const outstanding =
        bills.reduce(
            (sum, x) =>
                sum + (x.outstandingAmount || 0),
            0
        );

    return (

        <Box
            sx={{
                display: "grid",

                gridTemplateColumns:
                    "repeat(4,1fr)",

                gap: 2,

                mb: 2
            }}
        >

            <SummaryCard

                title="Bills"

                value={totalBills}

            />

            <SummaryCard

                title="Demand"

                value={`₹ ${totalDemand.toLocaleString()}`}

            />

            <SummaryCard

                title="Collection"

                value={`₹ ${totalCollection.toLocaleString()}`}

            />

            <SummaryCard

                title="Outstanding"

                value={`₹ ${outstanding.toLocaleString()}`}

            />

        </Box>

    );

}

export default BillingSummary;