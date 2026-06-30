import api from "./api";

export const downloadInvoice = (billId) =>
    api.get(

        `/pdf/invoice/${billId}`,

        {
            responseType: "blob"
        }
    );

export const downloadReceipt = (paymentId) =>
    api.get(

        `/pdf/receipt/${paymentId}`,

        {
            responseType: "blob"
        }
    );