"use client"

import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar projetos
  const fetchProjects = async (): Promise<void> => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProjects(data.projects || []); // Atualiza os projetos
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error(errorMessage);
      setError(errorMessage); // Atualiza o erro
    }
  };

  // Chamando a função no carregamento da página
  useEffect(() => {
    fetchProjects();
  }, []); // O array vazio [] garante que a função será chamada apenas uma vez

  return (
    <div>
      <h1>Azure DevOps Projects</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
