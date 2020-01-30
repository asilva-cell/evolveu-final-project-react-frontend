import {postData, getData, addData, clearData, deleteData, updateData} from './api.js';
global.fetch = require('node-fetch');

/*
    These are destructive tests. The URL will have its data
    blown away.
*/

const url = 'http://localhost:5000/';

test('test that the fetch works?', async () => {

    const cities = [
        {key:1, name:'Sydney', latitude: -33.870453, longitude: 151.208755 , population: 4741874},
        {key:2, name:'China', latitude: 33.870453, longitude: -151.208755 , population: 4741874}  
    ]

    // Check that the server is running and clear any data
    let dataTest = await clearData();
    expect(dataTest.status).toEqual(200);
    // gets data from server
    dataTest= await getData();
    expect(dataTest.length).toBe(0);

    // adds a city to the server,chek status and get data
    dataTest= await addData(cities[0]);
    expect(dataTest.status).toEqual(200);
    dataTest= await getData(); //gets data
    expect(dataTest.length).toBe(1);

    // adds another city to the server,chek status and get data
    dataTest= await addData(cities[1]);
    expect(dataTest.status).toEqual(200);
    dataTest= await getData();
    expect(dataTest.length).toBe(2);

    // deletes a city given a key
    dataTest= await deleteData(1);
    expect(dataTest.status).toEqual(200);
    dataTest= await getData();
    expect(dataTest.length).toBe(1);
    expect(dataTest[0].key).toBe(2);

    // check UPDATE population before and after update function
    expect(dataTest[0].population).toBe(4741874);
    dataTest= await updateData({key:2, name:'China', latitude: 33.870453, longitude: -151.208755 , population: 100});
    expect(dataTest.status).toEqual(200);
    dataTest= await getData();
    expect(dataTest[0].population).toBe(100);

    // clears the server again
    await clearData();
});

