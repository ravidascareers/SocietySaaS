import { Box } from "@mui/material";

import { getTowers } from "../services/towerService";

import {
    getFlats,
    addFlat,
    updateFlat,
    deleteFlat,

} from "../services/flatService";

import {
    getFlatTypes
} from "../services/flatTypeService";

import {
    getTenantId,
    getUserId
} from "../utils/session";

import {
    useEffect,
    useState,
} from "react"

import EditIcon from "@mui/icons-material/Edit";

import MainLayout from "../layouts/MainLayout";

import AppPage from "../components/ui/AppPage";
import AppHeader from "../components/ui/AppHeader";
import AppCard from "../components/ui/AppCard";
import AppButton from "../components/ui/AppButton";
import AppDataGrid from "../components/ui/AppDataGrid";
import ActionChip from "../components/ui/ActionChip";
import SummaryCard from "../components/ui/SummaryCard";

import FlatForm from "../components/flats/FlatForm";
import { mapListToCamelCase } from "../utils/objectMapperUtil";

function FlatPage() {

    const [open, setOpen] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        towerId: 0,
        flatId: 0,
        flatNo: "",
        floorNo: "",
        areaSqft: "",
        maintenanceRate: "",
        status: "Vacant",
        flatTypeId: 0
    });

    const [flats, setFlats] = useState([]);
    const [towerOptions, setTowerOptions] = useState([]);
    const [flatTypeOptions, setflatTypeOptions] = useState([]);

    const loadTowers = async () => {

        try {

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


            setFlats(

                mapListToCamelCase(
                    response.data
                )
            );

        }
        catch (error) {

            console.error(
                error
            );

        }
    };

    const loadFlatTypes = async () => {

        try {

            const response =
                await getFlatTypes();


            setflatTypeOptions(

                mapListToCamelCase(
                    response.data).map(item => ({
                        value: item.flatTypeId,
                        label: item.flatTypeName,
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

    useEffect(() => {

        loadTowers();

        loadFlats();

        loadFlatTypes();

    }, []);



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleSave = async () => {

        try {

            if (
                formData.flatId > 0
            ) {

                await updateFlat(

                    formData.flatId,

                    {
                        tenantId: getTenantId(),
                        towerId: formData.towerId,
                        flatId: formData.flatId,
                        flatNo: formData.flatNo,
                        floorNo: formData.floorNo,
                        areaSqft: formData.areaSqft,
                        maintenanceRate: formData.maintenanceRate,
                        status: formData.status,
                        modifiedBy: getUserId(),
                        flatTypeId: formData.flatTypeId
                    }
                );

            }
            else {

                await addFlat({

                    tenantId: getTenantId(),
                    towerId: formData.towerId,
                    flatNo: formData.flatNo,
                    floorNo: formData.floorNo,
                    areaSqft: formData.areaSqft,
                    maintenanceRate: formData.maintenanceRate,
                    status: formData.status,
                    createdBy: getUserId(),
                    flatTypeId: formData.flatTypeId
                });

            }

            await loadFlats();

            setOpen(false);

        }
        catch (error) {

            console.error(
                error
            );

        }

    };

    const handleEdit = (row) => {

        setEditMode(true);

        setFormData({

            towerId: row.TOWER_ID ?? row.towerId,
            flatId: row.FLAT_ID ?? row.flatId,

            flatNo: row.FLAT_NO ?? row.flatNo,
            floorNo: row.FLOOR_NO ?? row.floorNo,

            areaSqft: row.AREA_SQFT ?? row.areaSqft,
            maintenanceRate: row.MAINTENANCE_RATE ?? row.maintenanceRate,

            status: row.STATUS ?? row.status,

            flatTypeId: row.FLAT_TYPE_ID ?? row.flatTypeId

        });

        setOpen(true);

    };

    const handleDelete = async (flatId) => {

        try {

            await deleteFlat(
                flatId
            );

            await loadFlats();

        }
        catch (error) {

            console.error(
                error
            );
        }
    };


    const columns = [

        {
            field: "towerName",
            headerName: "Tower",
            flex: 1,
        },

        {
            field: "floorNo",
            headerName: "Floor",
            flex: 1,
        },

        {
            field: "flatNo",
            headerName: "Flat",
            flex: 1,
        },

        {
            field: "flatTypeName",
            headerName: "Flat Type",
            flex: 1
        },

        {
            field: "areaSqft",
            headerName: "Area",
            flex: 1,
        },

        {
            field: "maintenanceRate",
            headerName: "Rate",
            flex: 1,
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,

            renderCell: (params) => (

                <ActionChip

                    label={params.value}

                    type={
                        params.value === "Occupied"
                            ? "success"
                            : "warning"
                    }

                />

            ),
        },

        {
            field: "actions",
            headerName: "Actions",
            flex: 1,

            renderCell: (params) => (

                <ActionChip

                    icon={<EditIcon />}

                    label="Edit"

                    type="primary"

                    onClick={() => {
                        handleEdit(params.row);
                    }}

                />

            ),
        },

    ];

    return (


        <AppPage>

            <AppHeader
                title="Flat Master"
                action={
                    <AppButton
                        onClick={() => {
                            setEditMode(false);
                            setFormData({
                                towerId: 0,
                                flatId: 0,
                                flatNo: "",
                                floorNo: "",
                                areaSqft: "",
                                maintenanceRate: "",
                                status: "Vacant",
                                flatTypeId: 0
                            });
                            setOpen(true);
                        }}
                    >
                        Add Flat
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
                    title="Total Flats"
                    value={flats.length}
                />

                <SummaryCard
                    title="Occupied Flats"
                    value={
                        flats.filter(
                            x => x.status === "Occupied"
                        ).length
                    }
                />

                <SummaryCard
                    title="Vacant Flats"
                    value={
                        flats.filter(
                            x => x.status === "Vacant"
                        ).length
                    }
                />
            </Box>

            <AppCard
                sx={{
                    flex: 1,
                    minHeight: 0,
                }}
            >

                <AppDataGrid

                    rows={flats}

                    columns={columns}

                    getRowId={(row) =>
                        row.flatId
                    }

                />

            </AppCard>

            <FlatForm

                open={open}

                onClose={() =>
                    setOpen(false)
                }

                editMode={editMode}

                formData={formData}

                towerOptions={
                    towerOptions
                }

                flatTypeOptions={
                    flatTypeOptions
                }

                handleChange={
                    handleChange
                }

                handleSave={
                    handleSave
                }

            />

        </AppPage>


    );

}

export default FlatPage;