import { useState, useEffect } from 'react';
import { api } from '../api'; 

export const useChalets = () => {
    const [chalets, setChalets] = useState<any[]>([]);  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChalets = async () => {
            try {
                const response = await api.get('/alugueis'); 
                setChalets(response.data); 
            } catch (error: any) {
                console.error('Erro ao buscar chalés:', error);
                setError('Erro ao buscar chalés');
            } finally {
                setLoading(false); 
            }
        };

        fetchChalets();
    }, []); 

    return { chalets, loading, error };  // Retorna o estado necessário
};
