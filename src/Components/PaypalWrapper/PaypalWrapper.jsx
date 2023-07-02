import { useEffect, useState } from "react";
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function PaypalWrapper ({ currency, pay}) {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        style={{"layout":"vertical","label":"donate", 'color':'silver'}}
        disabled={false}
        forceReRender={[pay]}
        onClick={ function(){
            setShow(true)
            return(
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )
        }
        }
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
                    return orderId;
                })
        }}
        
    />
     );
}