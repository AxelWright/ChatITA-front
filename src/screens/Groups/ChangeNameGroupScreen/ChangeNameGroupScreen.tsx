import { View } from "react-native";
import { Button, Input } from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { Group } from "../../../api";
import { useAuth } from "../../../hooks";
import { initialValues, validationSchema } from "./ChangeNameGroupScreen.form";
import { styles } from "./ChangeNameGroupScreen.styles";

// Define the structure for the form values
interface FormValues {
  name: string;
}

// Create an instance of the Group controller
const groupController = new Group();

// ChangeNameGroupScreen component
export function ChangeNameGroupScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<any>(); // Use any or a more specific type for route parameters
  const { accessToken } = useAuth();

  // Initialize formik with initial values, validation schema, and submit function
  const formik = useFormik<FormValues>({
    initialValues: initialValues(params.groupName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        // Attempt to update the group name
        await groupController.update(accessToken, params.groupId, {
          name: formValue.name,
        });
        // Navigate back three screens
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
      } catch (error) {
        // Log any errors to the console
        console.error(error);
      }
    },
  });

  // Render the input and button for changing the group name
  return (
    <View style={styles.content}>
      <Input
        placeholder="Group Name"
        variant="unstyled"
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        style={[styles.input, formik.errors.name && styles.inputError]}
      />
      <Button
        onPress={formik.handleSubmit}
        style={styles.btn}
        isLoading={formik.isSubmitting}
      >
        Change
      </Button>
    </View>
  );
}
