// PLEASE DON'T change function name
module.exports = function makeExchange(currency) {
	if(currency > 10000 ) return {error: "You are rich, my friend! We don't have so much coins for exchange"};
    const config = {
        H: 50,
        Q: 25,
        D: 10,
        N: 5,
        P: 1
    }
    const result = {};
    let coins = currency;

    for (let key in config) {
        if(coins >= config[key]) {
            const fullPart = Math.floor(coins / config[key]);
            result[key] = fullPart;
            coins -= fullPart * config[key];
        }
    }

    return result;
}
