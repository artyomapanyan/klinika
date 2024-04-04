import { useEffect, useRef } from "react";
import {useSelector} from "react-redux";
import './MoyasarPage.sass'

export default function MoyasarPage({data, isSaudi}) {
    let ids = useSelector((state) => state.moyasarIds)
    const formContainerRef = useRef(null);


    console.log(data, isSaudi, 'oooo')

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
            amount: isSaudi ? (data?.new_price_after_vat_saudi * 100) : (data?.new_price_after_vat_non_saudi * 100),
            currency: "SAR",
            description: "Coffee Order #1",
            publishable_api_key: "pk_test_iApwnNsTDexnwuvNTTvfW2efHY4FY5yYLqzBxQ4T",
            callback_url: `https://front.klinikatech.com/offers/${data?.id}/thank-you`,
            methods: ["creditcard", "stcpay", "applepay"],
            apple_pay: {
                country: "SA",
                label: "Awesome Cookie Store",
                validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate"
            },
            metadata: {
                'appointment_id' : ids?.appointment_id,
                'invoice_id' : ids?.invoice_id,
            }
        });
    }, []);

    return (
        <div>
            <div className="mysr-form" ref={formContainerRef} />
        </div>
    );
}
