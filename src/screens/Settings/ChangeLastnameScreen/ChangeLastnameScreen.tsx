import { View } from "react-native";
import { Input, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { initialValues, validationSchema } from "./ChangeLastnameScreen.form";
import { styles } from "./ChangeLastnameScreen.styles";

// Define the type for the form values
interface FormValues {
  lastname: string;
}

// Create an instance of the User controller
const userController = new User();

// ChangeLastnameScreen component
export function ChangeLastnameScreen() {
  // Use navigation hook for navigating screens
  const navigation = useNavigation();
  // Use auth hook to get access token and update user function
  const { accessToken, updateUser } = useAuth();

  // Initialize formik with initial values, validation schema, and submit function
  const formik = useFormik<FormValues>({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        // Attempt to update the user's lastname
        await userController.updateUser(accessToken, formValue);
        // Update local user state
        updateUser("lastname", formValue.lastname);
        // Navigate back to the previous screen
        navigation.goBack();
      } catch (error) {
        // Log any errors to the console
        console.error(error);
      }
    },
  });

  // Render the input and button for changing the lastname
  return (
    <View style={styles.content}>
      <Input
        placeholder="Last Name"
        variant="unstyled"
        autoFocus
        value={formik.values.lastname}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        style={[styles.input, formik.errors.lastname && styles.inputError]}
      />
      <Button
        style={styles.btn}
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      >
        Change
      </Button>
    </View>
  );
}
