import * as Yup from 'yup';

// Define the structure for the initial values of the form
export function initialValues(name: string): { name: string } {
  return {
    name, // The initial value for 'name' is set from the argument
  };
}

// Define the validation schema using Yup
export function validationSchema() {
  return Yup.object({
    // The 'name' field is a string and is required
    name: Yup.string().required('Name is required'),
  });
}
