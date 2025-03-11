import { useState } from 'react';
import { Users, Wrench, FileText, Phone, Mail, MapPin, ChevronLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Department } from '../types';

const Departments = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const departments: Department[] = [
    "Service des affaires générales",
    "Service économique et financier",
    "Service technique de l’aménagement et du développement urbain",
    "Service hygiène, salubrité",
    "Service social et culturel",
  ];

  // Schémas de couleurs pour les départements
  const departmentColors = {
    "Service des affaires générales": {
      bg: 'bg-blue-50',
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'text-blue-600'
    },
    "Service économique et financier": {
      bg: 'bg-green-50',
      button: 'bg-green-600 hover:bg-green-700',
      icon: 'text-green-600'
    },
    "Service technique de l’aménagement et du développement urbain": {
      bg: 'bg-yellow-50',
      button: 'bg-yellow-600 hover:bg-yellow-700',
      icon: 'text-yellow-600'
    },
    "Service hygiène, salubrité": {
      bg: 'bg-red-50',
      button: 'bg-red-600 hover:bg-red-700',
      icon: 'text-red-600'
    },
    "Service social et culturel": {
      bg: 'bg-purple-50',
      button: 'bg-purple-600 hover:bg-purple-700',
      icon: 'text-purple-600'
    }
  };

  // Données fictives pour les détails des départements
  const getDepartmentDetails = (dept: Department) => {
    switch(dept) {
      case "Service des affaires générales":
        return {
          head: { name: "Jean Dupont", title: "Chef de Service", email: "jean.dupont@domain.com", phone: "+33 1 23 45 67 89" },
          location: "Bâtiment A, Rez-de-chaussée",
          statistics: { employees: 10, equipment: 15, procedures: 5, activeProjects: 3 },
          recentProcedures: [
            { id: 1, name: "Traitement des demandes", status: "active" },
            { id: 2, name: "Organisation des réunions", status: "pending" },
            { id: 3, name: "Gestion administrative", status: "completed" }
          ],
          units: [
            "Unité ressources humaines",
            "Section du personnel",
            "Section formation professionnelle",
            "Unité état-civil et démographie",
            "Section état-civil",
            "Section affaires démographiques",
            "Unité contentieux et assurances",
            "Section contentieux et assurances",
            "Section affaires réglementaires et marchés publics"
          ]
        };
      case "Service économique et financier":
        return {
          head: { name: "Marie Claire", title: "Directrice", email: "marie.claire@domain.com", phone: "+33 1 23 45 67 90" },
          location: "Bâtiment B, 1er étage",
          statistics: { employees: 12, equipment: 10, procedures: 4, activeProjects: 2 },
          recentProcedures: [
            { id: 1, name: "Gestion budgétaire", status: "active" },
            { id: 2, name: "Suivi des transactions", status: "pending" },
            { id: 3, name: "Audit financier", status: "completed" }
          ],
          units: [
            "Unité budget et affaires financières",
            "Section recette, assiette fiscale",
            "Section suivi des dépenses",
            "Unité approvisionnement et moyens généraux",
            "Section achats",
            "Section gestion des équipements",
            "Section maintenance et gardiennage des bâtiments"
          ]
        };
      case "Service technique de l’aménagement et du développement urbain":
        return {
          head: { name: "Philippe Roux", title: "Directeur Technique", email: "philippe.roux@domain.com", phone: "+33 1 23 45 67 91" },
          location: "Bâtiment C, 2ème étage",
          statistics: { employees: 15, equipment: 20, procedures: 6, activeProjects: 4 },
          recentProcedures: [
            { id: 1, name: "Planification urbaine", status: "active" },
            { id: 2, name: "Gestion des infrastructures", status: "pending" },
            { id: 3, name: "Suivi des chantiers", status: "completed" }
          ],
          units: [
            "Unité urbanisme et construction",
            "Section construction, permis",
            "Section affaires foncières, cadastre",
            "Unité voiries et réseaux",
            "Section voiries et assainissement",
            "Section réseaux (eau, électricité, téléphone)",
            "Unité maintenance et entretien patrimoine",
            "Section équipements communaux",
            "Section espaces verts",
            "Section entretien bâtiment et infrastructures",
            "Gestion des parkings publics",
            "Exécution des mesures foncières et domaniales du permis de construire",
            "Dénomination des rues, places et édifices publics",
            "Gestion des infrastructures d'intérêt communautaire",
            "Circulation et transport"
          ]
        };
      case "Service hygiène, salubrité":
        return {
          head: { name: "Claire Petit", title: "Directrice de l'Hygiène", email: "claire.petit@domain.com", phone: "+33 1 23 45 67 92" },
          location: "Bâtiment D, Rez-de-chaussée",
          statistics: { employees: 20, equipment: 25, procedures: 8, activeProjects: 5 },
          recentProcedures: [
            { id: 1, name: "Contrôle de la propreté", status: "active" },
            { id: 2, name: "Gestion des déchets", status: "pending" },
            { id: 3, name: "Inspection sanitaire", status: "completed" }
          ],
          units: [
           "Unité hygiène et salubrité",
            "Section étude et programmation",
            "Section enlèvement des déchets et vidange",
            "Unité protection civile et environnement",
            "Section protection civile",
            "Section environnement et ressources naturelles",
            "Gestion de l'éclairage public et approvisionnement en eau potable",
            "Gestion des abattoirs municipaux",
            "Administration des marchés, foires et musées",
            "Gestion des parcs et jardins",
            "Entretien et gestion des cimetières"
          ]
        };
      case "Service social et culturel":
        return {
          head: { name: "Sophie Bernard", title: "Directrice Sociale", email: "sophie.bernard@domain.com", phone: "+33 1 23 45 67 93" },
          location: "Bâtiment E, 1er étage",
          statistics: { employees: 18, equipment: 15, procedures: 7, activeProjects: 3 },
          recentProcedures: [
            { id: 1, name: "Organisation d'événements", status: "active" },
            { id: 2, name: "Soutien aux associations", status: "pending" },
            { id: 3, name: "Développement communautaire", status: "completed" }
          ],
          units: [
            "Unité éducation, culture et promotion des langues nationales",
            "Unité santé et action sociale",
            "Unité animation, jeunesse, sports et loisirs"
          ]
        };
      default:
        return {
          head: { name: "Non assigné", title: "Non défini", email: "contact@domain.com", phone: "+33 1 23 45 67 89" },
          location: "Non spécifié",
          statistics: { employees: 0, equipment: 0, procedures: 0, activeProjects: 0 },
          recentProcedures: [],
          units: []
        };
    }
  };

  if (selectedDepartment) {
    const details = getDepartmentDetails(selectedDepartment);
    const colors = departmentColors[selectedDepartment];
    
    return (
      <div className="h-full">
        <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={() => setSelectedDepartment(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft size={20} />
            Retour aux Services
          </button>
        </div>

        <div className={`bg-white rounded-lg shadow-md ${colors.bg}`}>
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">{selectedDepartment}</h1>
            <div className="mt-4 flex items-center gap-3 text-gray-600">
              <MapPin size={20} />
              <span>{details.location}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informations sur le responsable du département */}
              <div className="bg-white/80 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Responsable du Service</h2>
                <div className="space-y-3">
                  <p className="text-gray-800 font-medium">{details.head.name}</p>
                  <p className="text-gray-600">{details.head.title}</p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className={colors.icon} />
                    <span>{details.head.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className={colors.icon} />
                    <span>{details.head.phone}</span>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.employees}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Employés</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600">
                      <Wrench size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.equipment}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Équipement</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-600">
                      <FileText size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.procedures}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Procédures</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-600">
                      <FileText size={20} className={colors.icon} />
                      <span className="text-2xl font-bold">{details.statistics.activeProjects}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Projets Actifs</p>
                  </div>
                </div>
              </div>

              {/* Unités et sections */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Unités et Sections</h2>
                <ul className="list-disc list-inside">
                  {details.units.map((unit, index) => (
                    <li key={index} className="text-gray-600">{unit}</li>
                  ))}
                </ul>
              </div>

              {/* Procédures récentes */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Procédures Récentes</h2>
                <div className="space-y-3">
                  {details.recentProcedures.map(procedure => (
                    <div key={procedure.id} className="bg-white p-4 rounded-lg">
                      <p className="font-medium text-gray-800">{procedure.name}</p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                        procedure.status === 'active' ? 'bg-green-100 text-green-800' :
                        procedure.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {procedure.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => {
          const details = getDepartmentDetails(department);
          const colors = departmentColors[department];

          return (
            <div key={department} className={`rounded-lg shadow-md p-6 ${colors.bg} border border-gray-100`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{department}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Users size={20} className={colors.icon} />
                  <span>Employés: {details.statistics.employees}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Wrench size={20} className={colors.icon} />
                  <span>Équipement: {details.statistics.equipment}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <FileText size={20} className={colors.icon} />
                  <span>Procédures: {details.statistics.procedures}</span>
                </div>
              </div>
              
              <button 
                className={`mt-6 w-full text-white px-4 py-2 rounded-lg ${colors.button}`}
                onClick={() => setSelectedDepartment(department)}
              >
                Voir détails
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Departments;