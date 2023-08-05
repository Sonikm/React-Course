
 // Show Error message when data is not able to fetch becaouse of offline or else
 export default function ErrorMessage({ error }) {
  return (
    <p className="error">
      <span>🚨</span> {error}
    </p>
  );
}