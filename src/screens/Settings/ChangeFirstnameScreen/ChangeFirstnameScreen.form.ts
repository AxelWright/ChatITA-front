import * as Yup from "yup";

// Define the structure for the initial values of the form
export function initialValues(): { firstname: string } {
  return {
    firstname: "", // Start with an empty string for the firstname
  };
}

// Define the validation schema using Yup
export function validationSchema() {
  return Yup.object({
    // The firstname field is a string and is required
    firstname: Yup.string().required("First name is required"),
  });
}
