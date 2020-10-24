const redis = require('redis');
const redisConfig = require('../config/redis');

const redisClient = redis.createClient(redisConfig.port, redisConfig.host);

redisClient.on('connect', () => {
    console.log('redis ta rolando');
})

async function redisGet(key, isHashMap){
    const redisOperation = isHashMap 
    ? 'hgetall'
    : 'get'
    
    return new Promise((resolve, reject) => {
        redisClient[redisOperation](key, (err, resp) => {
            if(err) reject(err);

            resolve(resp)
        })
    })
}

async function redisSet(key, value){
    let redisOperation; 
    
    if(typeof value === 'object' && !Array.isArray(value)){
        redisOperation = 'hmset';
    } else if (typeof value === 'number' || typeof value === 'string'){
        redisOperation = 'set';
    } else {
        throw new Error('Supplied unexpected data type to redisSet function');
    }
    
    return new Promise((resolve, reject) => {
        redisClient[redisOperation](key, value, (err, resp) => {
            if(err) reject(err);

            resolve(resp)
        })
    })
}

module.exports = {
    redisClient,
    redisGet,
    redisSet
};