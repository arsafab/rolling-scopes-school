const fs = require('fs');
const https = require('https');

// File options
const options = process.argv;
const input = options[2];
const output = options[3];

// Create array of urls from input file
const urls = fs.readFileSync(input, 'utf-8').toString().split('\n');

// PageSpeed options
const key = 'AIzaSyBsyGVWnQKDraIq2S25wZ_QYzN0EWAdSBI';
const strategy = 'desktop';

const gaOptions = (url) => {
    return {
        host: 'www.googleapis.com', 
        path: `/pagespeedonline/v4/runPagespeed?url=${url}&key=${key}&strategy=${strategy}`
    }    
}

// Get object with data of one url from PageSpeed
const getData = (response) => {
    let data = '';

    response.setEncoding('utf8');

    response.on('data', (chunk) => { 
        data += chunk; 
    });

    response.on('end', () => {
        try {
            fs.appendFile(output, data);
        } catch (e) {
            console.error(e.message);
        }
    });
}

// Send GET-request for every url of array
urls.forEach(url => {
    https.get(gaOptions(url), (res) => {
        res.on('data', (d) => {
            process.stdout.write(d);
            getData(res);
        });        
    }).on('error', (e) => {
        console.error(e)
    });
});
