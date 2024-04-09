// JavaScript Code
function updateOutput() {
  const outputArea = document.getElementById("outputArea");
  const textInput = document.getElementById("textInput").value;
  outputArea.innerText = textInput.replace(/(.{30})/g, "$1\n");
}

function limitInputLength() {
  const maxLength = 80;
  const input = document.getElementById("textInput");
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
  updateOutput(); // Call updateOutput to update textoverlay when input changes
  document.getElementById("maxCharacters").textContent = `${maxLength - input.value.length
    } characters left`;
}
function downloadImage9_16() {
  const container = document.querySelector(".container");
  const image = container.querySelector(".image");
  const textOverlay = container.querySelector(".output-text");
  let text = textOverlay.innerText;

  // Replace newline characters (\n) with HTML line break (<br>) tags
  console.log(text);
  text = text.replace(/\n/g, "<br>");

  // Create a new canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions to match the original image dimensions
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  // Add the background image to the canvas for the 9:16 aspect ratio
  const bgImage = new Image();
  bgImage.src = "eid_image.png";
  bgImage.onload = function () {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // Calculate scaling factor based on the original image dimensions
    const scaleFactorX = canvas.width / image.width;
    const scaleFactorY = canvas.height / image.height;
    const scaleFactor = Math.min(scaleFactorX, scaleFactorY);

    // Adjust font size based on the scaling factor
    const originalFontSize = parseFloat(
      window.getComputedStyle(textOverlay).fontSize
    );
    const scaledFontSize = originalFontSize * scaleFactor;
    ctx.font =
      scaledFontSize +
      "px " +
      window.getComputedStyle(textOverlay).fontFamily;

    // Draw text overlay on the canvas with adjusted font size
    ctx.fillStyle = window.getComputedStyle(textOverlay).color;
    // ctx.textAlign = "center";
    ctx.textAlign = window.getComputedStyle(textOverlay).textAlign;
    ctx.textBaseline = "bottom"; // Align text to the bottom

    // Split the text into lines based on HTML line break (<br>) tags

    const lines = text.split("<br>");
    console.log(text);

    // Calculate the starting y position for the text
    // const startY = canvas.height - 3500; // Adjust the bottom value as needed

    // Calculate the starting y position for the text
    let startY;
    if (lines.length === 1) {
      startY = canvas.height - 2850; // Position for 1 line
      console.log("Number of lines:", lines.length);
    } else if (lines.length === 4) {
      startY = canvas.height - 3150; // Position for 2 lines
      console.log("Number of lines:", lines.length);
    } else {
      startY = canvas.height - 3400; // Position for 3 lines
      console.log("Number of lines:", lines.length);
    }

    // Draw each line of text on the canvas starting from the calculated startY position
    lines.forEach((line, index) => {
      const y = startY + index * scaledFontSize * 0.4; // Adjust this multiplier as needed
      ctx.fillText(line, canvas.width / 2, y);
    });

    // Convert canvas to data URL and trigger download
    canvas.toBlob(
      function (blob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "image_with_text_9_16.jpeg";
        link.click();
      },
      "image/jpeg",
      1
    ); // Specify quality as 1 (highest)
  };
}

function downloadImage1_1() {
  const container = document.querySelector(".container");
  const image = container.querySelector(".image");
  const textOverlay = container.querySelector(".output-text");
  let text = textOverlay.innerText;

  // Replace newline characters (\n) with HTML line break (<br>) tags
  text = text.replace(/\n/g, "<br>");

  // Create a new square canvas element
  const squareCanvas = document.createElement("canvas");
  const size = Math.min(image.naturalWidth, image.naturalHeight);
  squareCanvas.width = size;
  squareCanvas.height = size;
  const squareCtx = squareCanvas.getContext("2d");

  // Draw the image on the square canvas
  squareCtx.drawImage(
    image,
    (image.naturalWidth - size) / 2,
    (image.naturalHeight - size) / 2,
    size,
    size,
    0,
    0,
    size,
    size
  );

  // Adjust font size based on the scaling factor
  const originalFontSize = parseFloat(
    window.getComputedStyle(textOverlay).fontSize
  );
  const scaledFontSize = originalFontSize * (size / image.width);
  squareCtx.font =
    scaledFontSize +
    "px " +
    window.getComputedStyle(textOverlay).fontFamily;

  // Draw text overlay on the square canvas
  squareCtx.fillStyle = window.getComputedStyle(textOverlay).color;
  squareCtx.textAlign = "center";
  squareCtx.textBaseline = "bottom"; // Align text to the bottom

  // Split the text into lines based on HTML line break (<br>) tags
  const squareLines = text.split("<br>");

  // Calculate the starting y position for the text
  let startY;
  if (squareLines.length === 1) {
    startY = squareCanvas.height - 750; // Position for 1 line
    console.log("Number of lines:", squareLines.length);
  } else if (squareLines.length === 4) {
    startY = squareCanvas.height - 900; // Position for 2 lines
    console.log("Number of lines:", squareLines.length);
  } else {
    startY = squareCanvas.height - 1200; // Position for 3 lines
    console.log("Number of lines:", squareLines.length);
  }

  // Draw each line of text on the canvas starting from the calculated startY position
  squareLines.forEach((line, index) => {
    const y = startY + index * scaledFontSize * 0.4; // Adjust this multiplier as needed
    squareCtx.fillText(line, squareCanvas.width / 2, y);
  });

  // Convert canvas to data URL and trigger download
  squareCanvas.toBlob(
    function (blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image_square_1_1_with_text_9_16.jpeg";
      link.click();
    },
    "image/jpeg",
    1
  ); // Specify quality as 1 (highest)
}

function downloadImage() {
  const button = event.target;
  if (button.id === "downloadButton9_16") {
    downloadImage9_16();
  } else if (button.id === "downloadButton1_1") {
    downloadImage1_1();
  }
}