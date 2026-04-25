const WHATSAPP_NUMBER = "525534633490";

// 🔥 CLOUDINARY CONFIG
const CLOUD_NAME = "dv914x1xe";
const UPLOAD_PRESET = "nexayuc_upload";

const form = document.getElementById("orderForm");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

// 🖼 PREVIEW
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

// 🚀 SUBMIT
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Subiendo imagen...";

  try {
    const name = getValue("name");
    const phone = getValue("phone");
    const city = getValue("city");
    const product = getValue("product");
    const link = getValue("link");

    let imageUrl = "";

    // 🔥 SUBIR A CLOUDINARY
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      imageUrl = data.secure_url;
    }

    const message = `
Hola, quiero solicitar una cotización en NexaYuc.

Nombre: ${name}
Teléfono: ${phone}
Ciudad/Municipio: ${city}
Producto: ${product}
Link: ${link || "No tengo"}
Imagen: ${imageUrl || "No envié imagen"}

Quedo pendiente.
`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  } catch (error) {
    console.error(error);
    alert("Error al subir imagen 😢");
  } finally {
    button.disabled = false;
    button.textContent = "Enviar por WhatsApp";
  }
});

// 🔧 HELPER
function getValue(id) {
  return document.getElementById(id)?.value.trim() || "";
}
