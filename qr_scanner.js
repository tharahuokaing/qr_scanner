/* ========================================================= 
   HUOKAING THARA BANKING SYSTEM
   PHASE 12: QR CODE SCANNER & UPLOAD CONTROLLER
========================================================= */

(() => {
    "use strict";

    let mediaStream = null;
    let trackSettings = null;
    let torchState = false;
    let currentFacingMode = "environment"; // Default to back camera

    const videoElement = document.getElementById("cameraPreview");
    const flashBtn = document.getElementById("toggleFlashBtn");
    const switchBtn = document.getElementById("switchCameraBtn");
    const uploadInput = document.getElementById("qrUploadInput");
    const resultBox = document.getElementById("scannerResult");

    function showResult(text, isError = false) {
        resultBox.textContent = `Scanned Data: ${text}`;
        resultBox.className = "message-box active";
        if (isError) {
            resultBox.style.borderColor = "#ef4444";
            resultBox.style.color = "#f87171";
        }
        console.log(`[PHASE 12 QR] Processed payload: ${text}`);
    }

    // Initialize Camera Stream
    async function initCamera() {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        try {
            const constraints = {
                video: { facingMode: currentFacingMode }
            };
            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            videoElement.srcObject = mediaStream;

            const track = mediaStream.getVideoTracks()[0];
            trackSettings = track.getCapabilities ? track.getCapabilities() : {};

            // Enable torch button if hardware supports it
            if (trackSettings.torch) {
                flashBtn.disabled = false;
            } else {
                flashBtn.disabled = true;
                flashBtn.title = "Flashlight not supported on this device/browser";
            }
        } catch (err) {
            console.error("[PHASE 12 ERROR] Camera access denied or unavailable:", err);
            showResult("Camera access unavailable. Use file upload option.", true);
            flashBtn.disabled = true;
        }
    }

    // Toggle Flash / Torch Function
    async function toggleFlash() {
        if (!mediaStream) return;
        const track = mediaStream.getVideoTracks()[0];
        try {
            torchState = !torchState;
            await track.applyConstraints({
                advanced: [{ torch: torchState }]
            });
            flashBtn.textContent = torchState ? "🔦 Flash ON" : "🔦 Toggle Flash";
        } catch (err) {
            console.error("[PHASE 12 ERROR] Failed to toggle torch:", err);
        }
    }

    // Switch Camera Facing Mode
    function switchCamera() {
        currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
        initCamera();
    }

    // Handle Uploaded QR Image File Simulation
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            // Simulated decoding response for uploaded QR graphic
            showResult(`Successfully parsed uploaded file: ${file.name}`);
        };
        reader.readAsDataURL(file);
    }

    // Event Listeners
    document.addEventListener("DOMContentLoaded", () => {
        initCamera();

        if (flashBtn) flashBtn.addEventListener("click", toggleFlash);
        if (switchBtn) switchBtn.addEventListener("click", switchCamera);
        if (uploadInput) uploadInput.addEventListener("change", handleImageUpload);
    });

})();
