import { useState } from 'react';

const useToogleMenu = () => {
    const [toogleMenu, setToogleMenu] = useState(false);
    return { toogleMenu, setToogleMenu };
};

export default useToogleMenu;
