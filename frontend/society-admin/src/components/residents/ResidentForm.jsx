import {
    Box,
    TextField,
    Tabs,
    Tab,
    Grid,
    MenuItem,
    Divider,
    Avatar
} from "@mui/material";

import { useState } from "react";
import AppDialog from "../ui/AppDialog";
import AppButton from "../ui/AppButton";

import AppDatePicker from "../ui/AppDatePicker";
import AppSelect from "../ui/AppSelect";

function ResidentForm({

    open,

    onClose,

    editMode,

    formData,

    towerOptions,

    flatOptions,

    handleChange,

    handleSave,



}) {

    const [tabValue, setTabValue] =
        useState(0);

    return (

        <AppDialog


            open={open}

            onClose={onClose}

            title={
                editMode
                    ? "Edit Resident"
                    : "Add Resident"
            }

            maxWidth="sm"

            scrollable={true}

            bodyHeight="60vh"

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
            <Tabs

                value={tabValue}

                onChange={(e, newValue) =>
                    setTabValue(newValue)
                }

                variant="scrollable"

                scrollButtons="auto"

                sx={{
                    mb: 2,
                    borderBottom:
                        "1px solid #eef1f6",
                }}
            >

                <Tab label="Basic Info" />

                <Tab label="Address" />

                <Tab label="Family" />

                <Tab label="Parking" />

                <Tab label="Documents" />

            </Tabs>


            {/* BASIC INFO TAB */}
            {tabValue === 0 && (

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

                    <AppSelect
                        label="Flat"
                        name="flatId"
                        value={
                            formData.flatId
                        }
                        options={
                            flatOptions
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <TextField
                        label="Resident Name"
                        name="residentName"
                        value={formData.residentName || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        select
                        label="Resident Type"
                        name="residentType"
                        value={formData.residentType || ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="Owner">Owner</MenuItem>
                        <MenuItem value="Tenant">Tenant</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        select
                        label="Gender"
                        name="gender"
                        value={formData.gender || ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>

                    <AppDatePicker
                        label="Date Of Birth"
                        value={formData.dob}
                        onChange={(value) =>

                            handleChange({
                                target: {
                                    name: "dob",
                                    value,
                                },
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        label="Mobile No"
                        name="mobileNo"
                        value={formData.mobileNo || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Alternate Mobile"
                        name="alternateMobile"
                        value={formData.alternateMobile || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="emailId"
                        value={formData.emailId || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        select
                        label="Blood Group"
                        name="bloodGroup"
                        value={formData.bloodGroup || ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        select
                        label="Status"
                        name="status"
                        value={formData.status || ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        label="Occupation"
                        name="occupation"
                        value={formData.occupation || ""}
                        onChange={handleChange}
                    />

                    <AppDatePicker
                        label="Move In Date"
                        value={formData.moveInDate}
                        onChange={(value) =>

                            handleChange({
                                target: {
                                    name: "moveInDate",
                                    value,
                                },
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        label="Maintenance Amount"
                        name="maintenanceAmount"
                        value={formData.maintenanceAmount || ""}
                        onChange={handleChange}
                    />

                </Box>

            )}


            {/* ADDRESS TAB */}
            {tabValue === 1 && (

                <Box
                    sx={{

                        display: "grid",

                        gridTemplateColumns:
                            "repeat(2, 1fr)",

                        gap: 2,
                    }}
                >

                    <TextField
                        label="Address Line 1"
                        name="addressLine1"
                        value={formData.addressLine1 || ""}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        label="Address Line 2"
                        name="addressLine2"
                        value={formData.addressLine2 || ""}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        label="City"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        label="State"
                        name="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Country"
                        name="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                    />

                </Box>
            )}

            {/* FAMILY TAB */}
            {tabValue === 2 && (

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
                        label="Spouse Name"
                        name="spouseName"
                        value={formData.spouseName || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Spouse Mobile"
                        name="spouseMobile"
                        value={formData.spouseMobile || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Family Members"
                        name="familyMembers"
                        value={formData.familyMembers || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Children Count"
                        name="childrenCount"
                        value={formData.childrenCount || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Emergency Contact"
                        name="emergencyContact"
                        value={formData.emergencyContact || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Emergency Mobile"
                        name="emergencyMobile"
                        value={formData.emergencyMobile || ""}
                        onChange={handleChange}
                    />

                </Box>

            )}

            {/* PARKING TAB */}
            {tabValue === 3 && (

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
                        label="Parking Slot"
                        name="parkingSlot"
                        value={formData.parkingSlot || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Vehicle Number"
                        name="vehicleNumber"
                        value={formData.vehicleNumber || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        select
                        label="Vehicle Type"
                        name="vehicleType"
                        value={formData.vehicleType || ""}
                        onChange={handleChange}
                    >

                        <MenuItem value="Two Wheeler">
                            Two Wheeler
                        </MenuItem>

                        <MenuItem value="Four Wheeler">
                            Four Wheeler
                        </MenuItem>

                        <MenuItem value="Both">
                            Both
                        </MenuItem>

                    </TextField>

                    <TextField
                        fullWidth
                        type="number"
                        label="Two Wheeler Count"
                        name="twoWheelerCount"
                        value={formData.twoWheelerCount || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Four Wheeler Count"
                        name="fourWheelerCount"
                        value={formData.fourWheelerCount || ""}
                        onChange={handleChange}
                    />

                </Box>

            )}

            {/* DOCUMENTS TAB */}
            {tabValue === 4 && (

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
                        label="Aadhaar Number"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="PAN Number"
                        name="panNumber"
                        value={formData.panNumber || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Agreement Number"
                        name="agreementNumber"
                        value={formData.agreementNumber || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Voter ID"
                        name="voterId"
                        value={formData.voterId || ""}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Remarks"
                        name="remarks"
                        value={formData.remarks || ""}
                        onChange={handleChange}
                        sx={{
                            gridColumn: "span 2",
                        }}
                    />

                </Box>

            )}

        </AppDialog>

    );

}

export default ResidentForm;