import { View } from "react-native";
import { Input, Button } from "native-base";
import { useFormik, FormikHelpers } from "formik";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { initialValues, validationSchema } from "./ChangeFirstnameScreen.form";
import { styles } from "./ChangeFirstnameScreen.styles";

// Define the type for the form values
interface FormValues {
  firstname: string;
}

// Create an instance of the User controller
const userController = new User();

// ChangeFirstnameScreen component
export function ChangeFirstnameScreen() {
  // Use navigation hook for navigating screens
  const navigation = useNavigation();
  // Use auth hook to get access token and update user function
  const { accessToken, updateUser } = useAuth();

  // Initialize formik with initial values, validation schema, and submit function
  const formik = useFormik<FormValues>({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, formikHelpers: FormikHelpers<FormValues>) => {
      try {
        // Prepare the data for updating the user's firstname
        const dataUser = { firstname: formValue.firstname };
        // Attempt to update the user's firstname
        await userController.updateUser(accessToken, dataUser);
        // Update local user state
        updateUser("firstname", formValue.firstname);
        // Navigate back to the previous screen
        navigation.goBack();
      } catch (error) {
        // Log any errors to the console
        console.error(error);
      } finally {
        // Set submitting to false after the form submission attempt
        formikHelpers.setSubmitting(false);
      }
    },
  });

  // Render the input and button for changing the firstname
  return (
    <View style={styles.content}>
      <Input
        placeholder="First Name"
        variant="unstyled"
        autoFocus
        value={formik.values.firstname}
        onChangeText={(text) => formik.setFieldValue("firstname", text)}
        style={[styles.input, formik.errors.firstname && styles.inputError]}
      />
      <Button
        style={styles.btn}
        onPress={formik.handleSubmit}
        // Corrected isLoading to isSubmitting for consistency with useFormik
        isLoading={formik.isSubmitting}
      >
        Change
      </Button>
    </View>
  );
}
