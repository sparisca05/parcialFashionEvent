import React, { useEffect } from "react";

declare global {
    interface Window {
        MercadoPago: any;
    }
}

interface PaymentFormProps {
    publicKey: string;
    onTokenGenerated: (token: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ publicKey, onTokenGenerated }) => {
    useEffect(() => {
        // Configura el SDK de Mercado Pago
        const mp = new window.MercadoPago(publicKey, {locale: "es-AR"});

        // Monta el CardForm
        const cardForm = mp.cardForm({
            amount: "1000",
            iframe: true,
            form: {
                id: "form-checkout",
                cardNumber: {
                    id: "form-checkout__cardNumber",
                    placeholder: "Numero de tarjeta",
                },
                expirationDate: {
                    id: "form-checkout__expirationDate",
                    placeholder: "MM/YY",
                },
                securityCode: {
                    id: "form-checkout__securityCode",
                    placeholder: "Código de seguridad",
                },
                cardholderName: {
                    id: "form-checkout__cardholderName",
                    placeholder: "Titular de la tarjeta",
                },
                issuer: {
                    id: "form-checkout__issuer",
                    placeholder: "Banco emisor",
                },
                installments: {
                    id: "form-checkout__installments",
                    placeholder: "Cuotas",
                },
                identificationType: {
                    id: "form-checkout__identificationType",
                    placeholder: "Tipo de documento",
                },
                identificationNumber: {
                    id: "form-checkout__identificationNumber",
                    placeholder: "Número del documento",
                },
                cardholderEmail: {
                    id: "form-checkout__cardholderEmail",
                    placeholder: "E-mail",
                },
            },
            callbacks: {
                onFormMounted: (error: any) => {
                    if (error) return console.warn("Form Mounted handling error: ", error);
                    console.log("Form mounted");
                },
                onSubmit: (event: Event) => {
                    event.preventDefault();

                    const {
                        paymentMethodId: payment_method_id,
                        issuerId: issuer_id,
                        cardholderEmail: email,
                        amount,
                        token,
                        installments,
                        identificationNumber,
                        identificationType,
                    } = cardForm.getCardFormData();

                    console.log(token);
                    fetch("https://api.mercadopago.com/v1/payments", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token,
                            issuer_id,
                            payment_method_id,
                            transaction_amount: Number(amount),
                            installments: Number(installments),
                            description: "Descripción del producto",
                            payer: {
                                email,
                                identification: {
                                    type: identificationType,
                                    number: identificationNumber,
                                },
                            },
                        }),
                    });
                },
                onFetching: (resource: any) => {
                    console.log("Fetching resource: ", resource);

                    // Animate progress bar
                    const progressBar = document.querySelector(".progress-bar");
                    progressBar?.removeAttribute("value");

                    return () => {
                        progressBar?.setAttribute("value", "0");
                    };
                }
            },
        });

    }, [publicKey, onTokenGenerated]);

    return (
        <div id={"form-checkout"}>
            <form id="form-checkout" className={"form-container"}>
                <div id="form-checkout__cardNumber" className="input-container"></div>
                <div id="form-checkout__expirationDate" className="input-container"></div>
                <div id="form-checkout__securityCode" className="input-container"></div>
                <input type="text" id="form-checkout__cardholderName"/>
                <select id="form-checkout__issuer"></select>
                <select id="form-checkout__installments"></select>
                <select id="form-checkout__identificationType"></select>
                <input type="text" id="form-checkout__identificationNumber"/>
                <input type="email" id="form-checkout__cardholderEmail"/>

                <button type="submit" id="form-checkout__submit">Pagar</button>
                <progress value="0" className="progress-bar">Cargando...</progress>
            </form>
        </div>
    );
};

export default PaymentForm;
