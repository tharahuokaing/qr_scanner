/* =========================================================
   AUTO-SAVE & RECEIPT DISPLAY AFTER SCAN SUCCESS
========================================================= */

/**
 * Automatically saves the transaction data and renders the receipt view.
 * @param {Object} scanResult - The data obtained from the QR scan.
 */
function handleScanAndAutoSave(scanResult) {
    // 1. Construct the receipt payload
    const receiptData = {
        id: "REC-" + Math.floor(100000 + Math.random() * 900000),
        title: scanResult.movie || "General Admission",
        showtime: scanResult.time || "N/A",
        seats: scanResult.seats || ["N/A"],
        price: scanResult.price || 0.00,
        paymentMethod: "QR Scan / ABA KHQR",
        scannedAt: new Date().toLocaleString()
    };

    // 2. Save automatically to localStorage history
    const STORAGE_KEY = "legend_cinema_bookings";
    const existingRecords = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    existingRecords.unshift(receiptData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRecords));

    // 3. Render and pop up the receipt view automatically
    renderAndDisplayReceipt(receiptData);
}

/**
 * Dynamically displays the receipt on the UI screen.
 */
function renderAndDisplayReceipt(ticket) {
    const receiptContainer = document.getElementById("successSection");
    
    if (!receiptContainer) {
        console.warn("Success receipt section element not found in DOM.");
        return;
    }

    // Populate receipt fields if elements exist
    document.getElementById("confirmedTicketId")?.setTextContent?.(ticket.id) || 
        (document.getElementById("confirmedTicketId").textContent = ticket.id);
    document.getElementById("confirmedMovie").textContent = ticket.title;
    document.getElementById("confirmedTime").textContent = ticket.showtime;
    document.getElementById("confirmedPrice").textContent = `$${ticket.price.toFixed(2)}`;
    document.getElementById("confirmedSeats").textContent = Array.isArray(ticket.seats) ? ticket.seats.join(", ") : ticket.seats;

    // Show the success container
    receiptContainer.classList.add("active");
    
    // Optional: Auto trigger QR generation if container exists
    if (typeof generateReceiptQRCode === "function") {
        generateReceiptQRCode(ticket);
    }
}
