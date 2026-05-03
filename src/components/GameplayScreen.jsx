import { useState } from 'react';
import FeedbackPanel from './FeedbackPanel';
export default function GameplayScreen({mission,onDone,onToolkit,onUpdateScore,simplified,setSimplified}){
  const [step,setStep]=useState(0); const [fb,setFb]=useState(null); const q=mission.questions[step];
  const choose=(c)=>{setFb({msg:c.feedback,points:c.points});onUpdateScore(c.points,c.skill);};
  const next=()=>{if(step<mission.questions.length-1){setStep(step+1);setFb(null);}else onDone();};
  const speak=()=>window.speechSynthesis?.speak(new SpeechSynthesisUtterance(`${mission.scenario}. ${q.prompt}`));
  return <div className='max-w-4xl mx-auto p-6'>
    <h2 className='text-2xl font-bold'>{mission.title}</h2><p className='mt-2'>{mission.scenario}</p>
    <div className='bg-white p-4 rounded-2xl shadow mt-3'><p>{mission.image} {mission.fakePost}</p></div>
    <div className='h-3 bg-slate-200 rounded-full mt-3'><div className='h-3 bg-indigo-600 rounded-full' style={{width:`${((step+1)/mission.questions.length)*100}%`}}/></div>
    <div className='mt-3 flex gap-2 flex-wrap'><button onClick={onToolkit} className='px-3 py-2 rounded bg-cyan-600 text-white'>Use Detective Toolkit</button><button onClick={()=>alert(mission.hint)} className='px-3 py-2 rounded bg-amber-500 text-white'>Need a Hint?</button><button onClick={speak} className='px-3 py-2 rounded bg-emerald-600 text-white'>Read Aloud</button><button onClick={()=>setSimplified(!simplified)} className='px-3 py-2 rounded bg-slate-700 text-white'>{simplified?'Standard Text':'Simplified Text'}</button></div>
    <h3 className='font-bold mt-4'>{q.prompt}</h3>
    <div className='grid gap-2 mt-2'>{q.choices.map((c,i)=><button key={i} onClick={()=>choose(c)} className='text-left bg-white border rounded-xl p-3 hover:bg-indigo-50'>{simplified?c.text.split(' ').slice(0,8).join(' ')+'...':c.text}</button>)}</div>
    <FeedbackPanel msg={fb?.msg} points={fb?.points}/>{fb&&<button onClick={next} className='mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white'>{step<mission.questions.length-1?'Next clue':'Finish mission'}</button>}
  </div>;
}
