import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, forwardRef, useImperativeHandle } from "react";
import ErrorSpan from "../components/ErrorSpan";

const PersonalInfoForm = forwardRef(({ userData, setUserData }, ref) => {
  const formik = useFormik({
    initialValues: {
      title: userData.title || "",
      nationality: userData.nationality || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      nationality: Yup.string()
        .required("Nationality is required")
        .min(3, "Nationality must be at least 3 characters long"),
    }),
  });
  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];
  useEffect(() => {
    setUserData((prev) => ({ ...prev, ...formik.values }));
  }, [formik.values, setUserData]);

  useImperativeHandle(ref, () => formik);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
      <label htmlFor="title">
        <ErrorSpan showError={showError} name="title" />
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Add title"
        value={formik.values.title}
        className="border p-2 w-full"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <label htmlFor="nationality">
        <ErrorSpan showError={showError} name="nationality" />
      </label>
      <input
        type="text"
        className="border p-2 w-full"
        id="nationality"
        name="nationality"
        placeholder="Add nationality"
        value={formik.values.nationality}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </form>
  );
});

export default PersonalInfoForm;
