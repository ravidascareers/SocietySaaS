import {
    Box,
    Typography,
} from "@mui/material";

import {
    getTowers,
    addTower,
    updateTower,
    deleteTower,
} from "../services/towerService";

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

import TowerForm from "../components/towers/TowerForm";

import { useAuth } from "../context/AuthContext";

import { mapListToCamelCase } from "../utils/objectMapperUtil";

function TowerPage() {

    const [open, setOpen] =
        useState(false);

    const [editMode, setEditMode] =
        useState(false);

    const [formData, setFormData] =
        useState({

            towerId: 0,

            towerName: "",

            totalFloors: "",

            status: "Active",

        });

    const [towers, setTowers] = useState([]);


    const loadTowers = async () => {

        try {

            const response =
                await getTowers(getTenantId());

            setTowers(

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
                formData.towerId > 0
            ) {

                await updateTower(

                    formData.towerId,

                    {
                        tenantId: getTenantId(),

                        towerName:
                            formData.towerName,

                        totalFloors:
                            Number(
                                formData.totalFloors
                            ),

                        status:
                            formData.status,

                        modifiedBy: getUserId(),
                    }
                );

            }
            else {

                await addTower({

                    tenantId: getTenantId(),

                    towerName:
                        formData.towerName,

                    totalFloors:
                        Number(
                            formData.totalFloors
                        ),

                    status:
                        formData.status,

                    createdBy: getUserId()
                });

            }

            await loadTowers();

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

            towerId:
                row.TOWER_ID ??
                row.towerId,

            towerName:
                row.TOWER_NAME ??
                row.towerName,

            totalFloors:
                row.TOTAL_FLOORS ??
                row.totalFloors,

            status:
                row.STATUS ??
                row.status,
        });

        setOpen(true);

    };

    const columns = [

        {
            field: "towerName",
            headerName: "Tower",
            flex: 1,
        },

        {
            field: "totalFloors",
            headerName: "Floors",
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
                        params.value ===
                            "Active"
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

                    onClick={() =>
                        handleEdit(
                            params.row
                        )
                    }

                />

            ),
        },

    ];

    useEffect(() => {

        loadTowers(getTenantId());

    }, []);

    return (

        <MainLayout>
            <AppPage>

                <AppHeader

                    title="Tower Master"
                    action={
                        <AppButton
                            onClick={() => {
                                setEditMode(false);
                                setFormData({
                                    towerId: 0,
                                    towerName: "",
                                    totalFloors: "",
                                    status: "Active",
                                });
                                setOpen(true);
                            }}
                        >
                            Add Tower
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
                        title="Total Towers"
                        value={towers.length}
                    />

                    <SummaryCard
                        title="Active Towers"
                        value={
                            towers.filter(
                                x => x.status === "Active"
                            ).length
                        }
                    />

                    <SummaryCard
                        title="InActive Towers"
                        value={
                            towers.filter(
                                x => x.status === "Inactive"
                            ).length
                        }
                    />
                </Box>

                <AppCard>

                    <AppDataGrid
                        rows={towers}
                        columns={columns}
                        getRowId={(row) =>
                            row.towerId
                        }
                    />

                </AppCard>

                {/* ADD / EDIT DIALOG */}

                <TowerForm

                    open={open}

                    onClose={() =>
                        setOpen(false)
                    }

                    editMode={editMode}

                    formData={formData}

                    handleChange={
                        handleChange
                    }

                    handleSave={
                        handleSave
                    }

                />

            </AppPage>
        </MainLayout>
    );

}

export default TowerPage;