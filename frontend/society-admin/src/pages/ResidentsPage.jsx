import {
    Box,
    Typography,
} from "@mui/material";

import { getTowers } from "../services/towerService";

import { getFlats } from "../services/flatService";

import {
    getTenantId,
    getUserId
} from "../utils/session";

import {
    getResidents,
    getResidentById,
    addResident,
    updateResident,
    deleteResident,
} from "../services/residentService";


import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";

import AppPage from "../components/ui/AppPage";
import AppCard from "../components/ui/AppCard";
import AppHeader from "../components/ui/AppHeader";
import AppButton from "../components/ui/AppButton";
import AppDataGrid from "../components/ui/AppDataGrid";
import ActionChip from "../components/ui/ActionChip";
import AppDialog from "../components/ui/AppDialog";
import SummaryCard from "../components/ui/SummaryCard";

import ResidentForm from "../components/residents/ResidentForm";
import ResidentHistoryDialog from "../components/residents/ResidentHistoryDialog";

function ResidentsPage() {

    const emptyResident = {

        residentId: 0,

        towerId: "",

        flatId: "",

        residentName: "",

        residentType: "Owner",

        mobileNo: "",

        emailId: "",

        dob: null,

        gender: "",

        moveInDate: null,

        moveOutDate: null,

        isActive: true,

        addressLine1: "",
        addressLine2: "",
        city: "",
        stateName: "",
        pincode: "",
        country: "",

        spouseName: "",
        spouseMobile: "",
        familyMembers: "",
        childrenCount: null,

        emergencyContact: "",
        emergencyMobile: "",

        parkingSlot: "",
        vehicleNumber: "",
        vehicleType: "",

        twoWheelerCount: null,
        fourWheelerCount: null,

        aadhaarNumber: "",
        panNumber: "",
        agreementNumber: "",
        voterId: "",
        remarks: "",

    };

    const [open, setOpen] = useState(false);

    const [residents, setResidents] = useState([]);

    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({ ...emptyResident });

    const handleChange = (e) => {

        const { name, value } =
            e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

        if (
            name === "towerId"
        ) {

            const filteredFlats =

                allFlats.filter(
                    x =>

                        (x.TOWER_ID ??
                            x.towerId)

                        === Number(value)
                );

            setFlatOptions(

                filteredFlats.map(
                    x => ({

                        value:
                            x.FLAT_ID ??
                            x.flatId,

                        label:
                            x.FLAT_NO ??
                            x.flatNo

                    })
                )
            );

        }

    };

    const handleSave = async () => {

        try {

            if (
                formData.residentId > 0
            ) {

                await updateResident(
                    formData.residentId,
                    {
                        ...formData,
                        tenantId: getTenantId(),
                        ModifiedBy: getUserId(),
                    }
                );

            }
            else {
                await addResident({
                    ...formData,
                    tenantId: getTenantId(),
                    createdBy: getUserId(),
                });

            }

            await loadResidents();

            setOpen(false);

        }
        catch (error) {

            console.error(
                error
            );

        }

    };

    const handleDelete = async (residentId) => {

        try {

            await deleteResident(
                residentId
            );

            await loadResidents();

        }
        catch (error) {

            console.error(
                error
            );

        }

    };

    const [towerOptions,
        setTowerOptions]
        =
        useState([]);

    const [flatOptions,
        setFlatOptions]
        =
        useState([]);

    const [allFlats,
        setAllFlats]
        =
        useState([]);

    useEffect(() => {

        loadResidents();

        loadTowers();

        loadFlats();

    }, []);

    const loadResidents = async () => {
        try {

            const response =
                await getResidents();

            setResidents(
                response.data
            );

        }
        catch (error) {

            console.error(
                error
            );

        }

    };

    const loadTowers = async () => {

        try {

            const response =
                await getTowers();

            setTowerOptions(

                response.data.map(
                    x => ({

                        value:
                            x.TOWER_ID ??
                            x.towerId,

                        label:
                            x.TOWER_NAME ??
                            x.towerName

                    })
                )
            );

        }
        catch (error) {

            console.error(
                error
            );

        }

    };

    const loadFlats = async () => {

        try {

            const response =
                await getFlats();

            setAllFlats(
                response.data
            );

        }
        catch (error) {

            console.error(
                error
            );

        }

    };


    const columns = [

        {
            field: "residentName",
            headerName: "Resident Name",
            flex: 1,
        },

        {
            field: "mobileNo",
            headerName: "Mobile No",
            flex: 1.5,
        },

        {
            field: "residentType",
            headerName: "Type",
            flex: 1.5,
        },

        {
            field: "towerName",
            headerName: "Tower",
            flex: 1,
        },

        {
            field: "flatNo",
            headerName: "Flat No",
            flex: 1,
        },

        {
            field: "isActive",
            headerName: "Status",
            flex: 1,
        },

        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,

            sortable: false,

            renderCell: (params) => (

                <Box
                    sx={{
                        display: "flex",
                        gap: 0.3,
                        alignItems: "center",
                    }}
                >

                    <ActionChip
                        icon={<EditIcon />}

                        label="Edit"

                        type="primary"

                        onClick={async () => {

                            try {

                                const response =
                                    await getResidentById(
                                        params.row.residentId
                                    );

                                const resident = response.data[0];

                                const filteredFlats =

                                    allFlats.filter(
                                        x =>

                                            (x.towerId ??
                                                x.TOWER_ID)

                                            === Number(
                                                resident.towerId
                                            )
                                    );

                                setFlatOptions(

                                    filteredFlats.map(
                                        x => ({

                                            value:
                                                x.flatId ??
                                                x.FLAT_ID,

                                            label:
                                                x.flatNo ??
                                                x.FLAT_NO

                                        })
                                    )

                                );



                                setFormData(resident);

                                setEditMode(true);

                                setOpen(true);

                            }
                            catch (error) {

                                console.error(error);

                            }

                        }}
                    />

                    <ActionChip
                        icon={<HistoryIcon />}
                        label="History"

                        type="warning"

                        onClick={() =>
                            loadHistory(
                                params.row.residentId
                            )
                        }
                    />

                </Box>

            ),
        },
    ];



    return (
        <MainLayout>

            <AppPage>

                <AppHeader
                    title="Residents"
                    action={

                        <AppButton
                            onClick={() => {

                                setEditMode(false);

                                setFormData({
                                    ...emptyResident
                                });

                                setOpen(true);

                            }}
                        >
                            Add Resident
                        </AppButton>

                    }
                />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3, 1fr)",
                        gap: 2,
                        mb: 0.5,
                    }}
                >

                    <SummaryCard
                        title="Residents"
                        value={residents.length}
                    />

                    <SummaryCard
                        title="Owners"
                        value={
                            residents.filter(
                                x => x.residentType === "Owner"
                            ).length
                        }
                    />

                    <SummaryCard
                        title="Tenants"
                        value={
                            residents.filter(
                                x => x.residentType === "Tenant"
                            ).length
                        }
                    />

                </Box>

                {/* GRID */}

                <AppCard>

                    <AppDataGrid
                        rows={residents}
                        columns={columns}
                        getRowId={(row) =>
                            row.residentId
                        }
                    />

                </AppCard>

                {/* ADD / EDIT DIALOG */}

                <ResidentForm

                    open={open}

                    onClose={() =>
                        setOpen(false)
                    }

                    editMode={editMode}

                    formData={formData}

                    handleChange={handleChange}

                    handleSave={handleSave}

                    towerOptions={towerOptions}

                    flatOptions={flatOptions}
                />


            </AppPage>

        </MainLayout>
    );
}

export default ResidentsPage;