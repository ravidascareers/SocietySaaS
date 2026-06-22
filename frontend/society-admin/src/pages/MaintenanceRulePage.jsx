import {
    Box,
    Typography
}
    from "@mui/material";

import { useEffect, useState } from "react";

import {
    getTenantId,
    getUserId
} from "../utils/session";

import AppPage
    from "../components/ui/AppPage";

import AppCard from "../components/ui/AppCard";

import AppHeader
    from "../components/ui/AppHeader";

import AppButton
    from "../components/ui/AppButton";

import RuleCard
    from "../components/maintenance/RuleCard";

import RuleFormDialog
    from "../components/maintenance/RuleFormDialog";

import {
    getRules,
    getRuleById,
    addRule,
    updateRule,
    deleteRule
} from "../services/maintenanceRuleService";

import { mapListToCamelCase } from "../utils/objectMapperUtil";


function MaintenanceRulePage() {

    const initialFormData = {

        ruleName: "",

        calculationMethod:
            "AREA",

        ratePerSqft: "",

        fixedAmount: "",

        graceDays: 0,

        penaltyPercent: 0,

        interestPercent: 0,

        interestMode:
            "COMPOUND",

        remarks: "",

        createdBy: getUserId(),
        modifiedBy: getUserId()
    };

    const [rules, setRules] =
        useState([]);

    const [open, setOpen] =
        useState(false);

    const [editMode, setEditMode] =
        useState(false);

    const [selectedRule, setSelectedRule] =
        useState(null);

    const [formData, setFormData] =
        useState(initialFormData);

    const loadRules = async () => {

        const response =
            await getRules();

        setRules(
            mapListToCamelCase(
                response.data
            )
        );
    };

    useEffect(() => {

        loadRules();

    }, []);

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value
        }));
    };

    const handleAdd = () => {

        setEditMode(false);

        setSelectedRule(null);

        setFormData(
            initialFormData
        );

        setOpen(true);
    };

    const handleEdit = rule => {

        setSelectedRule(
            rule
        );

        setEditMode(
            true
        );

        setFormData({

            ruleName:
                rule.ruleName,

            calculationMethod:
                rule.calculationMethod,

            ratePerSqft:
                rule.ratePerSqft,

            fixedAmount:
                rule.fixedAmount,

            graceDays:
                rule.graceDays,

            penaltyPercent:
                rule.penaltyPercent,

            interestPercent:
                rule.interestPercent,

            interestMode:
                rule.interestMode,

            remarks:
                rule.remarks
        });

        setOpen(true);
    };

    const handleDelete = async rule => {

        if (
            !window.confirm(
                `Delete ${rule.ruleName}?`
            )
        )
            return;

        await deleteRule(
            rule.ruleId
        );

        await loadRules();
    };

    const handleSave = async () => {

        try {

            if (editMode) {

                const payload = {

                    ...formData,

                    modifiedBy:
                        getUserId()
                };

                await updateRule(

                    selectedRule.ruleId,

                    payload
                );

            }
            else {

                const payload = {

                    ...formData,

                    createdBy: getUserId(),

                    graceDays:
                        Number(formData.graceDays),

                    penaltyPercent:
                        Number(formData.penaltyPercent),

                    interestPercent:
                        Number(formData.interestPercent),


                    ratePerSqft:

                        formData.calculationMethod === "AREA"

                            ? Number(
                                formData.ratePerSqft
                            )

                            : null,

                    fixedAmount:

                        formData.calculationMethod === "FIXED"

                            ? Number(
                                formData.fixedAmount
                            )

                            : null
                };

                console.log(payload);

                await addRule(
                    payload
                );

            }

            await loadRules();

            handleClose();

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.error
                ||
                "Unable to save rule."
            );
        }
    };

    const handleClose = () => {

        setOpen(false);

        setEditMode(false);

        setSelectedRule(null);

        setFormData(initialFormData);
    };

    const dummyRules = [

        {
            ruleId: 1,
            ruleName: "Standard Residential",
            calculationMethod: "AREA",
            ratePerSqft: 2.5,
            graceDays: 10,
            penaltyPercent: 2,
            interestPercent: 12,
            interestMode: "COMPOUND",
            isActive: true,
            isLocked: false
        },

        {
            ruleId: 2,
            ruleName: "Premium Tower",
            calculationMethod: "FIXED",
            fixedAmount: 5000,
            graceDays: 5,
            penaltyPercent: 3,
            interestPercent: 15,
            interestMode: "SIMPLE",
            isActive: true,
            isLocked: false
        }
    ];

    return (

        <AppPage>

            <AppHeader

                title="Maintenance Rules"
                action={
                    <AppButton
                        onClick={() => {
                            setSelectedRule(null);

                            setOpen(true);
                        }}
                    >
                        Add Rule
                    </AppButton>
                }
            />

            <Box
                sx={{
                    flex: 1,
                    overflow: "auto",
                    minHeight: 0
                }}
            >
            </Box>


            <Box
                sx={{

                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fill,minmax(260px,1fr))",

                    gap: 2,

                    //alignItems: "start",

                    overflowY: "auto",
                    maxHeight: "calc(100vh - 170px)",
                    pr:1
                }}
            >

                {
                    rules.length === 0 ? (

                        <AppCard>

                            <Box
                                sx={{
                                    p: 5,
                                    textAlign: "center"
                                }}
                            >

                                <Typography
                                    variant="h6"
                                >
                                    No Rules Found
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    Create your first maintenance rule.
                                </Typography>

                            </Box>

                        </AppCard>

                    ) : (

                        rules.map(rule => (

                            <RuleCard

                                key={
                                    rule.ruleId
                                }

                                rule={rule}

                                onEdit={
                                    handleEdit
                                }

                                onDelete={
                                    handleDelete
                                }
                            />

                        ))
                    )
                }

            </Box>


            <RuleFormDialog

                open={open}

                onClose={handleClose}

                editMode={editMode}

                formData={formData}

                handleChange={handleChange}

                handleSave={handleSave}
            />

        </AppPage>
    );
}

export default MaintenanceRulePage;