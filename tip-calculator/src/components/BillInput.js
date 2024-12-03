export function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <p>How much was the bill</p>
      <input
        type="text"
        placeholder="enter bill"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}
