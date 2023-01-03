
let endpoint = process.env.REACT_APP_API_ENDPOINT+ "/api/"
let version = process.env.REACT_APP_VERSION
let api = {
    endpoint:process.env.REACT_APP_API_ENDPOINT,
    apiEndpoint:endpoint,
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
        switchRole: {
            url: `${endpoint}${version}/auth/switch-role`,
            method: 'POST',
        },
    }
};
[
    {
        url: 'countries',
        resource: 'Country',
    },
    {
        url: 'regions',
        resource: 'Region',
    },
    {
        url: 'cities',
        resource: 'City',
    },
    {
        url: 'categories',
        resource: 'Category',
    },
    {
        url: 'sub-categories',
        resource: 'SubCategory',
    },
    {
        url: 'services',
        resource: 'Service',
    },
    {
        url: 'sub-services',
        resource: 'SubService',
    },
    {
        url: 'nursing-tasks',
        resource: 'NursingTask',
    },
    {
        url: 'lab-packages',
        resource: 'LabPackage',
    },
    {
        url: 'lab-tests',
        resource: 'LabTest',
    },
    {
        url: 'taxonomies',
        resource: 'Taxonomy',
    },
    {
        url: 'insurance-companies',
        resource: 'InsuranceCompany',
    },
    {
        url: 'payment-methods',
        resource: 'PaymentMethod',
    },
    {
        url: 'roles',
        resource: 'Role',
    },
    {
        url: 'permissions',
        resource: 'Permission',
    },
    {
        url: 'doctors',
        resource: 'Doctor',
    },
    {
        url: 'users',
        resource: 'User',
    },
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
