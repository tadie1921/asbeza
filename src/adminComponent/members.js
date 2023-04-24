import { Create, Datagrid, Edit, EditButton, List, ReferenceField, SimpleForm, TextField, TextInput } from 'react-admin';

export const MemberList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="address" />
            <TextField source="location" />
            <EditButton />
        </Datagrid>
    </List>
);

export const MemberEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="address" />
            <TextInput source="location" />
            <TextInput source="remark" />
        </SimpleForm>
    </Edit>
);

export const MemberCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="address" />
            <TextInput source="location" />
        </SimpleForm>
    </Create>
)