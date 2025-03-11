import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorSpan from "../components/ErrorSpan";
function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("firstname is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .matches(/^(?!.*,).*$/, "Email must not contain a comma.")
        .required("Email is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[\W_]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      image: Yup.mixed().required("required"),
      dateOfBirth: Yup.date().required("required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div>
      <h1>Register</h1>
      <form
        className="flex flex-col space-y-4 w-[500px] mx-auto border border-blue-400 p-[15px] rounded-md"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="firstName">
          <ErrorSpan
            showError={showError}
            name="firstName"
            labelName="First Name"
          />
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="firstname"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />

        <label htmlFor="lastName">
          <ErrorSpan showError={showError} name="lastName" />
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="lastname"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />

        <label htmlFor="email">
          Email <ErrorSpan showError={showError} name="email" />
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <label htmlFor="password">
          password <ErrorSpan showError={showError} name="password" />
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <select value={formik.values.gender} onChange={formik.handleChange}>
          <option value="female" defaultChecked>
            female
          </option>
          <option value="male">male</option>
        </select>

        <label htmlFor="dateOfBirth">dateOfBirth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
        />

        <label htmlFor="image">image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) =>
            formik.setFieldValue(e.target.name, e.target.files[0])
          }
        />

        <button
          type="submit"
          className="px-[10px] bg-blue-400 rounded-md p-2 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
