import { Box, Typography } from "@mui/material";

import AppCard from "../ui/AppCard";

function TowerNavigator({

    towers = [],

    flats,

    occupancies,

    selectedTower,

    onTowerChange
}) {

    return (

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

                    overflowY: "auto",

                    maxHeight:
                        "calc(100vh - 250px)",

                    "&::-webkit-scrollbar": {

                        width: 5
                    },

                    "&::-webkit-scrollbar-thumb": {

                        background:
                            "#cbd5e1",

                        borderRadius: 10
                    }
                }}
            >

                {
                    towers.map(
                        tower => {

                            const totalFlats =

                                flats.filter(
                                    x =>
                                        x.towerId ===
                                        tower.towerId
                                ).length;

                            const occupiedFlats =

                                occupancies.filter(
                                    x =>
                                        x.towerId ===
                                        tower.towerId
                                ).length;

                            return (

                                <Box

                                    key={
                                        tower.towerId
                                    }

                                    onClick={() =>
                                        onTowerChange(
                                            tower.towerId
                                        )
                                    }

                                    sx={{

                                        p: 1.5,

                                        mb: 1,

                                        borderRadius: 2,

                                        cursor: "pointer",

                                        transition:
                                            "all .2s ease",

                                        fontWeight: 600,

                                        backgroundColor:

                                            selectedTower ===
                                                tower.towerId

                                                ? "#2563eb"

                                                : "#f8fafc",

                                        color:

                                            selectedTower ===
                                                tower.towerId

                                                ? "#ffffff"

                                                : "#111827",

                                        "&:hover": {

                                            backgroundColor:

                                                selectedTower ===
                                                    tower.towerId

                                                    ? "#2563eb"

                                                    : "#eef2ff"
                                        }
                                    }}
                                >

                                    {
                                        <Box>

                                            <Typography
                                                fontWeight={700}
                                            >
                                                {tower.towerName}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    opacity: .8
                                                }}
                                            >
                                                {occupiedFlats} / {totalFlats} Occupied
                                            </Typography>

                                        </Box>


                                    }

                                    <Box
                                        sx={{
                                            mt: 1,
                                            height: 5,
                                            borderRadius: 10,
                                            bgcolor:
                                                "rgba(255,255,255,.25)",
                                            overflow: "hidden"
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                width:
                                                    `${(occupiedFlats /
                                                        (totalFlats || 1)) * 100}%`,

                                                height: "100%",

                                                bgcolor:
                                                    selectedTower ===
                                                        tower.towerId

                                                        ? "#ffffff"

                                                        : "#2563eb"
                                            }}
                                        />

                                    </Box>

                                </Box>
                            

                            );
                        }
                    )
                }

            </Box>

        </AppCard>

    );

}

export default TowerNavigator;