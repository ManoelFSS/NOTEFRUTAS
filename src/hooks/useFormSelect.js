import { useState } from 'react';

const useLFormSelect = () => {
    const [selectForm, setSelectForm] = useState("login");
    return { selectForm, setSelectForm };
};

export default useLFormSelect;
