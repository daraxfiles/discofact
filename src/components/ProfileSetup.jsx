const avatars = ['🕵️','🕵️‍♀️','🧢','🦊','🐼','🦉'];
const colors = ['bg-blue-500','bg-pink-500','bg-emerald-500','bg-yellow-500','bg-purple-500'];
export default function ProfileSetup({profile,setProfile,onSave}){return <div className='p-6 max-w-3xl mx-auto'>
<h2 className='text-2xl font-bold'>Create your Detective Profile</h2>
<input className='mt-3 w-full p-3 rounded-xl border' placeholder='Nickname only (no real name)' value={profile.nickname} onChange={e=>setProfile({...profile,nickname:e.target.value.slice(0,20)})}/>
<div className='mt-4 flex gap-2 flex-wrap'>{avatars.map(a=><button key={a} onClick={()=>setProfile({...profile,avatar:a})} className={'text-3xl p-3 rounded-xl border '+(profile.avatar===a?'bg-indigo-100 border-indigo-600':'bg-white')}>{a}</button>)}</div>
<div className='mt-4 flex gap-2'>{colors.map(c=><button key={c} onClick={()=>setProfile({...profile,badgeColor:c})} className={`w-10 h-10 rounded-full ${c} ${profile.badgeColor===c?'ring-4 ring-slate-900':''}`} aria-label='badge color'/>)}</div>
<button onClick={onSave} className='mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white'>Save Profile</button></div>}
