/* ========================================================= 
   HUOKAING THARA BANKING SYSTEM
   PHASE 12: QR SCANNER & AUTO-REDIRECT CONTROLLER
========================================================= */

(() => {
    "use strict";

    let mediaStream = null;
    let trackSettings = null;
    let torchState = false;
    let currentFacingMode = "environment";
    let isScanningActive = true;

    const videoElement = document.getElementById("cameraPreview");
    const flashBtn = document.getElementById("toggleFlashBtn");
    const switchBtn = document.getElementById("switchCameraBtn");
    const resultBox = document.getElementById("scannerResult");

    /**
     * Display status and feedback messages
     */
    function showFeedback(message, isError = false) {
        if (!resultBox) return;
        resultBox.textContent = message;
        resultBox.className = "message-box active";
        if (isError) {
            resultBox.style.borderColor = "#ef4444";
            resultBox.style.color = "#f87171";
            resultBox.style.background = "rgba(239, 68, 68, 0.1)";
        } else {
            resultBox.style.borderColor = "#38bdf8";
            resultBox.style.color = "#38bdf8";
            resultBox.style.background = "rgba(56, 189, 248, 0.1)";
        }
    }

    /**
     * Handle successful QR code detection and redirect to set amount
     */
    function handleQRDetection(qrPayload) {
        if (!isScanningActive) return;
        isScanningActive = false;

        console.log(`[QR SCANNER] Valid bank QR detected: ${qrPayload}`);
        showFeedback(`QR Code Detected! Redirecting to set transfer amount...`);

        // Stop camera streams cleanly before navigating
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        // Delay redirect slightly to let the user read the feedback
        setTimeout(() => {
            // Redirect to your withdrawal/transfer amount page with payload parameter
            window.location.href = `withdrawal.html?qr_data=${encodeURIComponent(qrPayload)}`;
        }, 1500);
    }

    /**
     * Initialize live camera stream
     */
    async function initCamera() {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        try {
            const constraints = { video: { facingMode: currentFacingMode } };
            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            videoElement.srcObject = mediaStream;

            const track = mediaStream.getVideoTracks()[0];
            trackSettings = track.getCapabilities ? track.getCapabilities() : {};

            if (trackSettings.torch) {
                flashBtn.disabled = false;
            } else {
                flashBtn.disabled = true;
            }

            // Start frame analysis loop for QR detection
            requestAnimationFrame(scanVideoFrame);
        } catch (err) {
            console.error("[QR SCANNER ERROR] Camera access failed:", err);
            showFeedback("Camera access unavailable. Please use file upload.", true);
            flashBtn.disabled = true;
        }
    }

    /**
     * Simulated frame-by-frame scanner detector (hook your barcode/QR library here)
     */
    function scanVideoFrame() {
        if (!isScanningActive) return;

        // In production, integrate a decoder library here (e.g., jsQR) scanning videoElement.
        // For demonstration, the system stays ready to intercept real detection triggers.

        if (isScanningActive) {
            requestAnimationFrame(scanVideoFrame);
        }
    }

    /**
     * Toggle device flashlight / torch API
     */
    async function toggleFlash() {
        if (!mediaStream) return;
        const track = mediaStream.getVideoTracks()[0];
        try {
            torchState = !torchState;
            await track.applyConstraints({ advanced: [{ torch: torchState }] });
            flashBtn.textContent = torchState ? "🔦 Flash ON" : "🔦 Toggle Flash";
        } catch (err) {
            console.error("[TORCH ERROR] Flashlight control failed:", err);
        }
    }

    /**
     * Switch between front and back cameras
     */
    function switchCamera() {
        currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
        initCamera();
    }

    // Expose detection trigger globally so external decoders can call it easily
    window.simulateQRFound = handleQRDetection;

    document.addEventListener("DOMContentLoaded", () => {
        initCamera();
        if (flashBtn) flashBtn.addEventListener("click", toggleFlash);
        if (switchBtn) switchBtn.addEventListener("click", switchCamera);
    });

})();
