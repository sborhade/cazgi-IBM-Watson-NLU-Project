const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.api_key;
    let api_url = process.env.api_url;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;

}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {

    const nlu = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
                'emotion': true,
                'limit': 1,
            },
            'keywords': {
                'emotion': true,
                'limit': 1,
            },
        },
        "language": "en"
    };

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults));
            let response = JSON.stringify(analysisResults, null, 2);
            //if (response)
            console.log((JSON.parse(response).result.keywords));
            response = JSON.parse(response).result.keywords;
            return res.send(JSON.stringify(response));
        })
        .catch(err => {
            console.log('yeeeee error:', err);
        });

});

app.get("/url/sentiment", (req, res) => {
    const nlu = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
                'sentiment': true,
                'limit': 1,
            },
            'keywords': {
                'sentiment': true,
                'limit': 50,
            },
        },
        "language": "en"
    };

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults));
            let response = JSON.stringify(analysisResults, null, 2);
            //if (response)
            console.log((JSON.parse(response).result.keywords));
            response = JSON.parse(response).result.keywords;
            return res.send(JSON.stringify(response));
        })
        .catch(err => {
            console.log('yeeeee error:', err);
        });

});

app.get("/text/emotion", (req, res) => {
    const nlu = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            //   'entities': {
            //         'emotion': true,
            //     },
            keywords: {
                'emotion': true
                , limit: 1
            }
        },
        "language": "en"
    };

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults));
            let response = JSON.stringify(analysisResults, null, 2);
            //if (response)
            response = JSON.parse(response).result.keywords;
            console.log((JSON.stringify(response)));
            return res.send(JSON.stringify(response));
        })
        .catch(err => {
            console.log('yeeeee error:', err);
        });
});

app.get("/text/sentiment", (req, res) => {
    const nlu = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'keywords': {
                'sentiment': true,
                'limit': 1
            }
        },
        "language": "en"
    };

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults));
            let response = JSON.stringify(analysisResults, null, 2);
            //if (response)
            console.log((JSON.parse(response).result.keywords));
            response = JSON.parse(response).result.keywords;


            return res.send(JSON.stringify(response));
        })
        .catch(err => {
            console.log('yeeeee error:', err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

