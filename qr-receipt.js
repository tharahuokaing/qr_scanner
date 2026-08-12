/* =========================================================
   AUTOMATED RECEIPT SAVING UPON SUCCESSFUL QR SCAN / PAYMENT
========================================================= */

/**
 * Triggered automatically when the QR payment scan is successful.
 * @param {Object} paymentData - Details from the scanned transaction
 */
function handleSuccessfulQRPayment(paymentData) {
    // 1. Construct the receipt payload
    const receiptRecord = {
        id: "QR-REC-" + Math.floor(100000 + Math.random() * 900000),
        transactionRef: paymentData.ref || "ABA-KHQR-VERIFIED",
        merchant: paymentData.merchant || "Legend Cinema",
        amount: parseFloat(paymentData.amount) || 0.00,
        currency: paymentData.currency || "USD",
        customerName: paymentData.customerName || "Valued Customer",
        items: paymentData.items || "Movie Tickets & Seats",
        paymentMethod: "KHQR / Scan to Pay",
        status: "SUCCESS",
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    // 2. Save automatically to LocalStorage
    saveReceiptToLocalStorage(receiptRecord);

    // 3. Render success state and display receipt popup/download
    displayAutoSavedReceiptModal(receiptRecord);
}

/**
 * Helper to persist records in browser storage securely
 */
function saveReceiptToLocalStorage(receipt) {
    const STORAGE_KEY = "legend_cinema_bookings";
    try {
        const existingRecords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        existingRecords.unshift(receipt); // Add newest receipt to the top
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRecords));
        console.log("Receipt successfully saved automatically:", receipt.id);
    } catch (error) {
        console.error("Failed to save receipt to storage:", error);
    }
}

/**
 * Display visual confirmation and receipt popup
 */
function displayAutoSavedReceiptModal(receipt) {
    const successModal = document.getElementById("successSection") || document.getElementById("receiptModal");
    
    if (successModal) {
        successModal.classList.add("active");
        
        // Populate dynamic labels if they exist in your DOM
        const receiptIdEl = document.getElementById("confirmedTicketId");
        const amountEl = document.getElementById("confirmedPrice");
        
        if (receiptIdEl) receiptIdEl.textContent = receipt.id;
        if (amountEl) amountEl.textContent = `$${receipt.amount.toFixed(2)} (${receipt.currency})`;
    } else {
        // Fallback notification if modal element is missing
        alert(`Payment Successful! Receipt [${receipt.id}] saved automatically.`);
    }
}
