import React from 'react';
import { 
    List, 
    Datagrid, 
    TextField, 
    DateField, 
    EditButton, 
    Edit, 
    Create, 
    SimpleForm, 
    TextInput, 
    DateInput, 
    NumberInput 
} from 'react-admin';

// 1. LIST VIEW: Shows all blog posts in a table
export const BlogList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="title" />
            <TextField source="author" />
            <TextField source="category" />
            <DateField source="date" label="Published Date" />
            <EditButton />
        </Datagrid>
    </List>
);

// 2. CREATE VIEW: Form to add new posts
export const BlogCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" fullWidth />
            <TextInput source="author" defaultValue="Isaac Herman" />
            <TextInput source="category" defaultValue="Driving Course" />
            
            {/* 💡 Include it here too so new posts can have pictures right away */}
            <TextInput 
                source="image" 
                label="Image Path / URL (e.g., src/images/5.jpg)" 
                fullWidth 
            />
            
            <DateInput source="publishedDate" defaultValue={new Date()} />
            <TextInput source="content" multiline rows={5} fullWidth />
        </SimpleForm>
    </Create>
);

// 3. EDIT VIEW: Form to modify existing posts
export const BlogEdit = (props) => (
    <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="title" fullWidth />
        <TextInput source="author" />
        <TextInput source="category" />
        
        {/* 💡 THE MISSING LINK: Adding the image input field */}
        <TextInput 
            source="image" 
            label="Image Path / URL (e.g., src/images/5.jpg)" 
            fullWidth 
        />
        
        <DateInput source="publishedDate" />
        <TextInput source="content" multiline rows={5} fullWidth />
    </SimpleForm>
);