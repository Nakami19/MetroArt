import { useEffect } from "react";
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

export function PaypalWrapper ({ currency, pay}) {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency]);


     return (<PayPalButtons
        fundingSource="paypal"
        style={{"layout":"vertical","label":"donate"}}
        disabled={false}
        createOrder={(data, actions) => {
            return actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                                value: pay,
                                breakdown: {
                                    item_total: {
                                        currency_code: "USD",
                                        value: pay,
                                    },
                                },
                            },
                            items: [
                                {
                                    name: "donation-example",
                                    quantity: "1",
                                    unit_amount: {
                                        currency_code: "USD",
                                        value: pay,
                                    },
                                    category: "DONATION",
                                },
                            ],
                        },
                    ],
                })
                .then((orderId) => {
                    console.log("PAGADO POR PAYPAL")
                    return orderId;
                });
        }}
    />
     );
}