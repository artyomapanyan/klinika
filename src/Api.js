
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
            AvailableTimes:{
                url: `${endpoint}${version}/clinic/available-times/`,
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
        url: 'reports',
        resource: 'Report',
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
        url: 'languages',
        resource: 'Language',
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
        url: 'clinic-doctors/working-hours',
        resource: 'ClinicDoctorWorkingHoursTable',
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
            ApproveDecline: {
                url: `${endpoint}${version}/clinic-doctors`,
                method: 'POST',
            },

        }
    },
    {
        url: 'appointments',
        resource: 'Appointment',
        // custom: {
        //     AppointmentStatus:{
        //         url: `${endpoint}${version}/appointments/`,
        //         method: 'POST',
        //     },
        // }
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
        url: 'clinic-doctors/working-hours-by-doctor-and-clinic',
        resource: 'ClinicDoctorWorkingHours',
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
        url: 'invoices',
        resource: 'Invoice',
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
            PeriodIncomes: {
                url: `${endpoint}${version}/dashboard/owner/period-incomes/`,
                method: 'GET',
            },
            NewPatients: {
                url: `${endpoint}${version}/dashboard/owner/new-patients/`,
                method: 'GET',
            },
        },
    },
    {
        url: 'dashboard/manager/',
        resource: 'ClinicManager',
        custom: {
            MonthlyAppointments: {
                url: `${endpoint}${version}/dashboard/manager/monthly-appointments/`,
                method: 'GET',
            },
            MonthlyTelehealths: {
                url: `${endpoint}${version}/dashboard/manager/appointment-telehealths/`,
                method: 'GET',
            },
            Statuses: {
                url: `${endpoint}${version}/dashboard/manager/appointment-statuses/`,
                method: 'GET',
            },
            DoctorWorkload: {
                url: `${endpoint}${version}/dashboard/manager/doctors-workload/`,
                method: 'GET',
            },
        },
    },
    {
        url: 'dashboard/owner/clinics',
        resource: 'ClinicOwnerClinics',
    },
    {
        url: 'clinic-doctors/pending-requests',
        resource: 'ApproveClinicDoctor',

    },
    {
        url: 'dashboard/doctor',
        resource: 'DoctorReworked',
        custom: {
            MonthlyAppointments: {
                url: `${endpoint}${version}/dashboard/doctor/monthly-appointments/`,
                method: 'GET',
            },
            TelehealeAppointment: {
                url: `${endpoint}${version}/dashboard/doctor/appointment-telehealths/`,
                method: 'GET',
            },
            AppointmentStatuses: {
                url: `${endpoint}${version}/dashboard/doctor/appointment-statuses/`,
                method: 'GET',
            },
            DoctorCalendar: {
                url: `${endpoint}${version}/dashboard/doctor/calendar/`,
                method: 'GET',
            },
            PeriodAppointmentStats: {
                url: `${endpoint}${version}/dashboard/doctor/period-appointment-stats/`,
                method: 'GET',
            },
            TotalEntries: {
                url: `${endpoint}${version}/dashboard/doctor/total-entries/`,
                method: 'GET',
            },
            Notifications: {
                url: `${endpoint}${version}/dashboard/doctor/notifications/`,
                method: 'GET',
            },
        },
    },
    {
        url: 'dashboard/admin',
        resource: 'SuperAdmin',
        custom: {
            AdminTotalClinic: {
                url: `${endpoint}${version}/dashboard/admin/total-clinics/`,
                method: 'GET',
            },
            MontlyIncomes: {
                url: `${endpoint}${version}/dashboard/admin/monthly-incomes/`,
                method: 'GET',
            },
            SuperAdminClinicsStatuses: {
                url: `${endpoint}${version}/dashboard/admin/clinic-statuses`,
                method: 'GET',
            },
            SuperAdminConfirmedClinic: {
                url: `${endpoint}${version}/dashboard/admin/confirmed-clinics`,
                method: 'GET',
            },
            PeriodAppointments: {
                url: `${endpoint}${version}/dashboard/admin/period-appointments`,
                method: 'GET',
            },
            SuperAdminPlatform: {
                url: `${endpoint}${version}/dashboard/admin/platform-stats`,
                method: 'GET',
            },
            SuperAdminIncomes: {
                url: `${endpoint}${version}/dashboard/admin/period-incomes`,
                method: 'GET',
            },
            SuperAdminGender: {
                url: `${endpoint}${version}/dashboard/admin/patient-genders`,
                method: 'GET',
            },
            SuperAdminclinicLicenses: {
                url: `${endpoint}${version}/dashboard/admin/clinic-licenses`,
                method: 'GET',
            },
            ProfitableTable: {
                url: `${endpoint}${version}/dashboard/admin/profitable-clinics`,
                method: 'GET',
            },

        },
    },
    {
        url: 'auth/profile/notifications/',
        resource: 'Notifications',
        custom: {
            MarkAllAsRead: {
                url: `${endpoint}${version}/auth/profile/notifications/mark-all-as-read/`,
                method: 'GET',
            },

        },

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
                exportPdf: {
                    url: `${endpoint}${version}/${item.url}`,
                    method: 'GET',
                },
                updateField: {
                    url: `${endpoint}${version}/${item.url}/update-field/`,
                    method: 'POST',
                },
                appointmentStatus: {
                    url: `${endpoint}${version}/${item.url}/`,
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
