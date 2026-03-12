import React from 'react';

export default function Wearables({ navigateTo, onProductClick }: { navigateTo: (view: string) => void, onProductClick?: (product: any) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-[300vh]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="text-primary">
                <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Orient</span>
            </div>
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined">search</span>
                </span>
                <input className="block w-full pl-10 pr-3 py-2 border-none bg-primary/5 dark:bg-primary/10 rounded-lg focus:ring-2 focus:ring-primary text-sm" placeholder="Search smartwatches, fitness trackers..." type="text"/>
              </div>
            </div>
            {/* Nav Actions */}
            <nav className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-6 mr-4">
                <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Deals</a>
                <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Brands</a>
                <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Support</a>
              </div>
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors relative">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-1 right-1 size-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full">3</span>
              </button>
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">person</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 dark:text-slate-400 mb-8">
          <ol className="flex items-center space-x-2">
            <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a></li>
            <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
            <li><a className="hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('hub'); }}>Electronics</a></li>
            <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
            <li className="text-primary font-semibold">Wearable Tech</li>
          </ol>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Filters</h3>
                {/* Filter Group */}
                <div className="space-y-6">
                  {/* Type */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Device Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Smartwatches</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Fitness Trackers</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Smart Rings</span>
                      </label>
                    </div>
                  </div>
                  {/* Compatibility */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Compatibility</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">iOS Compatible</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Android Compatible</span>
                      </label>
                    </div>
                  </div>
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Health Features</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Heart Rate Monitor</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">ECG App</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Blood Oxygen</span>
                      </label>
                    </div>
                  </div>
                  {/* Brands */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Brands</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Apple</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Samsung</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Garmin</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"/>
                        <span className="text-sm group-hover:text-primary">Fitbit</span>
                      </label>
                    </div>
                  </div>
                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Price Range</h4>
                    <input className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary" type="range"/>
                    <div className="flex justify-between text-xs mt-2 font-medium">
                      <span>$0</span>
                      <span>$1000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          {/* Product Section */}
          <div className="flex-1">
            {/* Category Header */}
            <div className="mb-10 p-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 text-white relative overflow-hidden">
              <div className="relative z-10 max-w-lg">
                <h1 className="text-5xl font-black mb-4 tracking-tighter">Wearable Tech</h1>
                <p className="text-emerald-50/90 text-lg leading-relaxed">Track your fitness, stay connected, and monitor your health with the latest smartwatches and fitness trackers.</p>
                <div className="mt-6 flex gap-3">
                  <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium">New Arrivals</span>
                  <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium">Top Rated</span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.4,-44.7C85.5,-31.3,90.8,-15.7,89.5,-0.8C88.1,14.1,80.1,28.3,71,41.2C61.8,54.2,51.5,65.9,38.8,72.4C26.1,78.9,13,80.2,-0.2,80.6C-13.4,81,-26.8,80.5,-39.1,75.1C-51.3,69.7,-62.4,59.3,-70.7,46.8C-79,34.4,-84.6,19.9,-85.7,5.1C-86.8,-9.7,-83.4,-24.8,-76.2,-38.3C-68.9,-51.7,-57.8,-63.5,-44.6,-70.9C-31.3,-78.3,-15.7,-81.4,-0.1,-81.3C15.6,-81.1,31.2,-83.7,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
                </svg>
              </div>
            </div>
            {/* Sort & View Controls */}
            <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-4">
              <p className="text-sm font-medium"><span className="text-primary font-bold">85</span> Products found</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Sort by:</span>
                  <select className="text-sm font-semibold border-none bg-transparent focus:ring-0 cursor-pointer">
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Product Card 1 */}
              <div className="group bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Apple Watch Ultra 2 on rugged band" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_aT9iK2_g-J84Vf_Q0v2_zK001V_P_c13aQe1P8Vw0o6Rk_v1z_E_t8R319_n_l_j_i_8102_K_w_x_Z_v_Q_m_p_Y_u_N_b_C_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S" referrerPolicy="no-referrer" />
                  <button className="absolute top-4 right-4 size-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <span className="absolute bottom-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Bestseller</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-xs text-slate-400 ml-1">(842)</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Apple Watch Ultra 2</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">The most rugged and capable Apple Watch ever.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$799.00</span>
                    <button className="bg-primary hover:bg-orange-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 2 */}
              <div className="group bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Samsung Galaxy Watch 6 Classic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_aT9iK2_g-J84Vf_Q0v2_zK001V_P_c13aQe1P8Vw0o6Rk_v1z_E_t8R319_n_l_j_i_8102_K_w_x_Z_v_Q_m_p_Y_u_N_b_C_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S" referrerPolicy="no-referrer" />
                  <button className="absolute top-4 right-4 size-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star_half</span>
                    <span className="text-xs text-slate-400 ml-1">(512)</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Samsung Galaxy Watch 6 Classic</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">Timeless design with a rotating bezel and advanced health tracking.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$399.99</span>
                    <button className="bg-primary hover:bg-orange-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 3 */}
              <div className="group bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Garmin Fenix 7 Pro Sapphire Solar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_aT9iK2_g-J84Vf_Q0v2_zK001V_P_c13aQe1P8Vw0o6Rk_v1z_E_t8R319_n_l_j_i_8102_K_w_x_Z_v_Q_m_p_Y_u_N_b_C_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S" referrerPolicy="no-referrer" />
                  <button className="absolute top-4 right-4 size-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <span className="absolute bottom-4 left-4 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Premium</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-xs text-slate-400 ml-1">(215)</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Garmin Fenix 7 Pro</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">Ultimate multisport GPS watch with solar charging.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$899.99</span>
                    <button className="bg-primary hover:bg-orange-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 4 */}
              <div className="group bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Fitbit Charge 6 Fitness Tracker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_aT9iK2_g-J84Vf_Q0v2_zK001V_P_c13aQe1P8Vw0o6Rk_v1z_E_t8R319_n_l_j_i_8102_K_w_x_Z_v_Q_m_p_Y_u_N_b_C_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S" referrerPolicy="no-referrer" />
                  <button className="absolute top-4 right-4 size-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star_half</span>
                    <span className="text-xs text-slate-400 ml-1">(1.5k)</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Fitbit Charge 6</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">Advanced fitness and health tracker with Google features.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$159.95</span>
                    <button className="bg-primary hover:bg-orange-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 5 */}
              <div className="group bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Oura Ring Gen3 Horizon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_aT9iK2_g-J84Vf_Q0v2_zK001V_P_c13aQe1P8Vw0o6Rk_v1z_E_t8R319_n_l_j_i_8102_K_w_x_Z_v_Q_m_p_Y_u_N_b_C_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S" referrerPolicy="no-referrer" />
                  <button className="absolute top-4 right-4 size-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <span className="absolute top-4 left-4 bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md">Trending</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star_outline</span>
                    <span className="text-xs text-slate-400 ml-1">(345)</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Oura Ring Gen3 Horizon</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">Discreet, accurate health and sleep tracking in a titanium ring.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">$349.00</span>
                    </div>
                    <button className="bg-primary hover:bg-orange-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 6 */}
              <div className="group bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Google Pixel Watch 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_aT9iK2_g-J84Vf_Q0v2_zK001V_P_c13aQe1P8Vw0o6Rk_v1z_E_t8R319_n_l_j_i_8102_K_w_x_Z_v_Q_m_p_Y_u_N_b_C_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S" referrerPolicy="no-referrer" />
                  <button className="absolute top-4 right-4 size-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-xs text-slate-400 ml-1">(420)</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Google Pixel Watch 2</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">Helpful by Google. Health by Fitbit.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$349.99</span>
                    <button className="bg-primary hover:bg-orange-600 text-white p-3 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Featured Collection - Mid Page */}
            <div className="my-20 p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2">
                <img className="rounded-2xl shadow-2xl" data-alt="Person running wearing a smartwatch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_aT9iK2_g-J84Vf_Q0v2_zK001V_P_c13aQe1P8Vw0o6Rk_v1z_E_t8R319_n_l_j_i_8102_K_w_x_Z_v_Q_m_p_Y_u_N_b_C_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S_x_F_A_r_T_y_G_s_I_o_L_e_D_k_M_j_H_c_B_w_E_z_A_q_S" referrerPolicy="no-referrer" />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-black leading-tight italic">"Push your limits."</h2>
                <p className="text-slate-400 text-lg">Discover wearables designed for athletes. Track your metrics, optimize your recovery, and reach your peak performance.</p>
                <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all">Shop Sports Watches</button>
              </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mb-20">
              <nav className="flex items-center gap-2">
                <button className="p-2 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors">2</button>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors">3</button>
                <span className="px-2">...</span>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors">8</button>
                <button className="p-2 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-background-dark text-slate-300 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="text-primary">
                  <svg className="size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-lg font-bold">Orient Hypermarket</span>
              </div>
              <p className="text-sm leading-relaxed">Your ultimate destination for premium electronics and lifestyle products since 1995. Quality guaranteed.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Store Locator</a></li>
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Customer Service</h4>
              <ul className="space-y-4 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Shipping Info</a></li>
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Returns &amp; Refunds</a></li>
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-sm mb-4">Get the latest updates on wearable tech.</p>
              <div className="flex gap-2">
                <input className="bg-white/10 border-none rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-primary flex-1" placeholder="Email address" type="email"/>
                <button className="bg-primary text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2024 Orient Hypermarket. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Facebook</a>
              <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
              <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>X (Twitter)</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

