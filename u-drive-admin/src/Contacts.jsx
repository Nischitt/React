import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField, DeleteButton } from 'react-admin';

export const ContactList = (props) => (
    <List {...props} title="Customer Enquiries">
        <Datagrid rowClick="show">
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="category" />
            <TextField source="instructor" />
            <DateField source="date" showTime />
            <DeleteButton />
        </Datagrid>
    </List>
);