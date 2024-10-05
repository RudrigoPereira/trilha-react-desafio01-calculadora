
import { ButtonContainer } from './styles';

const Button = ({label, onClick, color = `#00AAF0`}) => {
    return (
      <ButtonContainer onClick={onClick} type="button" color={color}>
       {label}
      </ButtonContainer>
    );
  }
  
  export default Button;