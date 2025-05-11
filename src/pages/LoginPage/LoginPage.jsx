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
import { login } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { slideInFromRight } from "../../motion/motion";

const LoginPage = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(33, "Password must not exceed 33 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, options) => {
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome ${res.user.name}!`);
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
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
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={slideInFromRight()}
              >
                Account Login
              </motion.h2>
              <motion.h3
                initial="hidden"
                animate="visible"
                variants={slideInFromRight(1)}
              >
                Enter your details to access your personal contact collection.
              </motion.h3>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={slideInFromRight(1.2)}
              >
                If you dont have an account yet, you can sign up by clicking the
                link below. Get back access to and manage your contacts with
                ease!
              </motion.p>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginPage;
