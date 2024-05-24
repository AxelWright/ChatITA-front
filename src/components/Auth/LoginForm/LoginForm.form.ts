import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object().shape({
    email: Yup.string().email("Debe ser un correo válido").required("El correo es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });
}
