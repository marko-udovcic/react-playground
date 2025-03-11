import { useState, useRef } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
function MainForm() {
  const [userData, setUserData] = useState({
    title: "",
    nationality: "",
    education: [],
  });
  const handleSave = () => {
    const finalData = {
      ...userData,
      education: JSON.stringify(userData.education),
    };
    localStorage.setItem("userData", JSON.stringify(finalData));
  };
  const personalFormRef = useRef(null);
  let isValidationTrue =
    !personalFormRef.current?.isValid || !personalFormRef.current?.dirty;
  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <PersonalInfoForm
        setUserData={setUserData}
        userData={userData}
        ref={personalFormRef}
      />

      <EducationForm userData={userData} setUserData={setUserData} />

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
        disabled={isValidationTrue}
      >
        Save All
      </button>
    </div>
  );
}

export default MainForm;
