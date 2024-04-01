import { useEffect, useRef } from "react";

export default function MoyasarPage() {
    const formContainerRef = useRef(null);

    useEffect(() => {
        /*
        The Apple Pay button won't show up in a code sandbox,
        but it will work on your machine.
        */

        if (!formContainerRef.current) return;

        window.Moyasar.init({
            element: formContainerRef.current,
            // Amount in the smallest currency unit.
            // For example:
            // 10 SAR = 10 * 100 Halalas
            // 10 KWD = 10 * 1000 Fils
            // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
            amount: 1000,
            currency: "SAR",
            description: "Coffee Order #1",
            publishable_api_key: "pk_test_QJBQNAFCiKkLDwTRKXEwaLfyGq7F8mPkoqa91Qqx",
            callback_url: "https://moyasar.com/thanks",
            methods: ["creditcard", "stcpay", "applepay"],
            apple_pay: {
                country: "SA",
                label: "Awesome Cookie Store",
                validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate"
            },
            // metadata: {
            //     'appointment_id' : 15,
            //     'invoice_id' : 258,
            // }
        });
    }, []);

    return (
        <div>
            <div className="mysr-form" ref={formContainerRef} />
        </div>
    );
}
