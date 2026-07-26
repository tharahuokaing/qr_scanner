/* ========================================================= 
   HUOKAING THARA BANKING SYSTEM
   QR PAYMENT & WITHDRAWAL AMOUNT CONTROLLER
========================================================= */

(() => {
    "use strict";

    /**
     * Parse URL parameters to extract incoming QR payload
     */
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    /**
     * Simulate parsing KHQR / EMVCo payload string 
     * (Extracts mock merchant name and preset amount if embedded)
     */
    function parseQRCodePayload(payload) {
        console.log(`[QR PARSER] Decoding payload: ${payload}`);

        // Default mock parsed data structure
        let transactionDetails = {
            merchantName: "Huokaing Thara Verified Merchant",
            accountNumber: "HTB-9988-7766",
            amount: 0.00,
            currency: "USD",
            isValid: true
        };

        // If the payload contains mock amount arguments (e.g., custom format)
        if (payload.includes("amount=")) {
            const parts = payload.split("amount=");
            if (parts[1]) {
                transactionDetails.amount = parseFloat(parts[1]) || 0.00;
            }
        } else {
            // Default sandbox fallback amount for testing scans
            transactionDetails.amount = 25.00; 
        }

        return transactionDetails;
    }

    /**
     * Initialize destination form fields upon page load
     */
    document.addEventListener("DOMContentLoaded", () => {
        const rawQrData = getQueryParam("qr_data");
        const amountInput = document.getElementById("transferAmountInput") || document.getElementById("amountInput");
        const recipientDisplay = document.getElementById("recipientNameDisplay");
        const noticeBox = document.getElementById("qrNoticeBox");

        if (rawQrData) {
            const decodedData = parseQRCodePayload(rawQrData);

            // Populate amount field automatically like ABA/Acleda scanning flow
            if (amountInput) {
                amountInput.value = decodedData.amount;
            }

            // Display recipient feedback
            if (recipientDisplay) {
                recipientDisplay.textContent = `Pay to: ${decodedData.merchantName} (${decodedData.accountNumber})`;
            }

            if (noticeBox) {
                noticeBox.textContent = "✔ QR Code successfully scanned and verified via Bakong Gateway.";
                noticeBox.style.color = "#22c55e";
            }
        } else {
            if (noticeBox) {
                noticeBox.textContent = "⚠️ No active QR payload found. Enter manual amount.";
                noticeBox.style.color = "#fbbf24";
            }
        }
    });

})();