
import React, { useState } from 'react';
import { analyzeSymptoms } from '../geminiService';
import { BrainCircuit, Loader2, Send, ShieldAlert, HeartPulse } from 'lucide-react';
import { COLORS } from '../constants';

const AIChecker: React.FC = () => {
  const [petType, setPetType] = useState('Köpek');
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult('');
    const analysis = await analyzeSymptoms(petType, symptoms);
    setResult(analysis || "Bir hata oluştu.");
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <BrainCircuit size={32} className="text-blue-200" />
            <h2 className="text-3xl font-bold italic">PatiAI</h2>
          </div>
          <p className="text-indigo-100 text-lg max-w-xl">
            Yapay zeka desteğiyle evcil hayvanınızın belirtilerini analiz edin. Unutmayın, bu sadece ön bilgilendirmedir!
          </p>
        </div>
        <div className="absolute top-[-20px] right-[-20px] opacity-10">
          <HeartPulse size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Can Dostunuzun Türü</label>
            <div className="grid grid-cols-3 gap-3">
              {['Köpek', 'Kedi', 'Diğer'].map((t) => (
                <button
                  key={t}
                  onClick={() => setPetType(t)}
                  className={`py-3 px-4 rounded-xl font-bold transition-all border-2 ${
                    petType === t 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Gözlemlediğiniz Belirtiler</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Örn: Halsizlik, iştah kaybı, dünden beri az su içiyor..."
              className="w-full h-40 p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-800 placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !symptoms.trim()}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            Analiz Et
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center">
          {!result && !loading ? (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <ShieldAlert className="text-blue-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Analiz Hazır Değil</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Lütfen soldaki formu doldurarak can dostunuzdaki belirtileri bizimle paylaşın.
              </p>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              <Loader2 className="animate-spin text-blue-600 mx-auto" size={48} />
              <p className="font-bold text-blue-800">Yapay Zeka Analiz Ediyor...</p>
              <p className="text-xs text-gray-500 italic">Genelde 5-10 saniye sürer.</p>
            </div>
          ) : (
            <div className="w-full text-left space-y-6 animate-in fade-in duration-500">
               <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold inline-block">Analiz Sonucu</div>
               <div className="prose prose-sm text-gray-800 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap font-medium">
                 {result}
               </div>
               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                 <p className="text-xs text-yellow-800 font-bold">
                   <strong>UYARI:</strong> Bu bir tıbbi teşhis değildir. Lütfen durum ciddiyse derhal bir veteriner kliniğine başvurun.
                 </p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChecker;
