function UserInfo() {
  const savedData = JSON.parse(localStorage.getItem("userData"));
  const education = JSON.parse(savedData.education);
  console.log("saved data is", savedData);
  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">User Info</h1>
      <p>{savedData.nationality}</p>
      <h2 className="text-lg font-semibold mb-2">Education List:</h2>
      {education.map((item, i) => {
        return (
          <div key={i}>
            <p>{item.degree}</p>
            <p>{item.dateRange}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UserInfo;
