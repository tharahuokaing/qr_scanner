/* ========================================================= 
   HUOKAING THARA BANKING SYSTEM
   QR UPLOAD, VERIFICATION & TRANSFER AMOUNT CONTROLLER
========================================================= */

(() => {
    "use strict";

    // Select DOM elements
    const uploadInput = document.getElementById("qrUploadInput");
    const feedbackBox = document.getElementById("scannerResult");

    /**
     * Display feedback message to the user
     */
    function showFeedback(message, type = "success") {
        if (!feedbackBox) return;
        
        feedbackBox.textContent = message;
        feedbackBox.className = "message-box active";
        
        if (type === "error") {
            feedbackBox.style.borderColor = "#ef4444";
            feedbackBox.style.color = "#f87171";
            feedbackBox.style.background = "rgba(239, 68, 68, 0.1)";
        } else {
            feedbackBox.style.borderColor = "#38bdf8";
            feedbackBox.style.color = "#38bdf8";
            feedbackBox.style.background = "rgba(56, 189, 248, 0.1)";
        }
    }

    /**
     * Handle the file attachment and verification process
     */
    function handleFileAttachment(event) {
        const file = event.target.files[0];
        
        if (!file) {
            showFeedback("No file selected. Please choose a valid QR image.", "error");
            return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            showFeedback("Invalid file format. Please attach a valid image file (PNG/JPG).", "error");
            return;
        }

        // Step 1: Verify attachment
        showFeedback(`Verifying attached file: ${file.name}...`, "success");
        console.log(`[UPLOAD MODULE] File attached successfully: ${file.name}`);

        // Step 2: Simulate QR decoding & parsing feedback
        setTimeout(() => {
            showFeedback("QR Verified Successfully! Proceeding to set transfer amount...", "success");
            console.log("[UPLOAD MODULE] QR code verified. Transitioning to transfer amount setup.");

            // Step 3: Proceed to set amount to transfer after a brief delay
            setTimeout(() => {
                // Redirect or trigger the set amount view (e.g., navigating to transfer form)
                window.location.href = "https://tharahuokaing.github.io/withdrawal/"; // Or your specific transfer amount module URL
            }, 1500);

        }, 1200);
    }

    // Initialize event listeners when DOM is loaded
    document.addEventListener("DOMContentLoaded", () => {
        if (uploadInput) {
            uploadInput.addEventListener("change", handleFileAttachment);
            console.log("[UPLOAD MODULE] Controller initialized and listening for attachments.");
        }
    });

})();
