import React from 'react';



const CourrierPage = () => {
    const Courrier = [
        "Fusion de Titres Fonciers",
        "Certificat d'Inscription",
        "Certificat de Propriété",
        "Relevé Immobilier",
        "Rétractation d'Ordonnance Judiciaire",
        "Retrait d'Indivision",
        "Demande en Rectification, Diminution ou Augmentation",
        "Travaux Planimétriques : Bornage (Morcellement, Concession, Immatriculation, Délimitation)",
        "Inscription des Baux",
        "Radiation d'Hypothèque",
        "Délivrance du Duplicata du Titre Foncier",
        "Travaux Altimétriques",
        "État de Cession du Rattachement et du Duplicata",
        "Expertises Foncières (Avant Descente)",
        "Expertises Foncières (Après Descente)",
        "Établissement de Titre Foncier par Morcellement des Propriétés Existantes",
        "Établissement de Titre Foncier par Transformation d'Acte en Titre Foncier",
        "Prénotation Judiciaire",
        "Établissement de Titre Foncier par Fusion des Titres Fonciers",
        "Mutation Totale",
        "Occupation des Dépendances Publiques à des Fins d'Affichage Publicitaire",
        "Hypothèques et Privilèges",
        "Fiche Signalétique",
        "Vérification et Rectification des Limites",
        "Redevance Domaniale",
        "État de Cession : Divers Travaux Planimétriques",
        "État de Cession : Fiche Signalétique",
        "État de Cession : Bornes Reconstituées/Rectifiées/Implantées",
        "Vérification de l'Inscription ou de l'Examen des Oppositions",
        "Consession provisior",
        "Consession definitive",
        "Établissement d'un Titre Foncier par Immatriculation du Domaine National",
        "Immatriculation Directe",
        "Concession Provisoire",
        "Concession Définitive",
        "Bail Emphytéotique",
        "Bail Ordinaire",
        "Vente de Gré à Gré d’une Dépendance du Domaine Privé de l’État",
        "Vente par Adjudication d’un Terrain du Domaine Privé de l’État",
        "Morcellement d’une Propriété Privée",
        "Mutation Totale du Titre Foncier",
        "Inscription d’une Hypothèque Conventionnelle",
        "Radiation d’une Hypothèque Conventionnelle",
        "Établissement d’un Duplicata du Titre Foncier",
        "Certificat de Propriété",
        "Obtention d’un Visa sur un Plan de Lotissement",
        "Expropriation, Incorporation et Indemnisation",
      
        
      ];
      
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Liste des Services Disponibles</h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '16px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>#</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Nom des Procédures</th>
          </tr>
        </thead>
        <tbody>
          {Courrier.map((Courrier, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                {index + 1}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{Courrier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourrierPage;
