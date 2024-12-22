function init() {
  // Get the Upload image

  const imageFileElement = document.querySelector("#image-upload");
  const topText = document.querySelector("#top-text");
  const bottomText = document.querySelector("#bottom-text");
  const canvas = document.querySelector("#canvas");
  const downloadButton = document.querySelector("#download");

  // get the canvas context
  const ctx = canvas.getContext("2d");

  // Need to use the ctx to draw the image and text over it
  imageFileElement.addEventListener("change", () => {
    const file = imageFileElement.files[0];

    const image = new Image();

    image.src = URL.createObjectURL(file);

    image.onload = () => {
      // Get the canvas dimensions
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;

      // Calculate the scaling factor to fit the image within the canvas
      const scaleFactor = Math.min(
        canvasWidth / image.width,
        canvasHeight / image.height
      );

      // Calculate the new image dimensions
      const newWidth = image.width * scaleFactor;
      const newHeight = image.height * scaleFactor;

      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      // Set the font and text color
      ctx.font = "16px Arial";
      ctx.fillStyle = "white";

      // Draw the text over the image
      ctx.fillText(topText.value, 20, 20);
      ctx.fillText(bottomText.value, 20, ctx.canvas.height - 20);

      URL.revokeObjectURL(image.src);
    };
  });

  // download the image
  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = ctx.canvas.toDataURL();
    link.download = "image.png";
    link.click();
  });
}

init();
