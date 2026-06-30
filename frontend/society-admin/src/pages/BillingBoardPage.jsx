import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import AppPage from "../components/ui/AppPage";
import AppHeader from "../components/ui/AppHeader";
import AppCard from "../components/ui/AppCard";
import SummaryCard from "../components/ui/SummaryCard";

import TowerNavigator from "../components/occupancy/TowerNavigator";
import FloorSelector from "../components/occupancy/FloorSelector";

import BillingSummary from "../components/billing/BillingSummary";
import BillingToolbar from "../components/billing/BillingToolbar";
import BillCard from "../components/billing/BillCard";
import BillDetailPanel from "../components/billing/BillDetailPanel";

import { getTowers } from "../services/towerService";
import { getFlats } from "../services/flatService";
import { getBills } from "../services/billingService";

import { mapListToCamelCase } from "../utils/objectMapperUtil";

function BillingBoardPage() {

    const [towers, setTowers] = useState([]);
    const [flats, setFlats] = useState([]);
    const [bills, setBills] = useState([]);

    const [selectedTower, setSelectedTower] = useState(null);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedBill, setSelectedBill] = useState(null);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const towerResponse =
                await getTowers();

            const flatResponse =
                await getFlats();

            const billResponse =
                await getBills();

            const towerData =
                mapListToCamelCase(
                    towerResponse.data
                );

            const flatData =
                mapListToCamelCase(
                    flatResponse.data
                );

            const billData =
                mapListToCamelCase(
                    billResponse.data
                );

            setTowers(towerData);

            setFlats(flatData);

            setBills(billData);

            if (towerData.length > 0) {

                setSelectedTower(
                    towerData[0].towerId
                );

            }

        }
        catch (err) {

            console.error(err);

        };

    };

    return (

        <AppPage>

            <AppHeader
                title="Financial Operations Board"
            />

            <BillingSummary
                bills={bills}
            />

            <BillingToolbar
                onGenerate={(model) => {
                    console.log(model);
                }}
            />

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns:

                        selectedBill

                            ? "180px 1fr 340px"

                            : "180px 1fr",

                    gap: 2,

                    height:
                        "calc(100vh - 260px)"
                }}
            >

                <TowerNavigator

                    towers={towers}

                    flats={flats}

                    occupancies={[]}

                    selectedTower={
                        selectedTower
                    }

                    onTowerChange={
                        setSelectedTower
                    }

                />

                <AppCard>

                    <FloorSelector
                        floors={[]}
                    />

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(220px,1fr))",
                            gap: 2,
                            mt: 2
                        }}
                    >

                        {
                            flats

                                .filter(

                                    x =>

                                        x.towerId ===
                                        selectedTower

                                )

                                .map(

                                    flat => {

                                        const bill =

                                            bills.find(

                                                b =>

                                                    b.flatId ===
                                                    flat.flatId

                                            );

                                        return (

                                            <BillCard

                                                key={
                                                    flat.flatId
                                                }

                                                flat={flat}

                                                bill={bill}

                                                selected={
                                                    selectedBill?.billId ===
                                                    bill?.billId
                                                }

                                                onClick={() =>
                                                    setSelectedBill(
                                                        bill
                                                    )
                                                }

                                            />

                                        );

                                    }

                                )

                        }

                    </Box>

                </AppCard>

                <BillDetailPanel
                    bill={selectedBill}
                />

            </Box>

        </AppPage>

    );

}

export default BillingBoardPage;