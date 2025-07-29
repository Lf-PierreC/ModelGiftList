import React, { useState, useEffect } from "react";
import "./Admin.css";

interface Presente {
  id: number;
  nome: string;
  preco: number;
  presenteado: boolean;
  categoria: string;
  descricao: string;
  imagem: string;
}

export default function Admin() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPresentes();
  }, []);

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

  const togglePresenteado = (id: number) => {
    setPresentes(prev => 
      prev.map(presente => 
        presente.id === id 
          ? { ...presente, presenteado: !presente.presenteado }
          : presente
      )
    );
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Painel Administrativo</h2>
        <p>Clique em um presente para alterar seu status</p>
      </div>

      <div className="admin-stats">
        <div className="stat">
          <span className="stat-number">{presentes.filter(p => !p.presenteado).length}</span>
          <span className="stat-label">Disponíveis</span>
        </div>
        <div className="stat">
          <span className="stat-number">{presentes.filter(p => p.presenteado).length}</span>
          <span className="stat-label">Presenteados</span>
        </div>
        <div className="stat">
          <span className="stat-number">R$ {presentes.reduce((total, p) => total + p.preco, 0).toFixed(2)}</span>
          <span className="stat-label">Valor Total</span>
        </div>
      </div>

      <div className="admin-presentes">
        <h3>Gerenciar Presentes</h3>
        
        <div className="presentes-list">
          {presentes.map((presente) => (
            <div 
              key={presente.id} 
              className={`presente-item ${presente.presenteado ? 'presenteado' : ''}`}
              onClick={() => togglePresenteado(presente.id)}
            >
              <div className="presente-info">
                <h4>{presente.nome}</h4>
                <p className="preco">R$ {presente.preco.toFixed(2)}</p>
                <p className="categoria">{presente.categoria}</p>
              </div>
              <div className={`status ${presente.presenteado ? 'presenteado' : 'disponivel'}`}>
                {presente.presenteado ? '🎁 Presenteado' : '📦 Disponível'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
