
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
    {
        url: 'posts',
        resource: 'Post',
    },
    {
        url: 'translations',
        resource: 'Translation',
    },
    {
        url: 'preferences',
        resource: 'Preference',
    },
    {
        url: 'clinics',
        resource: 'Clinic',
        custom:{
            WorkingHours:{
                url: `${endpoint}${version}/clinics/working-hours/`,
                method: 'GET',
            },
            LabTest:{
                url: `${endpoint}${version}/clinics/lab-tests/`,
                method: 'GET',
            },
            LabPackage:{
                url: `${endpoint}${version}/clinics/lab-packages/`,
                method: 'GET',
            },
            NursingTask:{
                url: `${endpoint}${version}/clinics/nursing-tasks/`,
                method: 'GET',
            }
        }
    },
    {
        url: 'clinics/lab-tests',
        resource: 'ClinicLabTest',
    },
    {
        url: 'clinics/lab-packages',
        resource: 'ClinicLabPackage',
    },
    {
        url: 'clinics/nursing-tasks',
        resource: 'ClinicNursingTask',
    },
    {
        url: 'offers',
        resource: 'Offer',
    },
    {
        url: 'clinics/working-hours',
        resource: 'ClinicWorkingHours',
    },
    {
        url: 'coupons',
        resource: 'Coupon',
    },
    {
        url: 'clinic-doctors/working-hours',
        resource: 'ClinicDoctorWorkingHours',
    },
    {
        url: 'clinic-doctors',
        resource: 'ClinicDoctor',
        custom: {
            WorkingHours:{
                url: `${endpoint}${version}/clinic-doctors/working-hours/`,
                method: 'GET',
            },
        }
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
                exportExcel: {
                    url: `${endpoint}${version}/${item.url}/export`,
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
