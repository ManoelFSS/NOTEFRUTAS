import { useState } from 'react';

const useSelect = () => {
    const [select, setSelect] = useState('Todas');
    return { select, setSelect };
};

export default useSelect;
