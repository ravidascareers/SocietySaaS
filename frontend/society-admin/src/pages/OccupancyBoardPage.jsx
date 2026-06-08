import {
    Box,
    Typography,
    Chip
} from "@mui/material";

import { useEffect, useState } from "react";

import AppPage from "../components/ui/AppPage";
import AppHeader from "../components/ui/AppHeader";
import AppCard from "../components/ui/AppCard";

import { getTowers } from "../services/towerService";
import { getOccupancies } from "../services/occupancyService";
import { getFlats } from "../services/flatService";

import { mapListToCamelCase } from "../utils/objectMapperUtil";

function OccupancyBoard() {

    const [towers, setTowers] =
        useState([]);

    const [flats, setFlats] =
        useState([]);

    const [occupancies, setOccupancies] =
        useState([]);

    const [selectedTower, setSelectedTower] =
        useState(null);

    const [selectedFloor, setSelectedFloor] =
        useState(null);

    const [selectedFlat, setSelectedFlat] =
        useState(null);

    const handleTowerChange = (towerId) => {

        setSelectedTower(
            towerId
        );

        setSelectedFloor(
            null
        );

        setSelectedFlat(
            null
        );
    };

    const handleFloorChange = (floorNo) => {

        setSelectedFloor(
            floorNo
        );

        setSelectedFlat(
            null
        );
    };

    useEffect(() => {

        loadData();

    }, []);

    useEffect(() => {

        if (!selectedTower)
            return;

        const towerFlats =

            flats.filter(
                x =>
                    x.towerId ===
                    selectedTower
            );

        const floors =

            [...new Set(

                towerFlats.map(
                    x => x.floorNo
                )

            )]

                .sort(
                    (a, b) => b - a
                );

        if (floors.length > 0) {

            setSelectedFloor(
                floors[0]
            );

        }

    }, [

        selectedTower,

        flats

    ]);

    const loadData = async () => {

        try {

            const towerResponse =
                await getTowers();

            const flatResponse =
                await getFlats();

            const occupancyResponse =
                await getOccupancies();

            const towerData =
                mapListToCamelCase(
                    towerResponse.data
                );

            const flatData =
                mapListToCamelCase(
                    flatResponse.data
                );

            const occupancyData =
                mapListToCamelCase(
                    occupancyResponse.data
                );

            setTowers(
                towerData
            );

            setFlats(
                flatData
            );

            setOccupancies(
                occupancyData
            );

            if (
                towerData.length > 0
            ) {

                setSelectedTower(
                    towerData[0].towerId
                );

            }

        }
        catch (error) {

            console.error(error);

        }

    };

    const towerFlats =

        flats.filter(
            x =>
                x.towerId ===
                selectedTower
        );

    const getOccupancy = (
        flatId
    ) => {

        return occupancies.find(
            x =>
                x.flatId === flatId
        );

    };

    const floors =
        [
            ...new Set(
                towerFlats.map(
                    x => x.floorNo
                )
            )
        ]
            .sort((a, b) => b - a);

    const selectedOccupancy =
        occupancies.find(
            x =>
                x.flatId ===
                selectedFlat?.flatId
        );

    return (

        <AppPage>

            <AppHeader
                title="Occupancy Board"
            />

            {/* MAIN BOX */}
            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns:

                        selectedFlat

                            ? "180px 1fr 320px"

                            : "180px 1fr",

                    gap: 2,

                    height:
                        "calc(100vh - 180px)"
                }}
            >

                {/* LEFT SIDE - TOWERS NAVIGATOR*/}

                <AppCard>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 2 }}
                    >
                        Towers
                    </Typography>

                    <Box
                        sx={{
                            overflowY: "auto"
                        }}
                    >

                        {
                            towers.map(
                                tower => (

                                    <Box

                                        key={tower.towerId}

                                        onClick={() => {

                                            handleTowerChange(
                                                tower.towerId
                                            );

                                            setSelectedFloor(
                                                null
                                            );

                                            setSelectedFlat(
                                                null
                                            );

                                        }}

                                        sx={{

                                            p: 1.5,

                                            mb: 1,

                                            borderRadius: 2,

                                            cursor: "pointer",

                                            backgroundColor:

                                                selectedTower ===
                                                    tower.towerId

                                                    ? "#2563eb"

                                                    : "#f8fafc",

                                            color:

                                                selectedTower ===
                                                    tower.towerId

                                                    ? "#ffffff"

                                                    : "#111827"
                                        }}
                                    >

                                        {tower.towerName}

                                    </Box>

                                )
                            )
                        }

                    </Box>

                </AppCard>


                {/* CENTRE - FLAT NAVIGATOR */}

                <AppCard>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            flexWrap: "wrap",
                            gap: 1
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            {
                                towers.find(
                                    x =>
                                        x.towerId ===
                                        selectedTower
                                )?.towerName
                            }
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap"
                            }}
                        >

                            {
                                floors.map(
                                    floor => (

                                        <Chip

                                            key={floor}

                                            label={`Floor ${floor}`}

                                            clickable

                                            color={
                                                selectedFloor === floor
                                                    ? "success"
                                                    : "default"
                                            }

                                            onClick={() =>
                                                handleFloorChange(
                                                    floor
                                                )
                                            }
                                        />

                                    )
                                )
                            }

                        </Box>

                    </Box>

                    <Box
                        sx={{

                            display: "grid",

                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(140px,1fr))",

                            gap: 2,

                            overflowY: "auto",

                            maxHeight:
                                "calc(100vh - 280px)",

                            pr: 1
                        }}
                    >

                        {
                            towerFlats

                                .filter(
                                    x =>
                                        x.floorNo ===
                                        selectedFloor
                                )

                                .map(
                                    flat => {

                                        const occupancy =
                                            getOccupancy(
                                                flat.flatId
                                            );

                                        const occupied =
                                            !!occupancy;

                                        return (

                                            <AppCard

                                                key={
                                                    flat.flatId
                                                }

                                                onClick={() =>
                                                    setSelectedFlat(
                                                        flat
                                                    )
                                                }

                                                sx={{

                                                    cursor:
                                                        "pointer",

                                                    minHeight:
                                                        70,

                                                    background:

                                                        occupied

                                                            ? "linear-gradient(135deg,#ecfdf5,#dcfce7)"

                                                            : "#ffffff",

                                                    border:

                                                        selectedFlat?.flatId ===
                                                            flat.flatId

                                                            ? "3px solid #2563eb"

                                                            : occupied

                                                                ? "2px solid #16a34a"

                                                                : "2px solid #e5e7eb"
                                                }}
                                            >

                                                <Typography
                                                    fontWeight={700}
                                                    fontSize={16}
                                                >
                                                    {
                                                        flat.flatNo
                                                    }
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: 11,
                                                        color: "#64748b"
                                                    }}
                                                >
                                                    {
                                                        occupied

                                                            ? occupancy.residentName

                                                            : "Vacant"
                                                    }
                                                </Typography>

                                            </AppCard>

                                        );

                                    }
                                )
                        }

                    </Box>

                </AppCard>


                {/* RIGHT SIDE - DETAILS */}

                {
                    selectedFlat &&

                    <AppCard
                        sx={{
                            position: "sticky",
                            top: 16
                        }}
                    >

                        {
                            !selectedFlat ?

                                <Typography
                                    color="text.secondary"
                                >
                                    Select a flat
                                </Typography>

                                :

                                <>
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                    >
                                        {
                                            selectedFlat.flatNo
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 2
                                        }}
                                    >
                                        Floor :
                                        {
                                            selectedFlat.floorNo
                                        }
                                    </Typography>

                                    <Typography>
                                        Status :
                                        {
                                            selectedFlat.status
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 3,
                                            fontWeight: 700
                                        }}
                                    >
                                        Resident
                                    </Typography>

                                    <Typography>
                                        {
                                            selectedOccupancy
                                                ?.residentName
                                            ||
                                            "Vacant"
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 2,
                                            fontWeight: 700
                                        }}
                                    >
                                        Occupancy Type
                                    </Typography>

                                    <Typography>
                                        {
                                            selectedOccupancy
                                                ?.occupancyType
                                            ||
                                            "-"
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 2,
                                            fontWeight: 700
                                        }}
                                    >
                                        Occupied Since
                                    </Typography>

                                    <Typography>
                                        {
                                            selectedOccupancy
                                                ?.startDate
                                            ||
                                            "-"
                                        }
                                    </Typography>

                                    <Box
                                        sx={{
                                            mt: 4,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1
                                        }}
                                    >

                                        <Chip
                                            label="Transfer"
                                            clickable
                                            color="primary"
                                        />

                                        <Chip
                                            label="Vacate"
                                            clickable
                                            color="warning"
                                        />

                                        <Chip
                                            label="History"
                                            clickable
                                        />

                                    </Box>

                                </>
                        }

                    </AppCard>
                }
            </Box>



        </AppPage >

    );
}

export default OccupancyBoard;