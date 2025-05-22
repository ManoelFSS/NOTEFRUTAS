import { useState } from 'react';

const useSelect = () => {
    const [select, setSelect] = useState('Todos');
    return { select, setSelect };
};

export default useSelect;
