import {
    Box,
    TextField,
    Typography
}
from "@mui/material";

import AppDialog
from "../ui/AppDialog";

import AppButton
from "../ui/AppButton";

import AppSelect
from "../ui/AppSelect";

function RuleFormDialog({

    open,

    onClose,

    editMode,

    formData,

    handleChange,

    handleSave

}) {

    return (

        <AppDialog

            open={open}

            onClose={onClose}

            title={
                editMode
                    ? "Edit Rule"
                    : "Add Rule"
            }

            maxWidth="md"

            actions={

                <>

                    <AppButton
                        onClick={onClose}
                    >
                        Cancel
                    </AppButton>

                    <AppButton
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save Rule
                    </AppButton>

                </>

            }
        >

            {/* RULE INFO */}

            <Typography
                fontWeight={700}
                sx={{ mb: 2 }}
            >
                Rule Information
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2,1fr)",
                    gap: 2
                }}
            >

                <TextField

                    fullWidth

                    label="Rule Name"

                    name="ruleName"

                    value={
                        formData.ruleName || ""
                    }

                    onChange={
                        handleChange
                    }
                />

                <AppSelect

                    label="Calculation Method"

                    name="calculationMethod"

                    value={
                        formData.calculationMethod || ""
                    }

                    options={[

                        {
                            value: "AREA",
                            label: "Area Based"
                        },

                        {
                            value: "FIXED",
                            label: "Fixed Amount"
                        }
                    ]}

                    onChange={
                        handleChange
                    }
                />

                {

                    formData.calculationMethod ===
                    "AREA"

                    &&

                    <TextField

                        fullWidth

                        type="number"

                        label="Rate Per SqFt"

                        name="ratePerSqft"

                        value={
                            formData.ratePerSqft || ""
                        }

                        onChange={
                            handleChange
                        }
                    />
                }

                {

                    formData.calculationMethod ===
                    "FIXED"

                    &&

                    <TextField

                        fullWidth

                        type="number"

                        label="Fixed Amount"

                        name="fixedAmount"

                        value={
                            formData.fixedAmount || ""
                        }

                        onChange={
                            handleChange
                        }
                    />
                }

            </Box>

            {/* BILLING CONFIG */}

            <Typography
                fontWeight={700}
                sx={{
                    mt: 4,
                    mb: 2
                }}
            >
                Billing Configuration
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(4,1fr)",
                    gap: 2
                }}
            >

                <TextField

                    fullWidth

                    type="number"

                    label="Grace Days"

                    name="graceDays"

                    value={
                        formData.graceDays || ""
                    }

                    onChange={
                        handleChange
                    }
                />

                <TextField

                    fullWidth

                    type="number"

                    label="Penalty %"

                    name="penaltyPercent"

                    value={
                        formData.penaltyPercent || ""
                    }

                    onChange={
                        handleChange
                    }
                />

                <TextField

                    fullWidth

                    type="number"

                    label="Interest %"

                    name="interestPercent"

                    value={
                        formData.interestPercent || ""
                    }

                    onChange={
                        handleChange
                    }
                />

                <AppSelect

                    label="Interest Mode"

                    name="interestMode"

                    value={
                        formData.interestMode || ""
                    }

                    options={[

                        {
                            value: "COMPOUND",
                            label: "Compound"
                        },

                        {
                            value: "SIMPLE",
                            label: "Simple"
                        }
                    ]}

                    onChange={
                        handleChange
                    }
                />

            </Box>

            {/* REMARKS */}

            <Typography
                fontWeight={700}
                sx={{
                    mt: 4,
                    mb: 2
                }}
            >
                Remarks
            </Typography>

            <TextField

                fullWidth

                multiline

                rows={3}

                label="Remarks"

                name="remarks"

                value={
                    formData.remarks || ""
                }

                onChange={
                    handleChange
                }
            />

        </AppDialog>

    );

}

export default RuleFormDialog;