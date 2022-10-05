const noAuthRoutes = [
    {
        url : "/auth",
        method : 'POST'
    },
    {
        url : "/auth/register",
        method : 'POST'
    },
    {
        url : "/publication",
        method : 'GET'
    },
    {
        url : "/publication/like",
        method : 'PUT'
    },
];

const adminRoutes = [
    {
        url : "/auth",
        method : 'POST'
    },
    {
        url : "/user",
        method : 'POST'
    },
    {
        url : "/user",
        method : "GET"
    },
    {
        url : "/user",
        method : "DELETE"
    },
];

module.exports = { noAuthRoutes, adminRoutes }