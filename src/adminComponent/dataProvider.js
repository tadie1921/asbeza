import axios from 'axios';
import { stringify } from 'query-string';
import authProvider from './authProvider';

const apiUrl = 'http://localhost:3000';

const dataProvider ={
    getList:(resource, params) =>{
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
    
        if(resource !== 'orders') {
            return axios.get(url,{
                headers:{
                    'Content-Type': 'application/json',
                 },
                 credentials: 'same-origin'
                })
                .then(response => {
                    //len =parseInt(response.headers.get('content-range').split('/').pop(), 10);
                   const len = response.data.data.length
    
                    return(
                            {
                                data: response.data.data,
                                total: len
                            }
                        ); 
                })
                .catch(error => {
                    console.log(error.message);                                                            
                    authProvider.checkError(error);
                    return error;
                });    
        } else {
            return axios.get(url,{
                headers:{
                    'Content-Type': 'application/json',
                 },
                 credentials: 'same-origin'
                })
                .then(response => {
                    //len =parseInt(response.headers.get('content-range').split('/').pop(), 10);
                    //const len = response.data.data.length
                    
                    console.log(response.data.data);
                    const data = response.data.data;
                    const modData = [];
                    const orderNums = [];
                    // data.map(obj => {
                    //     obj.paymentStatus = obj.paymentStatus ? true: false;
                    //     obj.deliveryStatus = obj.deliveryStatus ? true: false;
                    // })
                    data.map(obj => {
                        obj.paymentStatus = obj.paymentStatus ? true: false;
                        obj.deliveryStatus = obj.deliveryStatus ? true: false;
                        const items = {}
                        items.itemId = obj.itemId
                        items.count = obj.count
                        if(!orderNums.includes(obj.orderNum)){
                           orderNums.push(obj.orderNum)
                           obj.items = [items]; 
                           modData.push(obj)
                        } else{
                            const ordNum = obj.orderNum;
                            modData.map(obj => {
                                if(obj.orderNum === ordNum){
                                    obj.items.push(items)
                                }
                            })
                        }
                    })
                    console.log('mod data')
                    console.log(modData);
                    
                    //console.log(data)
                    const len = modData.length;
                    return(
                            {
                                data: modData,
                                total: len
                            }
                        ); 
                })
                .catch(error => {
                    console.log(error.message);                                                            
                    authProvider.checkError(error);
                    return error;
                });    
        }
        
    },
    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        console.log(url);
        if(resource !== 'orders'){
            return fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin'
            })
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },)
            .then(response => response.json())
            .then(response=> {
                return({
                        data: response.data[0],
                });                     
                })
                .catch(error => {
                    console.log(error.message)                                                            
                    authProvider.checkError(error)                        
                    return error;
                });
        } else {
            return fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin'
            })
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },)
            .then(response => response.json())
            .then(response=> {
                console.log(response.data);
                const data = response.data;
                data.map(obj => {
                    obj.paymentStatus = obj.paymentStatus ? true: false;
                    obj.deliveryStatus = obj.deliveryStatus ? true: false;
                })
                console.log(data)
                return({
                        data: data[0],
                });                     
                })
                .catch(error => {
                    console.log(error.message)                                                            
                    authProvider.checkError(error)                        
                    return error;
                });
        }
        
    },
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return fetch(url,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    credentials: 'same-origin'
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },)
                .then(response => response.json())
                .then(response=> {
                    //console.log(response);
                    return({
                            data: response.data,
                    });                     
                })
                .catch(error => {
                    console.log(error.message)                                                            
                    authProvider.checkError(error)                        
                    return error;
                });
    },
    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        
        let len = 0;
        return fetch(url,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'same-origin'
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },)
                .then(response => {
                    len =parseInt(response.headers.get('content-range').split('/').pop(), 10);
                   return response.json()
                })
                .then(response=> {
                    console.log(response.length);
                    return(
                        {
                            data: response,
                            total: len
                        }
                    );                     
                    })
                .catch(error => {
                    console.log(error.message)                                                            
                    authProvider.checkError(error)                        
                    return error;
                });
    },
    update: async (resource, params) => {
        console.log(params.data);
        const url = `${apiUrl}/${resource}/${params.id}`;
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },)
        .then(response => response.json())
        .then(response=> {
            return ({
            data: response.data[0]
            })})
        .catch(error => {                        
            console.log(error.message)                                                            
            authProvider.checkError(error)                        
            return error;
        })
    },
    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },)
                .then(response => response.json())
                .then(response=> {
                    console.log(response.length);
                    return({
                            data: response,                        
                        }
                    );                     
                    })
                    .catch(error => {                        
                        console.log(error.message)                                                            
                        authProvider.checkError(error)                        
                        return error;
                    });
    },
    create: async (resource, params) =>{
        const url = `${apiUrl}/${resource}`;
        console.log(url)
        console.log(params.data)
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
            })
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },)
            .then(response => response.json())
            .then(response=> {
                console.log("you even here ...........")
                console.log(response);
                return({
                    data: { ...params.data, id: response.id }                       
                    }
                );                     
            })
            .catch(error => {                        
                console.log(error.message)                                                            
                authProvider.checkError(error)                        
                return error;
            });

    },
    delete: (resource, params) =>{
        
        var url = `${apiUrl}/${resource}/${params.id}`;
        if(resource === 'orders') {
            url = `${apiUrl}/${resource}/${params.previousData.orderNum}`;
        }
        
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',            
            },
            credentials: 'same-origin'
            })
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },)
            .then(response => response.json())
            .then(response=> {
                return({
                    data: response,                        
                    }
                );                     
                })
            .catch(error => {                        
                console.log(error.message)                                                            
                authProvider.checkError(error)                        
                return error;
            })
    },

    deleteMany: (resource, params) => {
        console.log(params);
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(query.filter);

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
            })
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },)
            .then(response => response.json())
            .then(response=> {
               
                return({
                    data: response.data,                        
                    }
                );                     
                })
            .catch(error => {                        
                console.log(error.message)                                                            
                authProvider.checkError(error)                        
                return error;
            })
        
    }
    
};

export default dataProvider;