function ErrorSpan({ showError, name, labelName = null }) {
  return showError(name) ? (
    <span className="text-[13px] text-red-600">{showError(name)}</span>
  ) : (
    labelName
  );
}

export default ErrorSpan;
