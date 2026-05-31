import {
    Box,
    TextField,
    MenuItem,
} from "@mui/material";

import AppDialog from "../ui/AppDialog";
import AppButton from "../ui/AppButton";

function TowerForm({

    open,

    onClose,

    editMode,

    formData,

    handleChange,

    handleSave,

}) {

    return (

        <AppDialog

            open={open}

            onClose={onClose}

            title={
                editMode
                    ? "Edit Tower"
                    : "Add Tower"
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

                <TextField
                    fullWidth
                    label="Tower Name"
                    name="towerName"
                    value={
                        formData.towerName || ""
                    }
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Total Floors"
                    name="totalFloors"
                    value={
                        formData.totalFloors || ""
                    }
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    value={
                        formData.status || ""
                    }
                    onChange={handleChange}
                >

                    <MenuItem value="Active">
                        Active
                    </MenuItem>

                    <MenuItem value="Inactive">
                        Inactive
                    </MenuItem>

                </TextField>

            </Box>

        </AppDialog>

    );

}

export default TowerForm;