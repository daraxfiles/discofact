import { useEffect, useMemo, useState } from 'react';
import LandingPage from './components/LandingPage';
import ProfileSetup from './components/ProfileSetup';
import MissionMap from './components/MissionMap';
import GameplayScreen from './components/GameplayScreen';
import DetectiveToolkit from './components/DetectiveToolkit';
import ReflectionScreen from './components/ReflectionScreen';
import TeacherGuide from './components/TeacherGuide';
import ScenarioEditor from './components/ScenarioEditor';
import BadgeGallery from './components/BadgeGallery';
import CertificateScreen from './components/CertificateScreen';
import { missions as baseMissions } from './data/missions';

const initialScore={truthPoints:0,source:0,evidence:0,emotion:0,image:0,share:0};
const load=(k,d)=>JSON.parse(localStorage.getItem(k)||JSON.stringify(d));

function MiniGames({onBack}){return <div className='p-6 max-w-4xl mx-auto'><h2 className='text-2xl font-bold'>🎮 Mini-Games</h2><div className='grid gap-3 mt-3'>{[
['Headline Sorter','Sort headlines into Trustworthy, Clickbait, Needs checking, Opinion, Joke.'],
['Source Match','Match each claim to best source to check it.'],['Spot the Trick','Find ALL CAPS, no source, fake expert, old image, emotional words, urgency pressure.'],['Image Investigator','Choose caption, date, source, reverse search idea, and other reports checks.'],['Better Post Builder','Rewrite a misleading post into clearer safer wording.']].map(g=><div key={g[0]} className='bg-white rounded-xl p-4 border'><b>{g[0]}</b><p>{g[1]}</p></div>)}</div><button onClick={onBack} className='mt-3 px-4 py-2 rounded bg-indigo-600 text-white'>Back</button></div>}

export default function App(){
  const [screen,setScreen]=useState('landing'); const [profile,setProfile]=useState(load('profile',{nickname:'',avatar:'🕵️',badgeColor:'bg-blue-500'}));
  const [custom,setCustom]=useState(load('customMissions',[])); const missions=useMemo(()=>[...baseMissions,...custom], [custom]);
  const [current,setCurrent]=useState(load('currentMission',null)); const [completed,setCompleted]=useState(load('completedMissions',[]));
  const [score,setScore]=useState(load('scores',initialScore)); const [reflections,setReflections]=useState(load('reflections',{}));
  const [teacherMode,setTeacherMode]=useState(load('teacherMode',false)); const [simplified,setSimplified]=useState(false); const [mute,setMute]=useState(load('mute',false)); const [reducedMotion,setReducedMotion]=useState(load('reducedMotion',false));
  useEffect(()=>{Object.entries({profile,currentMission:current,completedMissions:completed,scores:score,reflections,customMissions:custom,teacherMode,mute,reducedMotion}).forEach(([k,v])=>localStorage.setItem(k,JSON.stringify(v)));},[profile,current,completed,score,reflections,custom,teacherMode,mute,reducedMotion]);
  const earned=useMemo(()=>{const b=[]; if(score.source>=20)b.push('source'); if(score.evidence>=20)b.push('evidence'); if(score.emotion>=20)b.push('emotion'); if(score.image>=20)b.push('image'); if(score.share>=20)b.push('share'); if(completed.includes(6))b.push('ai'); if(completed.includes(4))b.push('rumor'); if(baseMissions.every(m=>completed.includes(m.id)))b.push('final'); return b;},[score,completed]);
  const updateScore=(p,skill)=>setScore(s=>({...s,truthPoints:Math.max(0,s.truthPoints+p),[skill]:(s[skill]||0)+Math.max(0,p)}));

  if(screen==='landing') return <LandingPage hasSave={completed.length>0} onStart={()=>setScreen('profile')} onContinue={()=>setScreen('map')} onGuide={()=>setScreen('guide')} />;
  if(screen==='profile') return <ProfileSetup profile={profile} setProfile={setProfile} onSave={()=>setScreen('map')} />;
  if(screen==='guide') return <TeacherGuide missions={missions} badges={[]} onBack={()=>setScreen('landing')} />;
  if(screen==='toolkit') return <DetectiveToolkit onBack={()=>setScreen(current?'play':'map')} />;
  if(screen==='mini') return <MiniGames onBack={()=>setScreen('map')} />;
  if(screen==='badges') return <BadgeGallery earned={earned} onBack={()=>setScreen('map')} />;
  if(screen==='editor') return <ScenarioEditor onSave={(m)=>{setCustom([...custom,m]); alert('Saved');}} onBack={()=>setScreen('map')} />;
  if(screen==='cert') return <CertificateScreen profile={profile} score={score} earned={earned} onBack={()=>setScreen('map')} />;
  if(screen==='reflect') return <ReflectionScreen mission={current} onSave={(t)=>{setReflections({...reflections,[current.id]:t}); setScreen('map');}}/>;
  if(screen==='play'&&current) return <GameplayScreen mission={current} simplified={simplified} setSimplified={setSimplified} onToolkit={()=>setScreen('toolkit')} onUpdateScore={updateScore} onDone={()=>{if(!completed.includes(current.id)) setCompleted([...completed,current.id]); setScreen('reflect');}} />;

  return <div className={reducedMotion?'motion-reduce':''}><header className='p-3 bg-indigo-700 text-white flex justify-between'><p>{profile.avatar} {profile.nickname||'Detective'}</p><div className='flex gap-2'><button onClick={()=>setMute(!mute)}>{mute?'🔇 Mute':'🔊 Sound'}</button><button onClick={()=>setReducedMotion(!reducedMotion)}>{reducedMotion?'Reduced motion on':'Reduced motion off'}</button></div></header><div className='max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-2 text-sm'><div className='bg-white rounded p-2'>Truth Points: {score.truthPoints}</div><div className='bg-white rounded p-2'>Skills: Source {score.source} | Evidence {score.evidence} | Emotion {score.emotion} | Image {score.image} | Sharing {score.share}</div><div className='bg-white rounded p-2'>Core: Pause. Check. Think. Then share.</div></div><MissionMap missions={missions} completed={completed} teacherMode={teacherMode} setTeacherMode={setTeacherMode} onMission={m=>{setCurrent(m);setScreen('play')}} onToolkit={()=>setScreen('toolkit')} onMiniGames={()=>setScreen('mini')} onEditor={()=>setScreen('editor')} onBadges={()=>setScreen('badges')} onCert={()=>setScreen('cert')} /></div>;
}
