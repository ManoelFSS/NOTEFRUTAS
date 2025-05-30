
export const produtos = [
    { name: 'Mamão', value: 10000 },
    { name: 'Melancia', value: 8000 },
    { name: 'Maçã', value: 6700 },
    { name: 'Goiaba', value: 5700 },
    { name: 'Pimentão', value: 4400 },
    { name: 'Laranja', value: 2400 },
    { name: 'Cebola', value: 4400 },
];

export const estoque = [
    { name: 'Mamão', stock: 3000, minStock: 4000 },
    { name: 'Melancia', stock: 1000, minStock: 2000 },
    { name: 'Maçã', stock: 80, minStock: 100 },
    { name: 'Banana', stock: 5500, minStock: 6000 },
    { name: 'Goiaba', stock: 0, minStock: 6000 },
    { name: 'Melão', stock: 2000, minStock: 4000 },
    { name: 'Pimentão', stock: 9000, minStock: 10000 },
    { name: 'Cebola', stock: 0, minStock: 1000 },
    { name: 'Abacaxi', stock: 4400, minStock: 7100 },
    { name: 'Laranja', stock: 200, minStock: 1000 },
    { name: 'Cebola', stock: 0, minStock: 1000 },
    { name: 'Abacaxi', stock: 4400, minStock: 7100 },
    { name: 'Laranja', stock: 200, minStock: 1000 },
];

export const entregas = [
    { name: 'Total', value: 200},
    { name: 'hoje', value: 10 },
    { name: 'Entregues', value: 100 },
    { name: 'Acaminho', value: 70 },
    { name: 'No prazo', value: 35 },
    { name: 'Atrasadas', value: 25 },
    { name: 'Canceladas', value: 15 },
];

export const vendas = [
    { name: 'Total', value: 200},
    { name: 'Hoje', value: 10 },
    { name: 'A Receber hoje', value: 10 },
    { name: 'Pagamento efetuado', value: 200 },
    { name: 'Pagamento Pendente - Fiado', value: 5 },
    { name: 'Atrasadas - Prazo esgotado', value: 0 },
    { name: 'Canceladas', value: 15 },
];

export const clientes = [
    { name: 'Total', value: 200},
    { name: 'Débitos pendentes', value: 70 },
    { name: 'Novos | Mês', value: 35 },
];

export const fornecedores = [
    { name: 'Total', value: 200},
    { name: 'Débitos a Pagar', value: 70 },
    { name: 'Novos | Mês', value: 35 },
];

export const Transportadores = [
    { name: 'Total', value: 200},
    { name: 'Ativos', value: 50 },
    { name: 'Infração registrada', value: 70 },
    { name: 'Novos | Mês', value: 35 },
    { name: 'Inativos', value: 25 },
    { name: 'Bloqueados', value: 15 },
];

export const motoristas = [
    {
        id: 1,
        nome: "João da Silva",
        cnh: "12345678900",
        endereco: "Rua das Araucárias, nº 285, Bairro Centro, Chapecó - SC, CEP 89801-200",
        vehicle: "Carreta Bitrem",
        plate: "BRA3C41",
        latitude: -7.763433,
        longitude: -40.287220,
        rotation: 0,
        dataLocalizacao: "04/05/2025 15:20:00",
        veiclePhoto:"https://transportemundial.com.br/wp-content/uploads/2024/04/53d7ef96e1a33f95c2d2b6798db570d6-scaled.jpeg"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        cnh: "98765432100",
        endereco: "Avenida Brasil, nº 1000, Bairro São Cristóvão, Chapecó - SC, CEP 89801-250",
        vehicle: "Caminhão Truck",
        plate: "KZT6P20",
        latitude: -7.756626,
        longitude: -40.271342,
        rotation: 0,
        dataLocalizacao: "04/05/2025 15:20:00",
        veiclePhoto:"https://motz.com.br/wp-content/uploads/2024/01/caminhao-com-insulfilm.webp"
    },
    {
        id: 3,
        nome: "Carlos Souza",
        cnh: "45612378900",
        endereco: "Rua das Palmeiras, nº 58, Bairro Passo dos Fortes, Chapecó - SC, CEP 89801-180",
        vehicle: "Cavalo Mecânico",
        plate: "QWE1J89",
        latitude: -15.7810,
        longitude: -47.9300,
        rotation: 0,
        dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
        id: 4,
        nome: "Ana Paula Lima",
        cnh: "32198765400",
        endereco: "Rua das Hortênsias, nº 77, Bairro Efapi, Chapecó - SC, CEP 89809-100",
        vehicle: "Carreta Rodotrem",
        plate: "MNL4T72",
        latitude: -23.550520,
        longitude: -46.633308,
        rotation: 15,
        dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
        id: 5,
        nome: "Bruno Ferreira",
        cnh: "74185296300",
        endereco: "Avenida Getúlio Vargas, nº 120, Bairro Líder, Chapecó - SC, CEP 89802-000",
        vehicle: "Caminhão Toco",
        plate: "GHB8F60",
        latitude: -22.906847,
        longitude: -43.172896,
        rotation: 25,
        dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
        id: 6,
        nome: "Patrícia Mendes",
        cnh: "85296374100",
        endereco: "Rua Rui Barbosa, nº 315, Bairro São Pedro, Chapecó - SC, CEP 89801-600",
        vehicle: "Carreta LS (Linha Segmentada)",
        plate: "QWE1J89",
        latitude: -30.034647,
        longitude: -51.217658,
        rotation: 10,
        dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
        id: 7,
        nome: "Ricardo Alves",
        cnh: "15975348600",
        endereco: "Travessa Beira Rio, nº 89, Bairro Universitário, Chapecó - SC, CEP 89803-210",
        vehicle: "Caminhão VUC (Veículo Urbano de Carga)",
        plate: "MNL4T72",
        latitude: -19.8157,
        longitude: -43.9542,
        rotation: 45,
        dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
        id: 8,
        nome: "Juliana Rocha",
        cnh: "36925814700",
        endereco: "Rua Fernando Machado, nº 440, Bairro Centro, Chapecó - SC, CEP 89801-020",
        vehicle: "Caminhão Baú",
        plate: "GHB8F60",
        latitude: -3.7319,
        longitude: -38.5267,
        rotation: 5,
        dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
        id: 9,
        nome: "Lucas Martins",
        cnh: "75315984200",
        endereco: "Rua São Marcos, nº 198, Bairro Paraíso, Chapecó - SC, CEP 89805-100",
        vehicle: "Caminhão Carga Seca",
        plate: "QWE1J89",
        latitude: -1.4550,
        longitude: -48.5024,
        rotation: 30,
        dataLocalizacao: "04/05/2025 15:20:00"
    },
    {
        id: 10,
        nome: "Fernanda Dias",
        cnh: "95135785200",
        endereco: "Rua Marechal Bormann, nº 62, Bairro Esplanada, Chapecó - SC, CEP 89801-360",
        vehicle: "Carreta Prancha",
        plate: "MNL4T72",
        latitude: -8.0476,
        longitude: -34.8770,
        rotation: 60,
        dataLocalizacao: "04/05/2025 15:20:00"
    }
];


