// frontend/src/TeamManagement.jsx
import React from 'react';
import { 
    List, 
    Datagrid, 
    TextField, 
    EditButton, 
    DeleteButton,
    Edit, 
    Create, 
    SimpleForm, 
    TextInput 
} from 'react-admin';

// 1. LIST GRID VIEW: Displays all current instructors in a database table
export const TeamList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="name" label="Full Name" />
            <TextField source="title" label="Designation / Role" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// 2. EDIT FORM VIEW: Modifies an existing instructor's details
export const TeamEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" label="Database Reference Key" />
            <TextInput source="name" fullWidth />
            <TextInput source="title" label="Job Title (e.g., FOUNDER & HEAD INSTRUCTOR)" fullWidth />
            <TextInput source="image" label="Asset Path / URL (e.g., /images/instructor1.jpg)" fullWidth />
            <TextInput source="bio" multiline rows={4} fullWidth />
            <TextInput source="fbUrl" label="Facebook Profile Link" fullWidth />
            <TextInput source="twUrl" label="Twitter Profile Link" fullWidth />
            <TextInput source="lnUrl" label="LinkedIn Profile Link" fullWidth />
        </SimpleForm>
    </Edit>
);

// 3. CREATE FORM VIEW: Adds a completely new instructor card to the system
export const TeamCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" required fullWidth />
            <TextInput source="title" label="Job Title (e.g., SENIOR SAFETY INSTRUCTOR)" required fullWidth />
            <TextInput source="image" label="Asset Path / URL (e.g., /images/instructor2.jpg)" required fullWidth />
            <TextInput source="bio" multiline rows={4} required fullWidth />
            <TextInput source="fbUrl" label="Facebook Profile Link" fullWidth />
            <TextInput source="twUrl" label="Twitter Profile Link" fullWidth />
            <TextInput source="lnUrl" label="LinkedIn Profile Link" fullWidth />
        </SimpleForm>
    </Create>
);