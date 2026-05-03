export default function LandingPage({ hasSave, onStart, onContinue, onGuide }) {
  return <div className='max-w-4xl mx-auto p-6 text-center'>
    <h1 className='text-4xl font-extrabold text-indigo-700'>Truth Quest: Digital Detective</h1>
    <p className='text-lg mt-2 text-slate-700'>Can you spot what is real, what is tricky, and what needs checking?</p>
    <p className='mt-4 bg-white rounded-2xl p-4 shadow'>Welcome, Detective! In this adventure, you will solve online mysteries and earn Truth Points by making safe, smart choices.</p>
    <div className='mt-6 flex flex-wrap justify-center gap-3'>
      <button onClick={onStart} className='px-5 py-3 rounded-xl bg-indigo-600 text-white'>Start Adventure</button>
      {hasSave && <button onClick={onContinue} className='px-5 py-3 rounded-xl bg-emerald-600 text-white'>Continue Game</button>}
      <button onClick={onGuide} className='px-5 py-3 rounded-xl bg-amber-500 text-white'>Teacher/Parent Guide</button>
    </div><p className='mt-6 text-sm'>This game saves your progress on this device. It does not ask for your real name or personal information.</p>
  </div>
}
