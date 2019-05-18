import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as path from 'path';
import { router } from './router';
import { Connector } from './config';
import { initializeApp, credential, firestore } from 'firebase-admin';
// const hash = "$2b$10$WW/7QGzkIqe9T5dQ6b4o0.bVBd4vRJ2jg4271A96xojuL3UYjSvhu";
// const hash2 = "$2b$10$CJL2kfMvvHkl9EGushhAjexpmDHUvYV27QWZmMWXVenmezSQDjnTC";
// console.log(Connector.comparePass("123456789", hash));
initializeApp({
    credential: credential.cert(require('../public/small-talk-1b8d3-4376ff1cb8f9.json')),
    databaseURL: "https://small-talk-1b8d3.firebaseio.com"
});
var fs = firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
fs.settings(settings);
const app = express();
try {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api', router);
} catch (error) {
    
}


// TODO : dev mode
// A utiliser pour changer le port
// app.listen(process.env.PORT || 4000,()=>{});

// TODO : prod mode
app.listen(process.env.PORT || 80,()=>{});