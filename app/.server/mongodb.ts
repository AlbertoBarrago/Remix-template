// app/mongodb.server.ts

import { MongoClient } from 'mongodb';

let mongodb: MongoClient;

async function connectToDatabase() {
    if (mongodb) return mongodb;

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined');

    const client = new MongoClient(uri);
    await client.connect();

    mongodb = client;
    return mongodb;
}

export async function getDb() {
    const client = await connectToDatabase();
    return client.db('albz-blog');
}

export async function closeDb() {
    if (mongodb) {
        await mongodb.close();
        mongodb = null;
    }
}
