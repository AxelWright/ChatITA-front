import * as Yup from "yup";

// Define the structure for the initial values of the form
export function initialValues(): { lastname: string } {
  return {
    lastname: "", // Start with an empty string for the lastname
  };
}

// Define the validation schema using Yup
export function validationSchema() {
  return Yup.object({
    // The lastname field is a string and is required
    lastname: Yup.string().required("Last name is required"),
  });
}
