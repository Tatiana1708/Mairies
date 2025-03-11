import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import type { Employee, Department } from '../types';
// ... other imports ...
import { db } from '../api/index';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    matricule: '',
    nom: '',
    dateNaissance: '',
    lieuNaissance: '',
    sexe: '' as 'Homme' | 'Femme',
    situationMatrimoniale: '',
    diplome: '',
    contrat: '' as 'CDI' | 'CDD' | 'Stage' | 'Freelance',
    statutProfessionnel: '',
    grade: '' as '',
    corpsMetier: '',
    competences: '',
    informationsSupplementaires: '',
    positions: '',
    departement: '' as Department
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // const [formErrors, setFormErrors] = useState({
  //   matricule: '',
  //   nom: '',
  //   dateNaissance: '',
  //   lieuNaissance: '',
  //   sexe: '' as 'Homme' | 'Femme',
  //   situationMatrimoniale: '',
  //   diplome: '',
  //   contrat: '' as 'CDI' | 'CDD' | 'Stage' | 'Freelance',
  //   statutProfessionnel: '',
  //   grade: '' as '',
  //   corpsMetier: '',
  //   competences: '',
  //   informationsSupplementaires: '',
  //   positions: '',
  //   departement: '' as Department
  // });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const departments: Department[] = [
    "Service des affaires générales",
    "Service économique et financier",
    "Service technique de l’aménagement et du développement urbain",
    "Service hygiène, salubrité",
    "Service social et culturel"
  ];

  const position = [
    'Director',
    'Manager',
    'Supervisor',
    'Administrator',
    'Clerk',
    'Specialist',
    'Analyst',
    'Coordinator'
  ];

  // Add useEffect to fetch data when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employeesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeesList);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(currentStep);

    if (Object.keys(errors).length === 0) {
      try {
        const docRef = await addDoc(collection(db, 'employees'), formData);
        const newEmployee = {
          id: docRef.id,
          ...formData
        };

        setEmployees([...employees, newEmployee]);
        setFormData({
          matricule: '',
          nom: '',
          dateNaissance: '',
          lieuNaissance: '',
          sexe: '' as 'Homme' | 'Femme',
          situationMatrimoniale: '',
          diplome: '',
          contrat: '' as 'CDI' | 'CDD' | 'Stage' | 'Freelance',
          statutProfessionnel: '',
          grade: '',
          corpsMetier: '',
          competences: '',
          informationsSupplementaires: '',
          positions: '',
          departement: '' as Department
        });

        // Close the form modal and show success modal
        setShowAddModal(false);
        setShowSuccessModal(true);

        // Automatically close success modal after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);

      } catch (error) {
        console.error('Error creating employee:', error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Add delete function
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'employees', id));
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const validateForm = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.matricule.trim()) errors.matricule = 'Matricule est requis';
      if (!formData.nom.trim()) errors.nom = 'Nom est requis';
      if (!formData.dateNaissance.trim()) errors.dateNaissance = 'Date de naissance est requise';
      if (!formData.lieuNaissance.trim()) errors.lieuNaissance = 'Lieu de naissance est requis';
      if (!formData.sexe.trim()) errors.sexe = 'Sexe est requis';
      if (!formData.situationMatrimoniale.trim()) errors.situationMatrimoniale = 'Situation matrimoniale est requise';
    } else if (step === 1) {
      if (!formData.diplome.trim()) errors.diplome = 'Diplôme est requis';
      if (!formData.contrat.trim()) errors.contrat = 'Contrat est requis';
      if (!formData.statutProfessionnel.trim()) errors.statutProfessionnel = 'Statut professionnel est requis';
      if (!formData.grade.trim()) errors.grade = 'Grade est requis';
      if (!formData.corpsMetier.trim()) errors.corpsMetier = 'Corps de métier est requis';
      if (!formData.competences.trim()) errors.competences = 'Compétences sont requises';
      if (!formData.positions.trim()) errors.position = 'position est requis';
      if (!formData.departement.trim()) errors.departement = 'departement est requis';
      if (!formData.informationsSupplementaires.trim()) errors.informationsSupplementaires = 'Informations supplémentaires sont requises';
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const nextStep = () => {
    if (validateForm(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: "Informations personnelles",
      description: "Informations personnelles et formation"
    },
    {
      title: "Informations professionnelles",
      description: "Qualifications et statut professionnel"
    }
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.dateNaissance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lieuNaissance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.sexe.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.situationMatrimoniale.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.diplome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.contrat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.statutProfessionnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.corpsMetier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.competences.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.informationsSupplementaires.toLowerCase().includes(searchTerm.toLowerCase())

  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de Naissance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu de Naissance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Situation Matrimoniale</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diplôme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contrat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut Professionnel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Corps de Métier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compétences</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Informations Supplémentaires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.matricule}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.dateNaissance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.lieuNaissance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.sexe}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.situationMatrimoniale}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.contrat}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.diplome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.statutProfessionnel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.corpsMetier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.competences}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.informationsSupplementaires}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-6">
          <div className="bg-white rounded-lg  p-6 w-full max-w-md max-h-[90vh] overflow-y-auto my-auto ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ajouter Employe</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={30} />
              </button>
            </div>

            {/* Stepper Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-xs mt-2 text-center w-24">{step.title}</div>

                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-5 w-full h-1 left-40 -z-10 ${currentStep > index ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Identification */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{steps[currentStep].title}</h2>
                  <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Matricule
                    </label>
                    <input
                      type="text"
                      name="matricule"
                      value={formData.matricule}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.matricule ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Entrez le matricule de l'employé"
                    />
                    {formErrors.matricule && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.matricule}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Noms et Prénoms
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.nom ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Entrez le nom de l'employé"
                    />
                    {formErrors.nom && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.nom}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de Naissance
                    </label>
                    <input
                      type="date"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.dateNaissance ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.dateNaissance && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.dateNaissance}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lieu de Naissance
                    </label>
                    <input
                      type="text"
                      name="lieuNaissance"
                      value={formData.lieuNaissance}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.lieuNaissance ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ville, Pays"
                    />
                    {formErrors.lieuNaissance && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.lieuNaissance}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sexe
                    </label>
                    <select
                      name="sexe"
                      value={formData.sexe}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.sexe ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Sélectionnez le sexe</option>
                      <option value="Masculin">Masculin</option>
                      <option value="Feminin">Féminin</option>
                    </select>
                    {formErrors.sexe && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.sexe}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Situation Matrimoniale
                    </label>
                    <select
                      name="matrimoniale"
                      value={formData.situationMatrimoniale}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.situationMatrimoniale ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Sélectionnez la situation</option>
                      <option value="Célibataire">Célibataire</option>
                      <option value="Marié(e)">Marié(e)</option>
                      <option value="Divorcé(e)">Divorcé(e)</option>
                      <option value="Veuf/Veuve">Veuf/Veuve</option>
                    </select>
                    {formErrors.situationMatrimoniale && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.situationMatrimoniale}</p>
                    )}
                  </div>

                </div>
              )}

              {/* Step 4: Professional Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{steps[currentStep].title}</h2>
                  <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diplôme
                    </label>
                    <input
                      type="text"
                      name="diplome"
                      value={formData.diplome}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.diplome ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ex: Master en Informatique"
                    />
                    {formErrors.diplome && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.diplome}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contrat
                    </label>
                    <select
                      name="contrat"
                      value={formData.contrat}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.contrat ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Sélectionnez le type de contrat</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage">Stage</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                    {formErrors.contrat && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.contrat}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <select
                      name="positions"
                      value={formData.positions}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.positions ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Sélectionnez la position</option>
                      {position.map(positions => (
                        <option key={positions} value={positions}>{positions}</option>
                      ))}
                    </select>
                    {formErrors.positions && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.positions}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service
                    </label>
                    <select
                      name="departement"
                      value={formData.departement}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.departement ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Sélectionnez le service</option>
                      {departments.map(departement => (
                        <option key={departement} value={departement}>{departement}</option>
                      ))}
                    </select>
                    {formErrors.departement && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.departement}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut Professionnel
                    </label>
                    <select
                      name="statutProfessionnel"
                      value={formData.statutProfessionnel}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.statutProfessionnel ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Sélectionnez le type de contrat</option>
                      <option value="Fonctionnaire">Fonctionnaire</option>
                      <option value="Contractuel">Contractuel</option>
                      <option value="Agent_Decision">Agent Décision</option>
                    </select>
                    {formErrors.statutProfessionnel && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.statutProfessionnel}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.grade ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ex: Senior, Junior..."
                    />
                    {formErrors.grade && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.grade}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Corps de Métier
                    </label>
                    <input
                      type="text"
                      name="corpsMetier"
                      value={formData.corpsMetier}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.corpsMetier ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ex: Informatique, Administration..."
                    />
                    {formErrors.corpsMetier && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.corpsMetier}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Compétences
                    </label>
                    <input
                      type="text"
                      name="competences"
                      value={formData.competences}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.competences ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Listez vos compétences, séparées par des virgules"
                    />
                    {formErrors.competences && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.competences}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Informations Supplémentaires
                    </label>
                    <textarea
                      name="informationsSupplementaires"
                      value={formData.informationsSupplementaires}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formErrors.informationsSupplementaires ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ajoutez des informations supplémentaires ici"
                      rows={4}
                    />
                    {formErrors.informationsSupplementaires && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.informationsSupplementaires}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 ${currentStep === 0 ? 'invisible' : 'visible'
                    }`}
                >
                  Précédent
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Ajouter l'employé
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add this success modal component just before the closing div of your return statement*/}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Ajout réussi!</h3>
              <p className="mt-2 text-sm text-gray-500">
                L'employé a été ajouté avec succès.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Employees;