import * as React from 'react';

const NumberInput = ({ value, onChange }) => (
    <input type="number" value={value} onChange={(e) => onChange(parseInt(e.target.value, 10))} />
);

export default NumberInput;