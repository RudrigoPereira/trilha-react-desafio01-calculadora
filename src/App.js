import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row, InternalRow } from './styles';
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');
  const [expression, setExpression] = useState('');
  const [isResultShown, setIsResultShown] = useState(false);

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
    setExpression('');
  };

  const handleAddNumber = (num) => {
    if (isResultShown) {
      handleOnClear();
      setIsResultShown(false);
    }
    setCurrentNumber(prev => (['0', '+', '-', 'x', '÷'].includes(prev) ? num : `${prev}${num}`));
    setExpression(prev => prev === '0' ? num : `${prev}${num}`);
  };

  const performPendingOperation = () => {
    const operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      'x': (a, b) => a * b,
      '÷': (a, b) => {
        if (currentNumber === '0') {
          alert('Cannot divide by zero');
          return currentNumber;
        }
        return a / b;
      },
    };

    if (operation && firstNumber !== '0' && !['+', '-', 'x', '÷'].includes(currentNumber)) {
      const result = operations[operation](Number(firstNumber), Number(currentNumber));
      setCurrentNumber(String(result));
      setFirstNumber(String(result));
      setExpression(`${firstNumber} ${operation} ${currentNumber} = ${result}`);
      setOperation('');
    }
  };

  const handleOperation = (operationType) => {
    if (isResultShown) {
      setExpression(currentNumber);
      setIsResultShown(false);
    }

    if (currentNumber === '0' && firstNumber === '0') return;

    if (['+', '-', 'x', '÷'].includes(currentNumber)) {
      setOperation(operationType);
      setCurrentNumber(operationType);
      setExpression(prev => prev.slice(0, -1) + operationType);
      return;
    } 

    performPendingOperation();

    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber(operationType);
      setOperation(operationType);
      setExpression(prev => `${prev} ${operationType}`);
    } else {
      setCurrentNumber(operationType);
      setOperation(operationType);
      setExpression(prev => `${prev} ${operationType}`);
    }
  };

  const handleSumNumbers = () => handleOperation('+');
  const handleMinusNumbers = () => handleOperation('-');
  const handleMultNumbers = () => handleOperation('x');
  const handleDivNumbers = () => handleOperation('÷');

  const handleEquals = () => {
    performPendingOperation();
    setExpression('');
    setIsResultShown(true);
  };

  const renderNumberButtons = (numbers) => {
    return numbers.map((num) => (
      <Button key={num} label={num} onClick={() => handleAddNumber(num)} />
    ));
  };

  return (
    <Container>
      <Content>
        <Input value={expression || currentNumber} />
        <Row>
          <InternalRow>
            <Button label="C" onClick={handleOnClear} color='darkorange' />
          </InternalRow>
          <Button label="÷" onClick={handleDivNumbers} color='darkorange' />
        </Row>
        <Row>
          {renderNumberButtons(['7', '8', '9'])}
          <Button label="x" onClick={handleMultNumbers} color='darkorange' />
        </Row>
        <Row>
          {renderNumberButtons(['4', '5', '6'])}
          <Button label="-" onClick={handleMinusNumbers} color='darkorange' />
        </Row>
        <Row>
          {renderNumberButtons(['1', '2', '3'])}
          <Button label="+" onClick={handleSumNumbers} color='darkorange' />
        </Row>
        <Row>
          <InternalRow>
            <Button label="0" onClick={() => handleAddNumber('0')} />
          </InternalRow>
          <Button label="=" onClick={handleEquals} color='darkorange' />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
