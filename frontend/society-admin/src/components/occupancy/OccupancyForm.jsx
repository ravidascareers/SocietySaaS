import {
    Box,
    TextField,
    MenuItem
} from "@mui/material";

import AppDialog from "../ui/AppDialog";
import AppButton from "../ui/AppButton";
import AppDatePicker from "../ui/AppDatePicker";
import AppSelect from "../ui/AppSelect";

function OccupancyForm({

    open,

    onClose,

    editMode,

    formData,

    towerOptions,

    flatOptions,

    residentOptions,

    handleChange,

    handleSave

}) {

    return (

        <AppDialog

            open={open}

            onClose={onClose}

            title={
                editMode
                    ? "Edit Occupancy"
                    : "Add Occupancy"
            }

            maxWidth="sm"

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
                        Save
                    </AppButton>
                </>
            }
        >

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2, 1fr)",
                    gap: 2,
                }}
            >

                <AppSelect
                    label="Tower"
                    name="towerId"
                    value={formData.towerId}
                    options={towerOptions}
                    onChange={handleChange}
                />

                <AppSelect
                    label="Flat"
                    name="flatId"
                    value={formData.flatId}
                    options={flatOptions}
                    onChange={handleChange}
                />

                <AppSelect
                    label="Resident"
                    name="residentId"
                    value={formData.residentId}
                    options={residentOptions}
                    onChange={handleChange}
                />

                <TextField
                    select
                    fullWidth
                    label="Occupancy Type"
                    name="occupancyType"
                    value={
                        formData.occupancyType || ""
                    }
                    onChange={handleChange}
                >

                    <MenuItem value="OWNER">
                        Owner
                    </MenuItem>

                    <MenuItem value="TENANT">
                        Tenant
                    </MenuItem>

                </TextField>

                <AppDatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(value) =>

                        handleChange({

                            target: {

                                name: "startDate",

                                value

                            }

                        })

                    }
                />

                <TextField
                    label="Remarks"
                    name="remarks"
                    value={
                        formData.remarks || ""
                    }
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{
                        gridColumn:
                            "span 2"
                    }}
                />

            </Box>

        </AppDialog>

    );
}

export default OccupancyForm;