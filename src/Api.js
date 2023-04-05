
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
        }
    },

    {
        url: 'clinic-lab-packages',
        resource: 'ClinicLabPackage',
    },
    {
        url: 'clinic-nursing-tasks',
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
        url: 'clinic-lab-tests',
        resource: 'ClinicLabTest',
    },
    {
        url: 'clinic-doctors/working-hours',
        resource: 'ClinicDoctorWorkingHours',
    },
    {
        url: 'clinic-doctors/available-times',
        resource: 'ClinicDoctorAvailableTimes',
    },
    {
        url: 'clinic-doctors/available-times-by-doctor-and-clinic',
        resource: 'ClinicDoctorAvailableTimeForDayByDoctorAndClinic',
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
    {
        url: 'appointments',
        resource: 'Appointment',
    },
    {
        url: 'public/offers',
        resource: 'PublicOffer',
        custom: {
            PhoneVerify:{
                url: `${endpoint}${version}/public/offers/send-verification-code`,
                method: 'POST',
            },
            CodeVerify:{
                url: `${endpoint}${version}/public/offers/verify-code`,
                method: 'POST',
            },
        }
    },
    {
        url: 'public/clinics',
        resource: 'PublicClinic',
    },
    {
        url: 'public/services',
        resource: 'PublicService',
    },
    {
        url: 'public/categories',
        resource: 'PublicCategory',
    },
    {
        url: 'public/clinic-doctors/working-hours-by-doctor-and-clinic',
        resource: 'PublicClinicDoctorWorkingHours',
    },
    {
        url: 'public/clinic-doctors/available-times-by-doctor-and-clinic',
        resource: 'PublicClinicDoctorAvailableTimes',
    },
    {
        url: 'public/appointments/store-from-offers',
        resource: 'PublicAppointment',
    },
    {
        url: 'invoice-items',
        resource: 'InvoiceItem',
    },
    {
        url: 'public/thank-you',
        resource: 'PublicThankYouOffer',
    },
    {
        url: 'dashboard/owner/',
        resource: 'ClinicOwner',
        custom: {
            OwnerClinicRating: {
                url: `${endpoint}${version}/dashboard/owner/clinic-rating/`,
                method: 'GET',
            },
            OwnerClinicMontlyRating: {
                url: `${endpoint}${version}/dashboard/owner/clinic-monthly-rating/`,
                method: 'GET',
            },
            MonthlyIncomes: {
                url: `${endpoint}${version}/dashboard/owner/monthly-incomes/`,
                method: 'GET',
            },
            PeriodAppointments: {
                url: `${endpoint}${version}/dashboard/owner/period-appointments/`,
                method: 'GET',
            },
            PatientGenders: {
                url: `${endpoint}${version}/dashboard/owner/patient-genders/`,
                method: 'GET',
            },
            ClinicLicenses: {
                url: `${endpoint}${version}/dashboard/owner/clinic-licenses/`,
                method: 'GET',
            },
            TotalEntries: {
                url: `${endpoint}${version}/dashboard/owner/total-entries/`,
                method: 'GET',
            },
            TopServices: {
                url: `${endpoint}${version}/dashboard/owner/top-services/`,
                method: 'GET',
            },
            IncomeChannels: {
                url: `${endpoint}${version}/dashboard/owner/income-channels/`,
                method: 'GET',
            },
        },
    },
    {
        url: 'dashboard/owner/clinics',
        resource: 'ClinicOwnerClinics',
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
                updateField: {
                    url: `${endpoint}${version}/${item.url}/update-field/`,
                    method: 'POST',
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
