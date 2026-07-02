import React from 'react';
import { 
    List, Datagrid, TextField, NumberField, BooleanField, EditButton,
    Edit, SimpleForm, TextInput, NumberInput, BooleanInput 
} from 'react-admin';

// List View for Dashboard Panel
export const ReviewList = (props) => (
    <List {...props} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="edit">
            <TextField source="customerName" label="Customer" />
            <NumberField source="rating" label="Rating (1-5)" />
            <TextField source="comment" label="Comment" />
            <BooleanField source="isApproved" label="Approved for Website" />
        </Datagrid>
    </List>
);

// Edit/Approval Panel configuration
export const ReviewEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="customerName" disabled label="Customer Name" fullWidth />
            <NumberInput source="rating" disabled label="Given Rating" />
            <TextInput source="comment" multiline label="Review Description" fullWidth />
            <BooleanInput source="isApproved" label="Approve / Publish on Landing Page" />
        </SimpleForm>
    </Edit>
);