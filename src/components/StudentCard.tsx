import React from "react";
import type { Student } from "../types/Student";
import { QRCode } from "react-qrcode-logo";

interface Props {
  student: Student;
}

const StudentCard: React.FC<Props> = ({ student }) => {
  const qrData = JSON.stringify({
    ine: student.ine,
    nomComplet: student.nomComplet,
    institution: student.institution,
    programme: student.programme,
    niveau: student.niveau,
    annee: student.annee,
    isValid: student.isValid,
  });

  return (
    <div className="mt-4 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header bleu   */}
      <div className="bg-blue-700 text-white flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold">Carte Étudiant</h2>
        <img
          src="/parcoursup.png"
          alt="Logo"
          className="w-10 h-10 rounded-full bg-white p-1"
        />
      </div>

      {/* Contenu étudiant */}
      <div className="p-5 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <h3 className="text-xl font-bold text-gray-50 mb-2">
          {student.nomComplet}
        </h3>
        <p className="text-md text-gray-300">
          <span className="font-semibold text-gray-50">INE :</span> {student.ine}
        </p>
        <p className="text-md text-gray-300">
          <span className="font-semibold text-gray-50">Institution :</span>{" "}
          {student.institution}
        </p>
        <p className="text-md text-gray-300">
          <span className="font-semibold text-gray-50">Programme :</span> {student.programme}
        </p>

        {/* Ligne du bas avec infos + QR */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-md text-gray-300 mt-1">
              <span className="font-semibold text-gray-50">Niveau :</span> {student.niveau}
            </p>
            <p className="text-md text-gray-300 mt-1 mb-3">
              <span className="font-semibold text-gray-50">Année :</span> {student.annee}
            </p>
            <p
              className={`text-md font-bold bg-white px-15 py-1 rounded-2xl ${
                student.isValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {student.isValid ? "✅ Carte valide" : "❌ Carte invalide"}
            </p>
          </div>

          {/* QR Code */}
          <QRCode
            value={qrData}
            size={80}
            fgColor="#1E3A8A"
            logoImage="/parcoursup.png"
            logoWidth={20}
            logoHeight={20}
            removeQrCodeBehindLogo
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
