export function Output({ bill, tip }) {
  return (
    <h3>
      You pay {bill} (${bill} + ${tip} tip)
    </h3>
  );
}
