const Button = ({ text, onClick, type = "button", variant = "primary" }) => {
    const styles = variant === "primary"
      ? "bg-blue-500 hover:bg-blue-600 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-black";
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded ${styles}`}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  