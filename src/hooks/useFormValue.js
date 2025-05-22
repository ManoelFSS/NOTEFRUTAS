import { useState } from 'react';

const useFormValue = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [codigo, setCodigo] = useState('');
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    return { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        name, 
        setName, 
        phone, 
        setPhone, 
        checkbox,
        setCheckbox,
        codigo, setCodigo,
        cpf, setCpf,
        city, setCity,
        state, setState,
        category, setCategory,
        description, setDescription
    };
};

export default useFormValue;
