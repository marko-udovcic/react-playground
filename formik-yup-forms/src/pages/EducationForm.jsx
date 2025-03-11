import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorSpan from "../components/ErrorSpan";

const EducationForm = ({ userData, setUserData }) => {
  const formik = useFormik({
    initialValues: {
      degree: "",
      dateRange: "",
    },
    validationSchema: Yup.object({
      degree: Yup.string()
        .min(3, "Min 3 characters")
        .required("Degree, School is Required"),
      dateRange: Yup.string()
        .matches(
          /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4} - (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/,
          "Format must be: 'January 2024 - January 2025'"
        )
        .required("Date is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setUserData((prev) => ({
        ...prev,
        education: [...prev.education, values],
      }));

      resetForm();
    },
  });
  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div className=" max-w-lg mx-auto ]">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="degree">
            <ErrorSpan showError={showError} name="degree" />
          </label>
          <input
            type="text"
            name="degree"
            placeholder="Degree, School"
            value={formik.values.degree}
            onChange={formik.handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="dateRange">
            <ErrorSpan showError={showError} name="dateRange" />
          </label>
          <input
            type="text"
            name="dateRange"
            placeholder="Start Date Year – End Date Year (January 2024 – January 2025)"
            value={formik.values.dateRange}
            onChange={formik.handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Add Education
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Education List:</h2>
        {userData.education.length === 0 ? (
          <p className="text-gray-500">No education added yet.</p>
        ) : (
          <ul className="space-y-2">
            {userData.education.map((edu, index) => (
              <li
                key={index}
                className="p-2 border rounded flex justify-between items-center"
              >
                <span>
                  {edu.degree} ({edu.dateRange})
                </span>
                <button
                  onClick={() =>
                    setUserData((prev) => ({
                      ...prev,
                      education: prev.education.filter((_, i) => i !== index),
                    }))
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationForm;
