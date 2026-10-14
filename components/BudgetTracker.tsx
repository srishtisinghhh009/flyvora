import React, { useState } from 'react';
import { BudgetExpense } from '../types';
import { DollarSign, PieChart, Plus, Trash2, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export const BudgetTracker: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(50000);
  const [tripDays, setTripDays] = useState<number>(4);
  const [travelers, setTravelers] = useState<number>(2);

  // Category estimates
  const [expenses, setExpenses] = useState<BudgetExpense[]>([
    { id: '1', category: 'Accommodation', title: 'Heritage Hotel (3 Nights)', amount: 21000 },
    { id: '2', category: 'Transport', title: 'AC Chauffeur Sedan + Fuel & Tolls', amount: 9500 },
    { id: '3', category: 'Food & Dining', title: 'Royal Thalis, Street Chaat, Cafes', amount: 8000 },
    { id: '4', category: 'Activities & Entry', title: 'Fort Tickets & Guided Boat Tour', amount: 4500 },
    { id: '5', category: 'Shopping & Misc', title: 'Textiles, Souvenirs & Emergency Cash', amount: 3500 },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState<number>(1000);
  const [newCategory, setNewCategory] = useState<BudgetExpense['category']>('Activities & Entry');

  // Category totals
  const categoryTotals = {
    Accommodation: expenses.filter(e => e.category === 'Accommodation').reduce((s, e) => s + e.amount, 0),
    Transport: expenses.filter(e => e.category === 'Transport').reduce((s, e) => s + e.amount, 0),
    'Food & Dining': expenses.filter(e => e.category === 'Food & Dining').reduce((s, e) => s + e.amount, 0),
    'Activities & Entry': expenses.filter(e => e.category === 'Activities & Entry').reduce((s, e) => s + e.amount, 0),
    'Shopping & Misc': expenses.filter(e => e.category === 'Shopping & Misc').reduce((s, e) => s + e.amount, 0),
  };

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const dailyAverage = totalSpent / Math.max(1, tripDays);

  const categoryColors = {
    Accommodation: 'bg-[#FF5500]',
    Transport: 'bg-[#0088FF]',
    'Food & Dining': 'bg-[#7B2CBF]',
    'Activities & Entry': 'bg-emerald-500',
    'Shopping & Misc': 'bg-amber-500',
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || newAmount <= 0) return;

    const newExpense: BudgetExpense = {
      id: `exp-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      amount: Number(newAmount)
    };

    setExpenses([...expenses, newExpense]);
    setNewTitle('');
    setNewAmount(1000);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7B2CBF] uppercase tracking-widest mb-1.5">
            <PieChart className="w-3.5 h-3.5" />
            <span>Real-Time Expense Forecasting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            India Travel Budget Tracker
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Forecast and distribute expenses across stays, transit, meals, entry permits, and local shopping with live balance recalculations.
          </p>
        </div>

        {/* Top Control Bar: Total Budget, Days & Travelers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Total Trip Budget Target (₹ INR)</label>
            <input
              type="number"
              step="1000"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-base font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] tabular-nums"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Trip Duration (Days)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={tripDays}
              onChange={(e) => setTripDays(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 text-base font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] tabular-nums"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Number of Travelers</label>
            <input
              type="number"
              min="1"
              max="20"
              value={travelers}
              onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 text-base font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#FF5500] tabular-nums"
            />
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Estimated Total Spent</div>
            <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
              ₹{totalSpent.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {((totalSpent / (totalBudget || 1)) * 100).toFixed(0)}% of target allocated
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Remaining Funds</div>
            <div className={`text-2xl font-black mt-1 tabular-nums ${remainingBudget >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ₹{remainingBudget.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {remainingBudget >= 0 ? 'Available for emergency or leisure' : 'Exceeds target budget by ' + Math.abs(remainingBudget)}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Daily Burn Rate</div>
            <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
              ₹{Math.round(dailyAverage).toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              ₹{Math.round(dailyAverage / Math.max(1, travelers)).toLocaleString('en-IN')} per traveler/day
            </div>
          </div>
        </div>

        {/* Visual Distribution Segmented Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Category Spending Distribution</h3>
            <span className="text-xs text-slate-400 tabular-nums">Total: ₹{totalSpent.toLocaleString('en-IN')}</span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
            {Object.entries(categoryTotals).map(([cat, amount]) => {
              const pct = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
              if (pct === 0) return null;
              return (
                <div
                  key={cat}
                  style={{ width: `${pct}%` }}
                  className={`${categoryColors[cat as keyof typeof categoryColors]} transition-all duration-300 relative group`}
                  title={`${cat}: ₹${amount.toLocaleString('en-IN')} (${pct.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          {/* Category Legend & Breakdown Values */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {Object.entries(categoryTotals).map(([cat, amount]) => {
              const pct = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                    <span className={`w-2.5 h-2.5 rounded-full ${categoryColors[cat as keyof typeof categoryColors]}`} />
                    <span className="truncate">{cat}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 tabular-nums">
                    ₹{amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400 tabular-nums">
                    {pct.toFixed(0)}% of total
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Line Item & Current Expenses Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add Line Item Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF5500]" />
              <span>Add Expense Item</span>
            </h3>

            <form onSubmit={handleAddExpense} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="Accommodation">Accommodation</option>
                  <option value="Transport">Transport</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Activities & Entry">Activities & Entry</option>
                  <option value="Shopping & Misc">Shopping & Misc</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Scuba diving ticket, Taj entry, dinner"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Estimated Cost (₹ INR)</label>
                <input
                  type="number"
                  step="100"
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 tabular-nums"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-[#FF5500] rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Budget</span>
              </button>
            </form>
          </div>

          {/* Current Expenses Table */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Active Expense Items ({expenses.length})
            </h3>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {expenses.map((exp) => (
                <div key={exp.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900">{exp.title}</div>
                    <div className="text-[11px] text-slate-400">{exp.category}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 tabular-nums">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                      aria-label="Delete expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5 italic">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Budget estimates are purely for planning. Real-time rates depend on local seasonal tariffs and supplier terms.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
