
import React, {useEffect, useRef, useState} from "react";
import * as Moyasar from "devextreme/esm/ui/themes";



function MoyasarPage() {
    const formContainer = useRef(null);

    // useEffect(() => {
    //     /*
    //     The Apple Pay button won't show up in a code sandbox,
    //     but it will work on your machine.
    //     */
    //
    //     window.Moyasar({
    //         element: formContainer,
    //         // Amount in the smallest currency unit.
    //         // For example:
    //         // 10 SAR = 10 * 100 Halalas
    //         // 10 KWD = 10 * 1000 Fils
    //         // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
    //         amount: 1000,
    //         currency: "SAR",
    //         description: "Coffee Order #1",
    //         publishable_api_key: "pk_test_eLUwVUWBownQV6cmDsr825hcK5bMj8fiBS59sbZj",
    //         callback_url: "https://moyasar.com/thanks",
    //         methods: ["creditcard", "stcpay", "applepay"],
    //         apple_pay: {
    //             country: "SA",
    //             label: "Awesome Cookie Store",
    //             validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate"
    //         }
    //     });
    // }, []);

    return <div>
        {/*<div className="mysr-form" ref={(el) => (formContainer)} />*/}
    </div>
}

export default MoyasarPage