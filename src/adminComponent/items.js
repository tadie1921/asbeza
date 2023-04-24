import { Create, Datagrid, Edit, EditButton, List, NumberInput, SimpleForm, TextField, TextInput, useRecordContext } from "react-admin";


export const ItemList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="price"/>
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const ItemTitle = () => {
    const record = useRecordContext();
    return <span>Itmem {record ? `${record.name}`: ''}</span>
}

export const ItemEdit = () => (
    <Edit title={<ItemTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput source="price" />
            <TextInput source="description" />
            <TextInput source="image" />
        </SimpleForm>
    </Edit>
);

export const ItemCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput source="price" />
            <TextInput source="description" />
            <TextInput source="image" />
        </SimpleForm>
    </Create>
);



