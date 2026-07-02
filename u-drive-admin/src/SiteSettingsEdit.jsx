import { Edit, SimpleForm, TextInput } from 'react-admin';

export const SiteSettingsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="heroTitle" label="Hero Title" fullWidth />
            <TextInput source="aboutText" label="About Us Text" multiline fullWidth />
            {/* Match your schema's nested path: stats.field */}
            <TextInput source="stats.drivers" label="Total Drivers" />
            <TextInput source="stats.instructors" label="Total Instructors" />
            <TextInput source="stats.passRate" label="Pass Rate" />
            <TextInput source="stats.cars" label="Total Cars" />
        </SimpleForm>
    </Edit>
);