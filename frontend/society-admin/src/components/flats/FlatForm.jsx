import {
    Box,
    TextField,
    MenuItem,
} from "@mui/material";

import AppDialog from "../ui/AppDialog";
import AppButton from "../ui/AppButton";
import AppSelect from "../ui/AppSelect"
function FlatForm({

    open,

    onClose,

    editMode,

    formData,

    towerOptions,

    flatTypeOptions,

    handleChange,

    handleSave,

}) {

    return (

        <AppDialog

            open={open}

            onClose={onClose}

            title={
                editMode
                    ? "Edit Flat"
                    : "Add Flat"
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

                    value={
                        formData.towerId
                    }

                    options={
                        towerOptions
                    }

                    onChange={
                        handleChange
                    }

                />

                <TextField
                    fullWidth
                    label="Flat No"
                    name="flatNo"
                    value={formData.flatNo || ""}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Floor No"
                    name="floorNo"
                    value={formData.floorNo || ""}
                    onChange={handleChange}
                />

                <AppSelect

                    label="Flat Type"

                    name="flatTypeId"

                    value={
                        formData.flatTypeId||""
                    }

                    options={
                        flatTypeOptions
                    }

                    onChange={
                        handleChange
                    }

                />

                <TextField
                    fullWidth
                    type="number"
                    label="Area Sq Ft"
                    name="areaSqft"
                    value={formData.areaSqft || ""}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Maintenance Rate"
                    name="maintenanceRate"
                    value={
                        formData.maintenanceRate || ""
                    }
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    value={formData.status || ""}
                    onChange={handleChange}
                >

                    <MenuItem value="Occupied">
                        Occupied
                    </MenuItem>

                    <MenuItem value="Vacant">
                        Vacant
                    </MenuItem>

                </TextField>

            </Box>

        </AppDialog>

    );

}

export default FlatForm;