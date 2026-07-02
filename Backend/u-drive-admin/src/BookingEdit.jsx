import React from 'react';
import { 
    Edit, 
    SimpleForm, 
    TextInput, 
    SelectInput 
} from 'react-admin';

export const BookingEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="studentName" disabled label="Student Name" />
            <TextInput source="studentEmail" disabled label="Email" />
            <TextInput source="studentPhone" disabled label="Phone" />
            <TextInput source="itemName" disabled label="Course Selected" />
            
            {/* This adds the dropdown menu to change status */}
            <SelectInput source="status" label="Update Status" choices={[
                { id: 'Pending', name: 'Pending' },
                { id: 'Approved', name: 'Approved' },
                { id: 'Cancelled', name: 'Cancelled' },
                { id: 'Completed', name: 'Completed' },
            ]} />
        </SimpleForm>
    </Edit>
);