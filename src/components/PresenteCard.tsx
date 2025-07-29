import React from 'react';
import './PresenteCard.css';

interface Presente {
  id: number;
  nome: string;
  preco: number;
  presenteado: boolean;
  categoria: string;
  descricao: string;
  imagem: string;
}

interface PresenteCardProps {
  presente: Presente;
}

export default function PresenteCard({ presente }: PresenteCardProps) {
  const handleClick = () => {
    // Redireciona para a loja com o nome do presente na busca
    const searchTerm = encodeURIComponent(presente.nome);
    window.open(`https://loja.infinitepay.io/theguicosta?search=${searchTerm}`, '_blank');
  };

  return (
    <div className="presente-card" onClick={handleClick}>
      
      <div className={presente.presenteado ? "statusGiftTrue" : "statusGiftFalse"}>
        <div className="statusGiftContainer">
          <p>{presente.presenteado ? "Presenteado" : "Disponível"}</p>
        </div>
      </div>

      <div className="imgGift">
        <img 
          src={presente.imagem} 
          alt={presente.nome}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300/f0f0f0/666666?text=' + encodeURIComponent(presente.nome);
          }}
        />
      </div>

      <h3>{presente.nome}</h3>
      
      <div className="preco">R$ {presente.preco.toFixed(2)}</div>
      
      
    </div>
  );
} 