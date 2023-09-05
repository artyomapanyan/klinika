import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            debud: true,
            fallbackLng: "en",
            en: {
                translation: {

                    Add :"add",
                    Dashboard: 'Dashboard',
                    Countries: 'Countries',
                    Areas: 'Areas',
                    Cities: 'Cities',
                    Categories: 'Categories',
                    'Sub categories': 'Sub categories',
                    Services: 'Services',
                    'Sub services': 'Sub services',
                    "Nursing tasks": "Nursing tasks",
                    'Insurance companies': 'Insurance companies',

                    "Reports": "Reports",
                    "Payment methods": "Payment methods",
                    Specialties: 'Specialties',
                    "Sub Specialties" : "Sub Specialties",
                    Posts: 'Posts',
                    Laboratory: 'Laboratory',
                    Users: 'Users',
                    User: 'Users',
                    Roles: 'Roles',
                    Doctors: 'Doctors',
                    Clinics: 'Clinics',
                    Invoices: 'Invoices',
                    "Invoice Items": "Invoice items",
                    Offers: 'Offers',
                    Coupons: 'Coupons',
                    Appointments: 'Appointments',
                    Notifications: 'Notifications',
                    Actions: 'Actions',
                    Patients: 'Patients',
                }
            },
            ar: {
                translation: {

                    Add : "إضافة",
                    Dashboard: 'لوحة التحكم',
                    Countries: 'البلدان',
                    Areas: 'المناطق',
                    Cities: 'المدن',
                    Categories: "الفئات",
                    'Sub categories': 'الفئات الفرعية',
                    Services: 'الخدمات',
                    'Sub services': 'الخدمات الفرعية',
                    "Nursing tasks": "مهام التمريض",
                    'Insurance companies': 'شركات التأمين',

                    "Reports": "التقارير",
                    "Payment methods": "وسائل الدفع",
                    Specialties: 'التخصصات',
                    "Sub Specialties" : "التخصصات الفرعية",
                    Posts: 'المشاركات',
                    Laboratory: 'المختبر',
                    Users: 'المستخدمين',
                    User: 'المستخدمين',
                    Roles: 'الأدوار',
                    Doctors: 'الأطباء',
                    Clinics: 'العيادات',
                    Invoices: 'الفواتير',
                    "Invoice Items": "عناصر الفاتورة",
                    Offers: 'العروض',
                    Coupons: 'الكوبونات',
                    Appointments: 'المواعيد',
                    Notifications: 'الإشعارات',
                    Actions: 'الإجراءات',
                    Patients: 'المرضى',
                }
            },
        },
        interpolation: {
            escapeValue: false
        }
    });

export {i18n}
