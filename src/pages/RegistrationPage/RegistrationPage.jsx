import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { motion } from "framer-motion";
import { slideInFromBot, slideInFromRight } from "../../motion/motion";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Login must be at least 3 characters")
      .required("Login is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(33, "Password must not exceed 33 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, options) => {
    dispatch(register(values));

    options.resetForm();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values, errors, touched }) => (
            <Form
              initial="hidden"
              animate="visible"
              variants={slideInFromBot()}
            >
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.email)}
                helperText={touched.name && errors.email}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={slideInFromRight()}
              >
                Create your account
              </motion.h2>
              <motion.h3
                initial="hidden"
                animate="visible"
                variants={slideInFromRight(1)}
              >
                Join our Contact Book app to keep all your important contacts in
                one place.
              </motion.h3>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={slideInFromRight(1.2)}
              >
                Registration will allow you to have access to your personal
                collection of contacts from any device. Just fill out the form
                below and start enjoying all the benefits of our service!
              </motion.p>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
