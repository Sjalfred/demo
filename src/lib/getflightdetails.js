const flightsData = require('../mocks/flights')

//get artificial random delay, min and max in included
const getRandomDelay = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getFlight = (fdate, forg, fdest) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(flightsData.flights.find(el => el.date === fdate && el.org === forg && el.dest === fdest) || null);
        }, getRandomDelay(500, 800));
    });
}

exports.getflightnumber = async function (req, res) {
    try {
        // cache flight end point for 24 hours
        res.set('Cache-control', 'max-age=86400');
        const { date, org, dest } = req.params;
        getFlight(date, org, dest).then((result) => {
            if (result) {
                res.status(200).send(JSON.stringify({ 'flightnumber': result.flightno }));
            } else {
                res.status(404).send(JSON.stringify({ 'message': 'flight not found' }));
            }

        }).catch((e) => {
            res.status(500).send(JSON.stringify({ 'message': 'error occured' }));
        });

        // call another four underline mock end points parellel
        const promsToComplete = [];

        promsToComplete.push(new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log("calling api 1");
                resolve('api call1');
            }, getRandomDelay(500, 800));
        }));

        promsToComplete.push(new Promise((resolve, reject) => {
            setTimeout(() => {
                //console.log("calling api 2");
                resolve('api call 2');
            }, getRandomDelay(500, 800));
        }));

        promsToComplete.push(new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log("calling api 3");
                resolve('api call 3');
            }, getRandomDelay(500, 800));
        }));

        promsToComplete.push(new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log("calling api 4");
                resolve('api call 4');
            }, getRandomDelay(500, 800));
        }));

        //independent mock api calls
        await Promise.all(promsToComplete);

    }
    catch {
        res.status(500).send(JSON.stringify({ 'message': 'error occured' }));
    }
}