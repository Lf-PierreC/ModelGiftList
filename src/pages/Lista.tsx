import React, { useState, useEffect } from "react";
import PresenteCard from "../components/PresenteCard";
import "./Lista.css";

interface Presente {
  id: number;
  nome: string;
  preco: number;
  presenteado: boolean;
  categoria: string;
  descricao: string;
  imagem: string;
}

export default function Lista() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento do JSON
    const carregarPresentes = async () => {
      try {
        const response = await fetch('/src/data/presentes.json');
        const data = await response.json();
        setPresentes(data);
      } catch (error) {
        console.error('Erro ao carregar presentes:', error);
        
      } finally {
        setLoading(false);
      }
    };

    carregarPresentes();
  }, []);

  if (loading) {
    return (
      <div className="lista-container">
        <div className="loading">Carregando lista de presentes...</div>
      </div>
    );
  }

  return (
    <div className="lista-container">
      <div className="presentes-grid">
        {presentes.map((presente) => (
          <PresenteCard
            key={presente.id}
            presente={presente}
          />
        ))}
      </div>

      <div className="lista-footer">
        <p>Obrigado por fazer parte do nosso momento especial!</p>
      </div>
    </div>
  );
}
