import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre está vacío" });
  }
  if (email.trim() === "") {
    errores.push({ mensaje: "El email está vacío" });
  }
  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El mensaje está vacío" });
  }

  if (errores.length > 0) {
    //consultar testimoniales
    const testimoniales = await Testimoniales.findAll();

    //mostrar vista con errores
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      nombre,
      email,
      mensaje,
      testimoniales,
    });
  } else {
    //almacenar testimonio en la DB
    try {
      await Testimoniales.create({
        nombre,
        email,
        mensaje,
      });
      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};

export { guardarTestimonial };
