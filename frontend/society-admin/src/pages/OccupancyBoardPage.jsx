import {
    Box,
    Typography,
    Chip
} from "@mui/material";

import { useEffect, useState } from "react";

import AppPage from "../components/ui/AppPage";
import AppHeader from "../components/ui/AppHeader";
import AppCard from "../components/ui/AppCard";

import TowerNavigator from "../components/occupancy/TowerNavigator";
import FloorSelector from "../components/occupancy/FloorSelector";
import FlatCard from "../components/occupancy/FlatCard";
import ResidentDetailPanel from "../components/occupancy/ResidentDetailPanel";

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

    const getTowerStats = (towerId) => {

        const towerFlats =

            flats.filter(
                x =>
                    x.towerId ===
                    towerId
            );

        const occupied =

            occupancies.filter(
                x =>
                    x.towerId ===
                    towerId
            ).length;

        return {

            total:
                towerFlats.length,

            occupied,

            vacant:
                towerFlats.length -
                occupied
        };
    };

    console.log("FLATS", flats);

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

                <TowerNavigator

                    towers={towers}

                    flats={flats}

                    occupancies={occupancies}

                    selectedTower={
                        selectedTower
                    }

                    onTowerChange={
                        handleTowerChange
                    }
                />


                {/* CENTRE - FLAT NAVIGATOR */}

                <AppCard>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            flexWrap: "wrap",
                            gap: 1,

                            "&::-webkit-scrollbar": {

                                width: 5
                            },

                            "&::-webkit-scrollbar-thumb": {

                                background: "#cbd5e1",

                                borderRadius: 10
                            }
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

                        <FloorSelector

                            floors={floors}

                            selectedFloor={
                                selectedFloor
                            }

                            onFloorChange={
                                handleFloorChange
                            }
                        />

                    </Box>

                    <Box
                        sx={{

                            display: "grid",

                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(220px,1fr))",

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

                                            <FlatCard

                                                key={
                                                    flat.flatId
                                                }

                                                flat={
                                                    flat
                                                }

                                                occupancy={
                                                    occupancy
                                                }

                                                selected={
                                                    selectedFlat
                                                        ?.flatId ===
                                                    flat.flatId
                                                }

                                                onClick={() =>

                                                    setSelectedFlat(
                                                        flat
                                                    )

                                                }
                                            />

                                        );

                                    }
                                )
                        }

                    </Box>

                </AppCard>


                {/* RIGHT SIDE - DETAILS */}

                <ResidentDetailPanel

                    selectedFlat={
                        selectedFlat
                    }

                    selectedOccupancy={
                        selectedOccupancy
                    }
                />
            </Box>



        </AppPage >

    );
}

export default OccupancyBoard;