/* ========================================================= 
   HUOKAING THARA BANKING SYSTEM
   FILE UPLOAD & VERIFICATION CONTROLLER (upload.js)
========================================================= */

(() => {
    "use strict";

    // Configuration constraints
    const MAX_FILE_SIZE_MB = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

    /**
     * Display feedback message to the user.
     * @param {string} message - The text message to display.
     * @param {string} type - The status type ('success' or 'error').
     */
    function showFeedback(message, type = "success") {
        const feedbackBox = document.getElementById("uploadFeedback") || createFeedbackBox();
        
        feedbackBox.textContent = message;
        feedbackBox.className = `feedback-box ${type}`;
        
        console.log(`[UPLOAD MODULE] Status (${type.toUpperCase()}): ${message}`);
    }

    /**
     * Dynamically creates a feedback container if it doesn't exist in the DOM.
     */
    function createFeedbackBox() {
        const box = document.createElement("div");
        box.id = "uploadFeedback";
        box.className = "feedback-box";
        
        const targetSection = document.querySelector(".upload-section") || document.body;
        targetSection.appendChild(box);
        return box;
    }

    /**
     * Handles the file verification and processing logic.
     * @param {Event} event - The file input change event.
     */
    function handleFileSelection(event) {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (!file) {
            return;
        }

        // 1. Verify File Type
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            showFeedback("Invalid file format. Please upload a valid image (JPEG, PNG, or WEBP).", "error");
            fileInput.value = ""; // Reset input
            return;
        }

        // 2. Verify File Size
        if (file.size > MAX_FILE_SIZE_BYTES) {
            showFeedback(`File is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`, "error");
            fileInput.value = ""; // Reset input
            return;
        }

        // 3. Successful Verification & Processing Simulation
        showFeedback(`File "${file.name}" verified successfully! Processing upload...`, "success");

        const reader = new FileReader();
        reader.onload = (e) => {
            // File data loaded successfully as base64 string or binary stream
            const fileDataResult = e.target.result;
            
            // Execute custom callback or dispatch event for downstream handlers
            triggerUploadSubmission(file.name, fileDataResult);
        };

        reader.onerror = () => {
            showFeedback("An error occurred while reading the file. Please try again.", "error");
        };

        reader.readAsDataURL(file);
    }

    /**
     * Simulates sending the validated file payload to the backend server.
     */
    function triggerUploadSubmission(fileName, dataPayload) {
        // Placeholder for secure fetch API request to server backend
        setTimeout(() => {
            console.log(`[UPLOAD API] Payload for "${fileName}" ready for transmission.`);
            showFeedback(`File "${fileName}" uploaded and processed securely!`, "success");
        }, 1000);
    }

    // Initialize Event Listeners on DOM Load
    document.addEventListener("DOMContentLoaded", () => {
        const uploadInput = document.getElementById("qrUploadInput") || document.getElementById("fileUploadInput");

        if (uploadInput) {
            uploadInput.addEventListener("change", handleFileSelection);
            console.log("[UPLOAD MODULE] Controller initialized and listening for file inputs.");
        } else {
            console.warn("[UPLOAD MODULE] Warning: Target file input element not found in DOM.");
        }
    });

})();
