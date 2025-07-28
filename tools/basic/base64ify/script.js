/**
 * Base64ify - Image ⇄ Base64 converter
 * Author: Mc-Ben Ba-Ana Ostemobo
 * Description: Vanilla JavaScript implementation for converting images to base64 and vice versa.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Handle tab switching
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn =>
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    })
  );

  // Image to Base64 Conversion
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const base64Output = document.getElementById("base64Output");
  const downloadButton = document.getElementById("downloadBase64");

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target.result;
      imagePreview.src = base64String;
      base64Output.value = base64String;
    };
    reader.readAsDataURL(file);
  });

  downloadButton.addEventListener("click", () => {
    const text = base64Output.value;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "base64.txt";
    link.click();
  });

  // Base64 to Image Conversion
  const base64Input = document.getElementById("base64Input");
  const decodedImage = document.getElementById("decodedImage");

  base64Input.addEventListener("input", () => {
    const base64 = base64Input.value.trim();
    if (base64.startsWith("data:image")) {
      decodedImage.src = base64;
    } else {
      decodedImage.src = "";
    }
  });
});

  const downloadImageBtn = document.getElementById("downloadImage");

  downloadImageBtn.addEventListener("click", () => {
    const imageSrc = decodedImage.src;
    if (!imageSrc.startsWith("data:image")) {
      alert("Please paste a valid Base64 image first.");
      return;
    }

    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "decoded-image.png";
    link.click();
  });
