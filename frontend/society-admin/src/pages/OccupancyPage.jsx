import { Box } from "@mui/material";

import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import BlockIcon from "@mui/icons-material/Block";

import AppPage from "../components/ui/AppPage";
import AppHeader from "../components/ui/AppHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";
import AppDataGrid from "../components/ui/AppDataGrid";
import ActionChip from "../components/ui/ActionChip";
import SummaryCard from "../components/ui/SummaryCard";

import OccupancyForm from "../components/occupancy/OccupancyForm";

import {
    getOccupancies,
    getOccupancyHistory,
    addOccupancy,
    updateOccupancy,
    vacateOccupancy
} from "../services/occupancyService";

import { getTowers } from "../services/towerService";
import { getFlats } from "../services/flatService";
import { getResidents } from "../services/residentService";

import {
    getTenantId,
    getUserId
} from "../utils/session";

import {
    mapListToCamelCase
} from "../utils/objectMapperUtil";

function OccupanyPage() {

    // STATE VARIABLE
    const emptyOccupancy = {

        occupancyId: 0,

        towerId: "",

        flatId: "",

        residentId: "",

        occupancyType: "OWNER",

        startDate: null,

        remarks: ""
    };

    const [open, setOpen] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [occupancies, setOccupancies] = useState([]);

    const [history, setHistory] = useState([]);

    const [towerOptions, setTowerOptions] = useState([]);

    const [flatOptions, setFlatOptions] = useState([]);

    const [residentOptions, setResidentOptions] = useState([]);

    const [allFlats, setAllFlats] = useState([]);

    const [formData, setFormData] =
        useState({ ...emptyOccupancy });

    // MASTER VARIABLES 
    const loadOccupancies = async () => {

        try {

            const response =
                await getOccupancies();

            console.log(
                "Occupancy API",
                response.data
            );

            setOccupancies(

                mapListToCamelCase(
                    response.data
                )
            );

        }
        catch (error) {

            console.error(error);

        }
    };

    const loadTowers = async () => {

        const response =
            await getTowers();

        setTowerOptions(

            response.data.map(
                x => ({
                    value:
                        x.towerId ??
                        x.TOWER_ID,

                    label:
                        x.towerName ??
                        x.TOWER_NAME
                })
            )
        );
    };

    const loadFlats = async () => {

        const response =
            await getFlats();

        const flats =
            mapListToCamelCase(
                response.data
            );

        setAllFlats(flats);
    };

    const loadResidents = async () => {

        try {

            const response =
                await getResidents();

            const residents =
                response.data;

            setResidentOptions(

                residents

                    .filter(
                        x => x.isActive
                    )

                    .map(
                        x => ({
                            value:
                                x.residentId,

                            label:
                                x.residentName
                        })
                    )
            );

        }
        catch (error) {

            console.error(error);

        }
    };

    const loadHistory = async (
        flatId
    ) => {

        try {

            const response =
                await getOccupancyHistory(
                    flatId
                );

            setHistory(

                mapListToCamelCase(
                    response.data
                )
            );

        }
        catch (error) {

            console.error(error);

        }
    };

    const handleVacate = async (
        occupancyId
    ) => {

        try {

            await vacateOccupancy(

                occupancyId,

                {
                    modifiedBy:
                        getUserId()
                }
            );

            await loadOccupancies();

            setHistory([]);

        }
        catch (error) {

            console.error(error);

        }
    };

    console.log("residentOptions", residentOptions);

    // EVENTS VARIABLES
    const handleChange = (e) => {

        const { name, value } =
            e.target;

        setFormData({

            ...formData,

            [name]: value

        });

        if (name === "towerId") {

            const filteredFlats =

                allFlats.filter(
                    x =>
                        x.towerId ===
                        Number(value)
                );

            setFlatOptions(

                filteredFlats.map(
                    x => ({

                        value:
                            x.flatId,

                        label:
                            x.flatNo

                    })
                )
            );

            setFormData(prev => ({

                ...prev,

                towerId: value,

                flatId: ""

            }));
        }
    };

    const handleSave = async () => {

        try {

            if (
                formData.occupancyId > 0
            ) {

                await updateOccupancy(

                    formData.occupancyId,

                    {
                        ...formData,

                        modifiedBy:
                            getUserId()
                    }
                );

            }
            else {

                await addOccupancy({

                    ...formData,

                    tenantId:
                        getTenantId(),

                    createdBy:
                        getUserId()
                });

            }

            await loadOccupancies();

            setOpen(false);

        }
        catch (error) {

            console.error(error);

        }
    };

    const handleEdit = (row) => {

        const filteredFlats =

            allFlats.filter(
                x =>
                    x.towerId ===
                    row.towerId
            );

        setFlatOptions(

            filteredFlats.map(
                x => ({
                    value: x.flatId,
                    label: x.flatNo
                })
            )
        );

        setFormData({

            occupancyId:
                row.occupancyId,

            towerId:
                row.towerId,

            flatId:
                row.flatId,

            residentId:
                row.residentId,

            occupancyType:
                row.occupancyType,

            startDate:
                row.startDate,

            remarks:
                row.remarks
        });

        setEditMode(true);

        setOpen(true);
    };

    const columns = [

        {
            field: "towerName",
            headerName: "Tower",
            flex: 1
        },

        {
            field: "flatNo",
            headerName: "Flat",
            flex: 1
        },

        {
            field: "residentName",
            headerName: "Resident",
            flex: 1.5
        },

        {
            field: "occupancyType",
            headerName: "Type",
            flex: 1
        },

        {
            field: "startDate",
            headerName: "Start Date",
            flex: 1
        },

        {
            field: "actions",
            headerName: "Actions",
            flex: 2,

            sortable: false,

            renderCell: (params) => (

                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5
                    }}
                >

                    <ActionChip
                        label="Edit"
                        type="primary"
                        onClick={() =>
                            handleEdit(
                                params.row
                            )
                        }
                    />

                    <ActionChip
                        label="History"
                        type="warning"
                        onClick={() =>
                            loadHistory(
                                params.row.flatId
                            )
                        }
                    />

                    <ActionChip
                        label="Vacate"
                        type="danger"
                        onClick={() =>
                            handleVacate(
                                params.row.occupancyId
                            )
                        }
                    />

                </Box>
            )
        }
    ];

    const historyColumns = [

        {
            field: "residentName",
            headerName: "Resident",
            flex: 1
        },

        {
            field: "occupancyType",
            headerName: "Type",
            flex: 1
        },

        {
            field: "startDate",
            headerName: "Start Date",
            flex: 1
        },

        {
            field: "endDate",
            headerName: "End Date",
            flex: 1
        },

        {
            field: "remarks",
            headerName: "Remarks",
            flex: 2
        }
    ];

    {/* LOAD MASTER VARIABLE */ }
    useEffect(() => {

        loadOccupancies();

        loadTowers();

        loadFlats();

        loadResidents();

    }, []);

    console.log("residentOptions", residentOptions);

    return (
        <AppPage>
            <AppHeader
                title="Occupany Management"
                action={
                    <AppButton
                        onClick={() => {
                            setEditMode(false);
                            setFormData({
                                ...emptyOccupancy,
                                startDate: new Date()
                            });
                            setOpen(true);
                        }}
                    >
                        Add Occupany
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
                    title="Occupancies"
                    value={occupancies.length}
                />

                <SummaryCard
                    title="Owners"
                    value={
                        occupancies.filter(
                            x =>
                                x.occupancyType ===
                                "OWNER"
                        ).length
                    }
                />

                <SummaryCard
                    title="Tenants"
                    value={
                        occupancies.filter(
                            x =>
                                x.occupancyType ===
                                "TENANT"
                        ).length
                    }
                />

            </Box>

            {/* GRID */}

            <AppCard>

                <AppDataGrid
                    rows={occupancies}
                    columns={columns}
                    getRowId={(row) =>
                        row.occupancyId
                    }
                />

            </AppCard>

            <AppCard
                sx={{
                    mt: 2
                }}
            >

                <AppDataGrid

                    rows={history}

                    columns={historyColumns}

                    getRowId={(row) =>
                        row.occupancyId
                    }

                />

            </AppCard>

            <OccupancyForm

                open={open}

                onClose={() =>
                    setOpen(false)
                }

                editMode={editMode}

                formData={formData}

                towerOptions={towerOptions}

                flatOptions={flatOptions}

                residentOptions={residentOptions}

                handleChange={handleChange}

                handleSave={handleSave}
            />

        </AppPage>
    );
}

export default OccupanyPage;