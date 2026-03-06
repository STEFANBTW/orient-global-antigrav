import React from 'react';

const DashboardScreen: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-background-dark text-gray-800 dark:text-gray-200 font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 h-[calc(100vh-4rem)] sticky top-16 bg-stone-900 border-r border-primary/10 z-50">
        <div className="p-6 flex items-center gap-3">
          <span className="material-icons text-primary text-2xl">restaurant</span>
          <h1 className="text-lg font-bold tracking-wider text-white">ORIENT</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-2">
          <NavItem icon="dashboard" label="Dashboard" />
          <NavItem icon="restaurant_menu" label="Menu" />
          <NavItem icon="loyalty" label="Rewards" active />
          <NavItem icon="event" label="Reservations" />
          <NavItem icon="history" label="Orders" />
        </nav>
        <div className="p-5 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">ED</div>
            <div>
              <p className="text-xs font-medium text-white">Elias Doe</p>
              <p className="text-[10px] text-primary">Gold Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-stone-900 border-b border-white/5 sticky top-16 z-50">
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary">restaurant</span>
          <span className="font-bold text-white">ORIENT</span>
        </div>
        <button className="text-white"><span className="material-icons">menu</span></button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 space-y-10 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Loyalty Dashboard</h2>
            <p className="text-gray-400 text-sm">Welcome back, Elias. You're just 250 points away from Platinum.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-white/10 hover:border-primary/50 text-xs text-gray-300 transition-all">
              <span className="material-icons text-xs">qr_code</span> Show Card ID
            </button>
            <button className="relative p-1.5 rounded-lg bg-stone-900 border border-white/10 hover:text-primary transition-colors">
              <span className="material-icons text-lg">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Section 1: Status Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gold Card */}
          <div className="col-span-1 lg:col-span-2 relative group transition-transform hover:scale-[1.005] duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a110c] to-[#38251b] rounded-2xl transform rotate-1 opacity-50"></div>
            <div className="relative bg-gradient-to-135 from-[#1a110c] to-[#38251b] rounded-2xl p-6 h-full min-h-[260px] flex flex-col justify-between shadow-2xl shadow-black/50 border border-white/5 overflow-hidden">
               {/* Decorative background */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
               
               <div className="flex justify-between items-start z-10">
                 <div>
                   <h3 className="text-white/80 uppercase tracking-[0.2em] text-[10px] mb-1">Orient Rewards</h3>
                   <div className="flex items-center gap-2">
                     <span className="material-icons text-yellow-500 text-sm">verified</span>
                     <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary animate-pulse">GOLD STATUS</span>
                   </div>
                 </div>
                 <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <span className="material-icons text-primary/50 text-2xl">stars</span>
                 </div>
               </div>

               <div className="space-y-4 z-10">
                 <div className="flex items-end gap-2">
                   <span className="text-5xl font-bold text-white tracking-tighter">1,250</span>
                   <span className="text-lg text-primary mb-1 font-medium">Taste Points</span>
                 </div>
                 <div>
                   <div className="flex justify-between text-[10px] mb-1.5 text-gray-400">
                     <span>Current: Gold</span>
                     <span>Next: Platinum (1,500 pts)</span>
                   </div>
                   <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[83%] rounded-full shadow-[0_0_10px_rgba(242,108,13,0.6)]"></div>
                   </div>
                 </div>
               </div>

               <div className="flex justify-between items-end mt-3 text-[10px] text-white/30 font-mono z-10">
                 <span>ID: 9942-8821-0034</span>
                 <span>VALID THRU: 12/25</span>
               </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="col-span-1 grid grid-rows-2 gap-3">
            <StatCard icon="redeem" value="3 Rewards" label="Available to redeem" color="primary" />
            <StatCard icon="savings" value="$145 Saved" label="Lifetime savings" color="green" />
          </div>
        </section>

        {/* Section 2: Points to Perks */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-white border-l-4 border-primary pl-3">Points to Perks</h3>
            <a href="#" className="text-xs text-primary hover:text-white transition-colors">View All Rewards -&gt;</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <RewardCard 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDzrKIFU8hgEeN11ywWouhA9nYK8rDkUfI0mojQpjz0Vj6wyxtO91A5mVx_gkJ21ycijQjxdztP3lpb8Gsbi6oAoismUpHhVT1gOQ9vNHvMyJ5oN20IgVuiT_yVl3kpwvMa7M-5DVG_fb0M4EbUruMOWjSXco9Sfk8cCppx35cvFEZt0_TPgQjoFYlnhXOpuxoQ_lcNGamBuC7SY95669qjRum43muLmwgVFqKuVL6CqT6u81Ew8Uw8nGh5UtQ1jo_yio4LTalEWKF-"
              points={500}
              title="Signature Cocktail"
              desc="Enjoy one of our award-winning signature cocktails on the house."
            />
            <RewardCard 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuCzTo7_0eFZaxPEmuILjXBHwrwvps7PV4htnzVCVgQk9PEzB7kYBXC1_7Du4XDAOLMIOOKDjmr-dyCyq1fBVXL8LiddBJ-H3xGPz2C1Tk1f0IZB8ky5KWMo52bmGm3UjxzKzu2B0tuyfsVwUrEyhiwuOOy71RP3XWP_Be9WPmTJVNbYkHwpep84T-VvQtGFMqY-TR2bh87FfZfV-VLc1hwIo-O_XO8zGweJFscqK3v_z4dsy_M4wLTApiCrHtLG_CO8B8sNWa9LXt3J"
              points={1000}
              title="10% Off Total Bill"
              desc="Get an exclusive 10% discount on your entire dining experience."
            />
             <div className="bg-stone-900 rounded-xl overflow-hidden group border border-white/5 opacity-70 hover:opacity-100 transition-opacity">
               <div className="h-40 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLHzeFeKGDLuaczQbsAMUryGVncQEIhz1VmNzopnSCvYFb8cdfVgcNeafN5h0AnFnqEfMkC18Ue5pqnDtPeIywp6T5jpKyd6NRTQmm4E0LKsg9t5-4XlmhrY3Jzs_14xpZhoCZxqtsflulM-7DCXu7ddGL74AVWtItphOaU_MvtxqBJeBnN7CgUo8_VlkCePYXSTja3lYirUxKapc03n53QE_bZFTIuo1SctjU2QFvE2wVtEdhUj8A98obI0ajRI5BOTwxr6aS4YCK" alt="VIP" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                   <span className="material-icons text-3xl text-white/50">lock</span>
                 </div>
                 <span className="absolute top-2.5 right-2.5 bg-white/10 backdrop-blur-md text-white/70 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10">2000 PTS</span>
               </div>
               <div className="p-5">
                 <h4 className="text-base font-bold text-gray-300 mb-1.5">VIP Table Booking</h4>
                 <p className="text-gray-500 text-xs mb-3">Priority reservation for the best seat in the house with champagne.</p>
                 <div className="relative w-full h-1.5 bg-white/5 rounded-full mb-3">
                   <div className="absolute top-0 left-0 h-full bg-primary/50 w-[62%] rounded-full"></div>
                 </div>
                 <button className="w-full py-2 rounded-lg bg-white/5 text-gray-500 text-xs font-medium cursor-not-allowed flex items-center justify-center gap-2" disabled>
                   750 Points Needed
                 </button>
               </div>
             </div>
          </div>
        </section>

        {/* Section 3: History */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-white border-l-4 border-primary pl-3">Recent Dining History</h3>
            <button className="p-1 text-gray-400 hover:text-white"><span className="material-icons text-sm">filter_list</span></button>
          </div>
          <div className="bg-stone-900 rounded-xl overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-wider">
                    <th className="p-3 font-semibold">Date</th>
                    <th className="p-3 font-semibold">Location</th>
                    <th className="p-3 font-semibold">Items</th>
                    <th className="p-3 font-semibold">Spent</th>
                    <th className="p-3 font-semibold text-right">Points</th>
                    <th className="p-3 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                  <HistoryRow date="Oct 24, 2023" location="Downtown Branch" items="Spicy Miso Ramen, Gyoza..." spent="$45.00" points="+450" />
                  <HistoryRow date="Oct 12, 2023" location="Westside Terrace" items="Salmon Sashimi, Sake Flight..." spent="$82.50" points="+825" />
                  <HistoryRow date="Sep 28, 2023" location="Downtown Branch" items="Wagyu Beef Sliders, Matcha..." spent="$34.00" points="+340" />
                </tbody>
              </table>
            </div>
            <div className="p-3 border-t border-white/5 text-center">
              <button className="text-xs text-gray-400 hover:text-primary transition-colors">Load More History</button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

// Sub-components for cleanliness
const NavItem = ({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) => (
  <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'text-white bg-primary/20 border-l-4 border-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    <span className={`material-icons text-lg ${active ? 'text-primary' : ''}`}>{icon}</span>
    <span className={`text-sm ${active ? 'font-medium' : ''}`}>{label}</span>
  </a>
);

const StatCard = ({ icon, value, label, color }: { icon: string, value: string, label: string, color: 'primary' | 'green' }) => (
  <div className="glass-card p-4 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
    <div className={`w-10 h-10 rounded-full ${color === 'primary' ? 'bg-primary/20' : 'bg-green-900/30'} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
      <span className={`material-icons text-lg ${color === 'primary' ? 'text-primary' : 'text-green-500'}`}>{icon}</span>
    </div>
    <h4 className="text-base font-bold text-white">{value}</h4>
    <p className="text-[10px] text-gray-400">{label}</p>
  </div>
);

const RewardCard = ({ image, points, title, desc }: { image: string, points: number, title: string, desc: string }) => (
  <div className="bg-stone-900 rounded-xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-300">
    <div className="h-40 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
      <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10">{points} PTS</span>
    </div>
    <div className="p-5">
      <h4 className="text-base font-bold text-white mb-1.5">{title}</h4>
      <p className="text-gray-400 text-xs mb-3">{desc}</p>
      <button className="w-full py-2 rounded-lg bg-primary hover:bg-orange-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
        <span className="material-icons text-sm">lock_open</span> Redeem
      </button>
    </div>
  </div>
);

const HistoryRow = ({ date, location, items, spent, points }: { date: string, location: string, items: string, spent: string, points: string }) => (
  <tr className="hover:bg-white/5 transition-colors group">
    <td className="p-3">{date}</td>
    <td className="p-3 flex items-center gap-2">
      <span className="material-icons text-[10px] text-primary">place</span> {location}
    </td>
    <td className="p-3 text-gray-400">{items}</td>
    <td className="p-3 font-medium text-white">{spent}</td>
    <td className="p-3 text-right text-primary font-bold">{points}</td>
    <td className="p-3 text-center">
      <button className="text-[10px] font-medium text-primary hover:text-white border border-primary/30 hover:bg-primary px-2.5 py-1 rounded transition-all">Reorder</button>
    </td>
  </tr>
);

export default DashboardScreen;