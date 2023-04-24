import React from "react";
import {Admin, EditGuesser, ListGuesser, Resource} from 'react-admin';
import dataProvider from "./dataProvider";
import { ItemCreate, ItemEdit, ItemList } from "./items";
import Dashboard from "./Dashboard";
import itemIcon from '@mui/icons-material/List';
import orderIcon from '@mui/icons-material/Shop'
import { OrderEdit, OrderList } from "./orders";
import memberIcon from '@mui/icons-material/People';
import { MemberCreate, MemberEdit, MemberList } from "./members";
import authProvider  from "./authProvider";

const AdminApp = () => (
    <Admin basename='/admin' dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
        <Resource name="items" list={ItemList} edit={ItemEdit} create={ItemCreate} 
            icon={itemIcon} />
        <Resource name="orders" list={OrderList} icon={orderIcon} edit={OrderEdit}/>
        <Resource name="members" list={MemberList} icon={memberIcon} edit={MemberEdit}
            create={MemberCreate}/>
    </Admin>
);

export default AdminApp;