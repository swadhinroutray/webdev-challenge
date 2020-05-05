const redis = require('redis');
const client = redis.createClient(6379,process.env.REDIS_HOST);


const RedisConfig ={
    client:client,
    ttl:604800
};

module.exports = session =>{
    const redisStore = require('connect-redis')(session);
    return new redisStore(RedisConfig);
}