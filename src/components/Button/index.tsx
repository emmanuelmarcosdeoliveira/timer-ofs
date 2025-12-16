import { ButtonContainer, type ButtonVariants } from "./Button.styles";

interface ButtonProps {
  variant?: ButtonVariants;
}

const Button = ({ variant = "primary" }: ButtonProps) => {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
};

export default Button;
