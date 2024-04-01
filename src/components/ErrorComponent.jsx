/* eslint-disable react/prop-types */

const ErrorComponent = ({ label, error }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{label}</h1>
      <p className="text-red-500">Error: {error.message}</p>
    </div>
  );
};

export default ErrorComponent;
