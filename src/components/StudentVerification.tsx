import React, { useState } from "react";
import axios from "axios";
import type { Student } from "../types/Student";
import StudentCard from "./StudentCard";

const StudentVerification: React.FC = () => {
  const [ine, setIne] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setStudent(null);
    setError("");

    if (!ine.trim()) {
      setError("Veuillez fournir un INE valide !");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.parcoursupguinee.org/api/Student/GetStudentCardInfo/${encodeURIComponent(
          ine
        )}`
      );

      // Vérifier que l'API a bien renvoyé un étudiant
      if (!data || !data.identifiantNationalEleve) {
        setError("❌ Étudiant introuvable !");
        return;
      }

      const mappedStudent: Student = {
        ine: data.identifiantNationalEleve,
        nomComplet: data.fullName,
        institution: data.institution,
        programme: data.programme,
        niveau: data.niveau,
        annee: data.anneeUniversitaire,
        debut: data.startYear,
        fin: data.endYear,
        isValid: Boolean(data.isValid),
      };

      setStudent(mappedStudent);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("❌ Étudiant introuvable !");
      } else {
        setError("❌ Erreur de connexion. Veuillez réessayer.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo et titre alignés sur une ligne */}
      <div className="flex items-center justify-center gap-4 mb-3">
        <img
          src="/parcoursup.png"
          alt="Logo ParcourSup"
          className="w-25 h-auto rounded shadow object-contain"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl bg-white px-4 py-1 rounded-xl pb-2 font-bold text-blue-700">
            Parcoursup Guinée
          </h1>
        </div>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-lg">
        <div className="bg-blue-100 text-blue-700 px-6 py-1 mb-2 rounded-lg text-lg font-medium w-max mx-auto">
          Vérification de la carte étudiant
        </div>
        <label htmlFor="ine" className="sr-only">
          INE
        </label>
        <input
          id="ine"
          type="text"
          placeholder="Entrez votre INE"
          value={ine}
          onChange={(e) => setIne(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Vérification..." : "Vérifier"}
        </button>

        {/* Loader */}
        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 px-3 py-2 rounded-lg flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}
      </div>

      {/* Résultat */}
      {student && <StudentCard student={student} />}
    </div>
  );
};

export default StudentVerification;
