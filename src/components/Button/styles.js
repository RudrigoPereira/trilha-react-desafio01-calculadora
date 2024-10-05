import styled from 'styled-components';

export const ButtonContainer = styled.button`
    padding: 20px;
    border: 1px solid #CDCDCD;
    border-radius: 10px;
    /* background-color: #00AAF0; */
    background-color: ${(props) => props.color};
    color: #FFFFFF;
    /* color: darkblue; */
    font-size: 24px;
    font-weight: 700;
    flex: 1;
    
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
    &:disabled {
        background-color: white;
        color: white;
        border: none;
    }
`