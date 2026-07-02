// src/courses.jsx
import React from 'react';
import { 
    List, Datagrid, TextField, NumberField,
    Edit, SimpleForm, TextInput, NumberInput,
    Create
} from 'react-admin';

// Defines the course table list view
export const CourseList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="title" label="Course Title" />
            <NumberField source="startingPrice" options={{ style: 'currency', currency: 'USD' }} label="Starting Price" />
            <NumberField source="theoryHours" label="Theory Hours" />
            <NumberField source="practicalHours" label="Practical Hours" />
            <TextField source="note" />
        </Datagrid>
    </List>
);

// Defines the editable form fields for courses
export const CourseEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" fullWidth />
            <TextInput source="description" multiline fullWidth />
            <NumberInput source="startingPrice" />
            <NumberInput source="theoryHours" />
            <NumberInput source="practicalHours" />
            <TextInput source="image" placeholder="/images/6.jpg" fullWidth />
            <TextInput source="note" fullWidth />
        </SimpleForm>
    </Edit>
);

export const CourseCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" fullWidth required />
            <TextInput source="description" multiline fullWidth required />
            <NumberInput source="startingPrice" required />
            <NumberInput source="theoryHours" defaultValue={4} />
            <NumberInput source="practicalHours" defaultValue={18} />
            <TextInput source="image" defaultValue="/images/6.jpg" placeholder="/images/6.jpg" fullWidth />
            <TextInput source="note" defaultValue="Driving route will be charged separately." fullWidth />
        </SimpleForm>
    </Create>
);