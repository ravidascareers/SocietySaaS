import { Box, Chip } from "@mui/material";

function FloorSelector({

    floors = [],

    selectedFloor,

    onFloorChange
}) {

    return (

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
                                onFloorChange(
                                    floor
                                )
                            }
                        />

                    )
                )
            }

        </Box>

    );

}

export default FloorSelector;