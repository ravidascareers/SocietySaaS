import {
    Box,
    Typography,
} from "@mui/material";

import AppDialog from "../ui/AppDialog";

import AppButton from "../ui/AppButton";

import AppDataGrid from "../ui/AppDataGrid";

import ActionChip from "../ui/ActionChip";

function ResidentHistoryDialog({

    open,

    onClose,

    historyData,

}) {

    const columns = [

        {
            field: "type",
            headerName: "Type",
            flex: 1,

            renderCell: (params) => (

                <ActionChip

                    label={
                        params.value
                    }

                    type={
                        params.value ===
                            "Payment"
                            ? "success"
                            : "primary"
                    }
                />

            ),
        },

        {
            field: "description",
            headerName: "Description",
            flex: 2,
        },

        {
            field: "amount",
            headerName: "Amount",
            flex: 1,

            renderCell: (params) => (
                <Typography
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    ₹ {params.value}
                </Typography>
            ),
        },

        {
            field: "entryDate",
            headerName: "Date",
            flex: 1,

            renderCell: (params) =>
                params.value?.split(
                    "T"
                )[0],
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,

            renderCell: (params) => (

                <ActionChip

                    label={
                        params.value
                    }

                    type={
                        params.value ===
                            "Paid"
                            ? "success"
                            : "warning"
                    }
                />

            ),
        },

    ];

    return (

        <AppDialog

            open={open}

            onClose={onClose}

            title="Resident History"

            maxWidth="md"

            actions={

                <AppButton
                    onClick={onClose}
                >
                    Close
                </AppButton>

            }
        >

            <Box
                sx={{
                    height: 450,
                    minHeight: 0,
                    display: "flex",
                    flex: 1,
                }}
            >

                <AppDataGrid

                    rows={historyData}

                    columns={columns}

                    getRowId={(row) =>
                        row.id
                    }
                />

            </Box>

        </AppDialog>

    );

}

export default ResidentHistoryDialog;