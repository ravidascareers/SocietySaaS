import { Box } from "@mui/material";

import AppPage from "../components/ui/AppPage";
import AppHeader from "../components/ui/AppHeader";
import AppButton from "../components/ui/AppButton";

import BindingCard from "../components/maintenance/BindingCard";

function MaintenanceRuleBindingPage() {

    const dummyBinding = {

        bindingId: 1,

        ruleId: 1,

        ruleName:
            "Standard Residential",

        entityType:
            "TOWER",

        entityId: 1,

        entityName:
            "Tower A",

        effectiveFrom:
            "2026-07-01",

        effectiveTo:
            null,

        isActive: true
    };

    return (

        <AppPage>

            <AppHeader

                title="Rule Bindings"

                action={

                    <AppButton>
                        Add Binding
                    </AppButton>

                }
            />

            <Box
                sx={{

                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fill,minmax(260px,1fr))",

                    gap: 2,

                    overflowY: "auto",

                    maxHeight:
                        "calc(100vh - 220px)",

                    pr: 1
                }}
            >

                <BindingCard

                    binding={
                        dummyBinding
                    }

                    onEdit={() => { }}

                    onDelete={() => { }}
                />

            </Box>

        </AppPage>

    );
}

export default MaintenanceRuleBindingPage;