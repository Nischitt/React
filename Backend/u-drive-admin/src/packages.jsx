// src/packages.jsx
import React from 'react';
import { 
    List, Datagrid, TextField, NumberField, BooleanField,
    Edit, SimpleForm, TextInput, NumberInput, BooleanInput ,
    Create
} from 'react-admin';

export const PackageCreate = () => (
    <Create>
        <SimpleForm>
            {/* No ID field needed here; MongoDB handles it automatically! */}
            <TextInput source="name" fullWidth required />
            <TextInput source="tagline" multiline fullWidth />
            <NumberInput source="price" required />
            <NumberInput source="theoryLessons" />
            <NumberInput source="practicalLessons" />
            <NumberInput source="durationDays" defaultValue={30} />
            <NumberInput source="hoursPerDay" defaultValue={1} />
            <TextInput source="carType" defaultValue="Basic Model" />
            <BooleanInput source="freePickup" />
            <BooleanInput source="isPopular" label="Feature as Popular" />
        </SimpleForm>
    </Create>
);

// Defines how the rows display in your table grid view
export const PackageList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Package Name" />
            <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
            <TextField source="tagline" />
            <NumberField source="theoryLessons" label="Theory" />
            <NumberField source="practicalLessons" label="Practical" />
            <BooleanField source="freePickup" label="Pickup" />
            <BooleanField source="isPopular" label="Popular/Featured" />
        </Datagrid>
    </List>
);

// Defines the actual editable form fields when you click a row
export const PackageEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" fullWidth />
            <TextInput source="tagline" multiline fullWidth />
            <NumberInput source="price" />
            <NumberInput source="theoryLessons" />
            <NumberInput source="practicalLessons" />
            <NumberInput source="durationDays" />
            <NumberInput source="hoursPerDay" />
            <TextInput source="carType" />
            <BooleanInput source="freePickup" />
            <BooleanInput source="isPopular" label="Show Popular Yellow Ribbon Highlight" />
        </SimpleForm>
    </Edit>
);