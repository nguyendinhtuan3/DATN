import Button from "@/components/ui/button"; 

const Button = ({ text, onClick, className, type = "button" }) => (
  <button type={type} onClick={onClick} className={`px-4 py-2 rounded ${className}`}>
    {text}
  </button>
);

export default Button;