import {
    Box,
    TextField
} from "@mui/material";

import AppDialog from "../ui/AppDialog";
import AppButton from "../ui/AppButton";
import AppSelect from "../ui/AppSelect";

function BindingFormDialog({

    open,

    onClose,

    editMode,

    formData,

    ruleOptions,

    entityOptions,

    handleChange,

    handleSave

}) {

     const entityTypeOptions = [

        {
            value: "SOCIETY",
            label: "Society"
        },

        {
            value: "TOWER",
            label: "Tower"
        },

        {
            value: "PROPERTY_TYPE",
            label: "Property Type"
        },

        {
            value: "UNIT",
            label: "Unit"
        }
    ];
    
    return (

        <AppDialog

            open={open}

            onClose={onClose}

            title={

                editMode

                    ? "Edit Rule Binding"

                    : "Add Rule Binding"
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
                        "repeat(2,1fr)",

                    gap: 2
                }}
            >

                {/* Rule */}

                <AppSelect

                    label="Maintenance Rule"

                    name="ruleId"

                    value={
                        formData.ruleId || ""
                    }

                    options={
                        ruleOptions
                    }

                    onChange={
                        handleChange
                    }

                />

                {/* Entity Type */}

                <AppSelect

                    label="Entity Type"

                    name="entityType"

                    value={
                        formData.entityType || ""
                    }

                    options={
                        entityTypeOptions
                    }

                    onChange={
                        handleChange
                    }

                />

                {/* Entity */}

                <AppSelect

                    label="Entity"

                    name="entityId"

                    value={
                        formData.entityId || ""
                    }

                    options={
                        entityOptions
                    }

                    onChange={
                        handleChange
                    }

                />

                {/* Effective From */}

                <TextField

                    fullWidth

                    type="date"

                    label="Effective From"

                    name="effectiveFrom"

                    value={
                        formData.effectiveFrom || ""
                    }

                    onChange={
                        handleChange
                    }

                    InputLabelProps={{
                        shrink: true
                    }}
                />

                {/* Effective To */}

                <TextField

                    fullWidth

                    type="date"

                    label="Effective To"

                    name="effectiveTo"

                    value={
                        formData.effectiveTo || ""
                    }

                    onChange={
                        handleChange
                    }

                    InputLabelProps={{
                        shrink: true
                    }}
                />

                {/* Remarks */}

                <TextField

                    fullWidth

                    multiline

                    minRows={3}

                    label="Remarks"

                    name="remarks"

                    value={
                        formData.remarks || ""
                    }

                    onChange={
                        handleChange
                    }

                    sx={{
                        gridColumn:
                            "1 / -1"
                    }}

                />

            </Box>

        </AppDialog>

    );

}

export default BindingFormDialog;