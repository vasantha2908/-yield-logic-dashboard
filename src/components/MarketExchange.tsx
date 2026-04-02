
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarketExchange({ previewOnly }: { previewOnly?: boolean }) {
  const data = [
    { day: 'Mon', price: 40, expected: 38 },
    { day: 'Tue', price: 42, expected: 40 },
    { day: 'Wed', price: 41, expected: 41 },
    { day: 'Thu', price: 45, expected: 43 },
    { day: 'Fri', price: 48, expected: 45 },
    { day: 'Sat', price: 50, expected: 48 },
  ];

  return (
    <div className="glass-panel" style={{ height: previewOnly ? '350px' : '500px', display: 'flex', flexDirection: 'column' }}>
       <h3 style={{ marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>MARKET PRICES ($ / TON)</h3>
       <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>See the current best prices for your crop. Our system automatically sells your crop when the price is highest.</p>
       
       <div style={{ flex: 1, width: '100%' }}>
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
             <defs>
               <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                 <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <XAxis dataKey="day" stroke="#94a3b8" />
             <YAxis stroke="#94a3b8" tickFormatter={(val) => `$${val}`} />
             <Tooltip 
               contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#f8fafc', borderRadius: '8px' }} 
               formatter={(value) => [`$${value}`, 'Price per Ton']}
             />
             <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
           </AreaChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
}
