const redis = require('redis');
const client = redis.createClient();


const RedisConfig ={
    host: process.env.REDIS_HOST,
    port: 6379,
    client:client,
    ttl:604800
};

module.exports = session =>{
    const redisStore = require('connect-redis')(session);
    return new redisStore(RedisConfig);
}