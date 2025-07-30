import React, { createContext, useContext, useEffect, useState } from "react";

export interface Presente {
  id: number;
  nome: string;
  preco: number;
  presenteado: boolean;
  categoria: string;
  descricao: string;
  imagem: string;
}

interface PresenteContextType {
  presentes: Presente[];
  loading: boolean;
  togglePresenteado: (id: number) => void;
}

const PresenteContext = createContext<PresenteContextType | undefined>(undefined);

export const usePresentes = () => {
  const context = useContext(PresenteContext);
  if (!context) throw new Error("usePresentes deve ser usado dentro de PresenteProvider");
  return context;
};

export const PresenteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch("/data/presentes.json");
        const data = await res.json();
        setPresentes(data);
      } catch (e) {
        console.error("Erro ao carregar presentes", e);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const togglePresenteado = (id: number) => {
    setPresentes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, presenteado: !p.presenteado } : p))
    );
  };

  return (
    <PresenteContext.Provider value={{ presentes, loading, togglePresenteado }}>
      {children}
    </PresenteContext.Provider>
  );
};
