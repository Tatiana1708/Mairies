import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Procedure } from '../types';

const Procedures = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>(null);

  const procedures: Procedure[] = [
    {
      id: '1',
      title: 'Demande de Permis de Construire',
      department: 'Service technique de l’aménagement et du développement urbain',
      steps: [
        'Remplir le formulaire de demande.',
        'Fournir les documents requis (plans, études d\'impact, etc.).',
        'Attendre la décision de la mairie.'
      ],
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      title: 'Déclaration de Décès',
      department: 'Service des affaires générales',
      steps: [
        'Obtenir un certificat de décès d\'un médecin.',
        'Se rendre à la mairie avec les documents requis.',
        'Remplir le formulaire de déclaration de décès.',
        'Recevoir l\'acte de décès après traitement.'
      ],
      lastUpdated: '2024-03-15'
    },
    {
      id: '3',
      title: 'Demande de Subvention Municipale',
      department: 'Service économique et financier',
      steps: [
        'Présenter un dossier de demande.',
        'Inclure un budget prévisionnel.',
        'Attendre la décision du conseil municipal.'
      ],
      lastUpdated: '2024-03-15'
    },
    {
      id: '4',
      title: 'Établissement d\'Actes d\'État Civil',
      department: 'Service des affaires générales',
      steps: [
        'Remplir les formulaires appropriés.',
        'Fournir les pièces justificatives.',
        'Recevoir l\'acte après traitement.'
      ],
      lastUpdated: '2024-03-15'
    },
    {
      id: '5',
      title: 'Gestion des Marchés Publics',
      department: 'Service économique et financier',
      steps: [
        'Publication d\'appels d\'offres.',
        'Réception et évaluation des propositions.',
        'Attribution des marchés.'
      ],
      lastUpdated: '2024-03-15'
    },
    {
      id: '6',
      title: 'Demande de Certificat d\'Urbanisme',
      department: 'Service technique de l’aménagement et du développement urbain',
      steps: [
        'Soumettre une demande écrite.',
        'Fournir les coordonnées du terrain.',
        'Recevoir les informations sur les règlements d\'urbanisme.'
      ],
      lastUpdated: '2024-03-15'
    },
    {
      id: '7',
      title: 'Suivi des Projets de Développement',
      department: 'Service social et culturel',
      steps: [
        'Évaluation des besoins de la communauté.',
        'Élaboration de plans de projet.',
        'Mise en œuvre et suivi des projets.'
      ],
      lastUpdated: '2024-03-15'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Procedures</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Add Procedure
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search procedures..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {procedures.map((procedure) => (
            <div key={procedure.id} className="border rounded-lg">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                   onClick={() => setExpandedProcedure(expandedProcedure === procedure.id ? null : procedure.id)}>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{procedure.title}</h3>
                  <p className="text-sm text-gray-500">{procedure.department}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Last updated: {procedure.lastUpdated}</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                  {expandedProcedure === procedure.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              {expandedProcedure === procedure.id && (
                <div className="p-4 border-t bg-gray-50">
                  <h4 className="font-medium mb-2">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {procedure.steps.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Procedures;