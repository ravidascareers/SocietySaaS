import { Box, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import {
    getTenantId,
    getUserId
} from "../utils/session";

import AppCard from "../components/ui/AppCard";
import AppPage from "../components/ui/AppPage";
import AppHeader from "../components/ui/AppHeader";
import AppButton from "../components/ui/AppButton";

import BindingCard from "../components/maintenance/BindingCard";
import BindingFormDialog from "../components/maintenance/BindingFormDialog";

import { getRules } from "../services/maintenanceRuleService";

import {
    getBindings,
    addBinding,
    updateBinding,
    deleteBinding,
    getEntitiesByType
}
    from "../services/maintenanceRuleBindingService";

import { mapListToCamelCase } from "../utils/objectMapperUtil";


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

    const initialFormData = {

        ruleId: "",

        entityType: "SOCIETY",

        entityId: "",

        effectiveFrom:
            new Date()
                .toISOString()
                .split("T")[0],

        effectiveTo: "",

        remarks: "",

        isActive: true,

        createdBy: getUserId(),

        modifiedBy: getUserId()
    };

    const [bindings, setBindings] =
        useState([]);

    const [rules, setRules] =
        useState([]);

    const [entityOptions, setEntityOptions] =
        useState([]);

    const [open, setOpen] =
        useState(false);

    const [editMode, setEditMode] =
        useState(false);

    const [selectedBinding, setSelectedBinding] =
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

    const loadBindings = async () => {

        const response =
            await getBindings();

        setBindings(
            mapListToCamelCase(
                response.data
            )
        );

    };

    useEffect(() => {

        loadRules();

        loadBindings();

    }, []);

    const handleEdit = async (binding) => {

        setSelectedBinding(binding);

        setEditMode(true);

        const response =
            await getEntitiesByType(
                binding.entityType
            );

        setEntityOptions(
            mapListToCamelCase(
                response.data
            )
        );

        setFormData({

            ruleId:
                binding.ruleId,

            entityType:
                binding.entityType,

            entityId:
                binding.entityId,

            effectiveFrom:
                binding.effectiveFrom
                    ?.split("T")[0],

            effectiveTo:
                binding.effectiveTo
                    ?.split("T")[0] || "",

            remarks:
                binding.remarks || "",

            isActive:
                binding.isActive
        });

        setOpen(true);

    };

    const handleDelete = async (binding) => {

        if (
            !window.confirm(
                `Delete binding for ${binding.entityName}?`
            )
        )
            return;

        await deleteBinding(
            binding.bindingId
        );

        await loadBindings();

    };

    const handleChange = async (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value
        }));

        if (name === "entityType") {

            const response =
                await getEntitiesByType(
                    value
                );

            setEntityOptions(

                mapListToCamelCase(
                    response.data
                )
            );

            setFormData(prev => ({

                ...prev,

                entityType: value,

                entityId: ""
            }));
        }

    };

    const handleAdd = async () => {

        setEditMode(false);

        setSelectedBinding(null);

        setFormData(initialFormData);

        const response =
            await getEntitiesByType("SOCIETY");

        setEntityOptions(
            mapListToCamelCase(
                response.data
            )
        );

        setOpen(true);

    };

    const handleClose = () => {

        setOpen(false);

        setEditMode(false);

        setSelectedBinding(null);

        setEntityOptions([]);

        setFormData(initialFormData);

    };

    const handleSave = async () => {

        try {

            if (editMode) {

                const payload = {

                    ...formData,

                    modifiedBy:
                        getUserId(),

                    effectiveTo:

                        formData.effectiveTo

                            ? formData.effectiveTo

                            : null
                };

                await updateBinding(

                    selectedBinding.bindingId,

                    payload

                );

            }
            else {

                const payload = {

                    ...formData,

                    createdBy:
                        getUserId(),

                    effectiveTo:

                        formData.effectiveTo

                            ? formData.effectiveTo

                            : null
                };

                await addBinding(
                    payload
                );

            }

            await loadBindings();

            handleClose();

        }
        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.error

                ||

                "Unable to save binding."

            );

        }

    };

    const ruleOptions =
        rules.map(x => ({

            value:
                x.ruleId,

            label:
                x.ruleName

        }));

    const entityDropdownOptions =
        entityOptions.map(x => ({

            value:
                x.entityId,

            label:
                x.entityName

        }));

    return (

        <AppPage>

            <AppHeader

                title="Rule Bindings"

                action={

                    <AppButton onClick={handleAdd}>
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

                {
                    bindings.length === 0 ? (

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
                                    No Rule Bindings
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    Create your first rule binding.
                                </Typography>

                            </Box>

                        </AppCard>

                    ) : (

                        bindings.map(binding => (

                            <BindingCard

                                key={
                                    binding.bindingId
                                }

                                binding={
                                    binding
                                }

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

            <BindingFormDialog

                open={open}

                onClose={handleClose}

                editMode={editMode}

                formData={formData}

                ruleOptions={
                    ruleOptions
                }

                entityOptions={
                    entityDropdownOptions
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

export default MaintenanceRuleBindingPage;