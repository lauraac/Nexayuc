const WHATSAPP_NUMBER = "525534633490";

const form = document.getElementById("orderForm");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

if (imageInput && preview) {
  imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) {
      preview.style.display = "none";
      preview.src = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      preview.src = event.target.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = getValue("name");
  const phone = getValue("phone");
  const city = getValue("city");
  const product = getValue("product");
  const link = getValue("link");
  const hasImage = imageInput && imageInput.files.length > 0;

  const message = `
Hola, quiero solicitar una cotización en NexaYuc.

Nombre: ${name}
Teléfono: ${phone}
Ciudad/Municipio: ${city}
Producto: ${product}
Link: ${link || "No tengo"}

${hasImage ? "También tengo una imagen del producto; la enviaré aquí en WhatsApp." : ""}

Quedo pendiente de mi cotización.
`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
});

function getValue(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}
