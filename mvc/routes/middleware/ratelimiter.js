const ratelimiter = require("express-rate-limit");

const postLimit = ratelimiter({
    windowMs: 60 * 60 * 1000,
    max: 20,
    draft_polli_ratelimit_headers: true,
});

const getLimit = ratelimiter({
    windowMs: 60 * 1000,
    max: 60,
    draft_polli_ratelimit_headers: true,
});

module.exports = {
    postLimit,
    getLimit,
}