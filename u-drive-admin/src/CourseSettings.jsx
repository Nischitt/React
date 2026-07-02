// src/CourseSettings.jsx
import React from 'react';
import { 
    SimpleForm, 
    NumberInput, 
    TextInput, 
    Title,
    Toolbar,
    SaveButton,
    useGetOne,
    EditContextProvider,
    useUpdate
} from 'react-admin';
import { Card, CardContent, CircularProgress, Box } from '@mui/material';

const SettingsToolbar = props => (
    <Toolbar {...props}>
        <SaveButton label="Publish Changes" />
    </Toolbar>
);

export const CourseSettingsEdit = () => {
    const resource = "page-settings/standard-course";
    const id = "standard_driving_page";

    // 1. Manually fetch the single configuration record bypassing the list cache
    const { data: record, isLoading, error, refetch } = useGetOne(resource, { id });
    const [update] = useUpdate();

    // 2. Handle saving updates back to Express
    const handleSave = (values) => {
        update(
            resource,
            { id, data: values, previousData: record },
            { onSuccess: () => refetch() }
        );
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (error) return <div style={{ color: 'red' }}>Error loading settings: {error.message}</div>;

    return (
        <Card style={{ maxWidth: '600px', margin: '20px 0', background: '#1e293b' }}>
            <CardContent>
                <Title title="Standard Course Landing Page Setup" />
                
                {/* 3. Wrap form inside a Context Provider manually to supply our standalone record */}
                <EditContextProvider value={{
                    resource,
                    record,
                    save: handleSave,
                    saving: false
                }}>
                    <SimpleForm toolbar={<SettingsToolbar />} record={record}>
                        <NumberInput source="tuitionCost" label="Total Tuition Cost ($)" fullWidth />
                        <NumberInput source="theoryHours" label="Theory Module Hours" fullWidth />
                        <NumberInput source="behindWheelHours" label="Behind-the-Wheel Hours" fullWidth />
                        <NumberInput source="courseLengthDays" label="Course Length (Days Max)" fullWidth />
                        <TextInput source="instructorName" label="Assigned Driving Instructor" fullWidth />
                    </SimpleForm>
                </EditContextProvider>
            </CardContent>
        </Card>
    );
};