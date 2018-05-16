module.exports = {
    session: {
        name: 'username',
        secret: 'password',
        url: "mongodb://localhost:27017/crawler"
    },
    spiderConfig: {
        page: 10,
    }
}