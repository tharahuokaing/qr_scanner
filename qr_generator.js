/* ========================================================= 
   HUOKAING THARA BANKING SYSTEM
   DYNAMIC QR CODE GENERATOR CONTROLLER
========================================================= */

(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        const generateBtn = document.getElementById("generateQRBtn");
        const amountInput = document.getElementById("qrAmountInput");
        const resultArea = document.getElementById("generatedQRResult");

        if (generateBtn && amountInput && resultArea) {
            generateBtn.addEventListener("click", () => {
                const amount = amountInput.value.trim();

                if (!amount || amount <= 0) {
                    resultArea.innerHTML = `<p style="color: #ef4444; font-size: 0.85rem;">Please enter a valid amount to generate QR.</p>`;
                    return;
                }

                const payload = `HTB_TRANSFER_PAYLOAD:AMOUNT=${amount}:CURRENCY=USD`;

                resultArea.innerHTML = `
                    <div style="background: #ffffff; padding: 12px; border-radius: 8px; display: inline-block; margin-bottom: 8px;">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(payload)}" alt="Generated Payment QR" style="display: block; margin: 0 auto;">
                    </div>
                    <p style="color: #38bdf8; font-size: 0.85rem; margin: 0;">Ready to scan: $${amount}</p>
                `;
            });
        }
    });

})();
