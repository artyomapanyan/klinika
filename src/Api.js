
let endpoint = process.env.REACT_APP_API_ENDPOINT+ "/api/"
let version = process.env.REACT_APP_VERSION
let api = {
    endpoint:process.env.REACT_APP_API_ENDPOINT,
    version,
    Auth: {
        login: {
            url: `${endpoint}${version}/auth/login`,
            method: 'POST',
        },
        logout: {
            url: `${endpoint}${version}/auth/logout`,
            method: 'POST',
        },
        forgot: {
            url: `${endpoint}${version}/auth/forgot`,
            method: 'POST',
        },
        reset: {
            url: `${endpoint}${version}/auth/reset`,
            method: 'POST',
        },
    }
};
[
    {
        url: 'countries',
        resource: 'Country',
    }
    ].forEach(item => {
        if (!item.type) {
            api[item.resource] = {
                list: {
                    url: `${endpoint}${version}/${item.url}`,
                    method: 'GET',
                },
                create: {
                    url: `${endpoint}${version}/${item.url}`,
                    method: 'POST',
                },
                update: {
                    url: `${endpoint}${version}/${item.url}/`,
                    method: 'PUT',
                },
                single: {
                    url: `${endpoint}${version}/${item.url}/`,
                    method: 'GET',
                },
                delete: {
                    url: `${endpoint}${version}/${item.url}/`,
                    method: 'DELETE',
                },
                all: {
                    url: `${endpoint}${version}/${item.url}/all`,
                    method: 'GET',
                },
                search: {
                    url: `${endpoint}${version}/${item.url}/search`,
                    method: 'GET',
                },
                ...item.custom
            }
        } else if (item.type === 'resource') {
            api[item.resource] = {
                all: {
                    url: `${endpoint}${version}/${item.url}/all`,
                    method: 'GET',
                },
            }
        }

    })
export default api;
