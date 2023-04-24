import { MenuList } from '@material-ui/core';
import { Datagrid, DateField, List, NumberField, ReferenceField, BooleanField, TextField, EditButton, TextInput, Edit, SimpleForm, NumberInput, ReferenceInput, DateInput, BooleanInput, ArrayField, SingleFieldList, ChipField } from 'react-admin';

export const OrderList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="orderNum" />
            <ReferenceField source="memberId" reference="members">
                <TextField source='id'/>
            </ReferenceField>                
            <ArrayField source="items">
                <SingleFieldList>
                    <>
                    <ReferenceField source="itemId" reference="items">
                        <TextField source='name'/>
                    </ReferenceField>
                    <ChipField source="count"/>
                    </>
                </SingleFieldList>   
            </ArrayField>
            <DateField source="datetime" />
            <BooleanField source="paymentStatus" />
            <BooleanField source="deliveryStatus" />
            <TextField source="remark"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const OrderEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <NumberInput disabled source="orderNum" />
            <TextInput disabled  source="memberId"  />
            <TextInput disabled source="paymentOption" />
            <TextInput disabled source="transactionNum" />
            <NumberInput disabled source="totalPrice" />
            <NumberInput disabled source="itemId"  />
            <NumberInput disabled source="count" />
            <TextInput disabled source="comment" />
            <DateInput disabled source="datetime" />
            <BooleanInput  source="paymentStatus" />
            <BooleanInput  source="deliveryStatus" />
            <TextInput source="remark" />
        </SimpleForm>
    </Edit>
);