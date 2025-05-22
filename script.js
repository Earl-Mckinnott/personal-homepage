function revealMessage() {
                document.getElementById("cool-text").textContent = "Boom. You just ran your first Javascript function.";
            }

            function toggleDarkMode() {
                const body = document.body;
                const isDark= body.classList.contains("dark-mode");

                body.classList.remove("techno-mode");
                body.classList.toggle("dark-mode");
                
                if(body.classList.contains("dark-mode")) {
                    body.style.backgroundColor= "";
                } else {
                    updateScrollBackground();
                }
            }

            function toggleTechnoMode(){
                const body= document.body;
                const isTechno= body.classList.contains("techno-mode");
                body.classList.remove("dark-mode");
                body.classList.toggle("techno-mode");

                if (body.classList.contains("techno-mode")) {
                    body.style.backgroundColor = "";
                } else {
                    updateScrollBackground();
                }
            }

            function updateScrollBackground() {
                const body= document.body;
    if(body.classList.contains("dark-mode") || body.classList.contains("techno-mode")){
        return;
    }    

    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / maxScroll;



    //interpolate between white and blue
    const red= Math.round(173 - (103 * scrollPercent)); // from 255 to 0
    const green= Math.round(216 - (86 * scrollPercent));
    const blue = Math.round(230 - (50 * scrollPercent)); // stay at full blue
    body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

}
            

            function showFamily(){
                const photoDiv= document.getElementById("family-photo");
                const button= document.getElementById("show-family-btn");

                button.remove();
                photoDiv.innerHTML= `
                <img src= "family.jpg" alt="family" width="350" class="fade-in" />
                <p class="fade-in">This is My Family</p>
                `;
            }

window.addEventListener("scroll", updateScrollBackground);

const canvas = document.getElementById("reveal-canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "profile.jpeg";

img.onload = () => {
  // Draw the clear image on a hidden canvas
  const clearCanvas = document.createElement("canvas");
  clearCanvas.width = canvas.width;
  clearCanvas.height = canvas.height;
  const clearCtx = clearCanvas.getContext("2d");
  clearCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const clearData = clearCtx.getImageData(0, 0, canvas.width, canvas.height);

  // Draw the pixelated version on the visible canvas
  const pixelScale = 0.05;
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = canvas.width * pixelScale;
  tempCanvas.height = canvas.height * pixelScale;

  tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);

  // Overlay the clear image
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = canvas.width;
  maskCanvas.height = canvas.height;
  const maskCtx = maskCanvas.getContext("2d");
  maskCtx.putImageData(clearData, 0, 0);

  let drawing = false;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  }

  function erase(pos) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.restore();
  }

  canvas.addEventListener("mousedown", e => {
    drawing = true;
    erase(getPos(e));
  });

canvas.addEventListener("mousemove", e => {
  const isLeftClick = e.buttons === 1;

  if (drawing || !isLeftClick) {
    erase(getPos(e));
  }
});

  canvas.addEventListener("mouseup", () => drawing = false);
  canvas.addEventListener("mouseleave", () => drawing = false);

  canvas.addEventListener("touchstart", e => {
    drawing = true;
    erase(getPos(e));
  }, { passive: false });

  canvas.addEventListener("touchmove", e => {
    if (drawing) erase(getPos(e));
  }, { passive: false });

  canvas.addEventListener("touchend", () => drawing = false);
};
    