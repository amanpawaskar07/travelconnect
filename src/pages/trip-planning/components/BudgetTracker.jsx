import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BudgetTracker = ({ trip, onUpdateTrip }) => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const expenseCategories = [
    { id: 'accommodation', label: 'Accommodation', icon: 'Building', color: 'bg-purple-100 text-purple-700', spent: 800, budget: 1200 },
    { id: 'transport', label: 'Transport', icon: 'Car', color: 'bg-blue-100 text-blue-700', spent: 600, budget: 800 },
    { id: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed', color: 'bg-orange-100 text-orange-700', spent: 400, budget: 600 },
    { id: 'activities', label: 'Activities', icon: 'MapPin', color: 'bg-green-100 text-green-700', spent: 300, budget: 500 },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag', color: 'bg-pink-100 text-pink-700', spent: 150, budget: 300 },
    { id: 'miscellaneous', label: 'Miscellaneous', icon: 'MoreHorizontal', color: 'bg-gray-100 text-gray-700', spent: 50, budget: 100 }
  ];

  const recentExpenses = [
    {
      id: 1,
      title: "Hotel Shibuya Booking",
      category: "accommodation",
      amount: 150,
      date: "2024-02-15",
      status: "confirmed",
      description: "3 nights accommodation"
    },
    {
      id: 2,
      title: "Flight to Tokyo",
      category: "transport",
      amount: 800,
      date: "2024-02-14",
      status: "confirmed",
      description: "Round trip flights"
    },
    {
      id: 3,
      title: "Sushi Restaurant",
      category: "food",
      amount: 80,
      date: "2024-02-13",
      status: "planned",
      description: "Lunch at Tsukiji Market"
    },
    {
      id: 4,
      title: "Temple Visit",
      category: "activities",
      amount: 0,
      date: "2024-02-13",
      status: "planned",
      description: "Senso-ji Temple tour"
    }
  ];

  const totalSpent = expenseCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = expenseCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = (totalSpent / totalBudget) * 100;

  const getCategoryConfig = (categoryId) => {
    return expenseCategories.find(cat => cat.id === categoryId) || expenseCategories[5];
  };

  const filteredExpenses = selectedCategory === 'all' 
    ? recentExpenses 
    : recentExpenses.filter(expense => expense.category === selectedCategory);

  const handleAddExpense = (expenseData) => {
    console.log('Adding expense:', expenseData);
    setShowAddExpense(false);
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="bg-gradient-to-r from-primary to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-xl">Budget Overview</h2>
          <button
            onClick={() => setShowAddExpense(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 hover-lift flex items-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span>Add Expense</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold mb-1">${totalBudget}</div>
            <div className="text-white/80 font-body text-sm">Total Budget</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold mb-1">${totalSpent}</div>
            <div className="text-white/80 font-body text-sm">Spent</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-heading font-bold mb-1 ${remainingBudget < 0 ? 'text-red-300' : ''}`}>
              ${remainingBudget}
            </div>
            <div className="text-white/80 font-body text-sm">Remaining</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-sm text-white/80">Budget Usage</span>
            <span className="font-body text-sm text-white/80">{Math.round(spentPercentage)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                spentPercentage > 90 ? 'bg-red-400' : spentPercentage > 75 ? 'bg-yellow-400' : 'bg-green-400'
              }`}
              style={{ width: `${Math.min(spentPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-surface rounded-xl p-6 border border-subtle">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">Category Breakdown</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {expenseCategories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            return (
              <div key={category.id} className="bg-background rounded-lg p-4 border border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                      <Icon name={category.icon} size={20} />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-text-primary">{category.label}</h4>
                      <p className="font-caption text-xs text-text-secondary">
                        ${category.spent} of ${category.budget}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading font-semibold text-sm text-text-primary">
                      {Math.round(percentage)}%
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-surface rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage > 90 ? 'bg-error' : percentage > 75 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-surface rounded-xl p-6 border border-subtle">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-text-primary">Recent Expenses</h3>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-background border border-subtle rounded-lg font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All Categories</option>
            {expenseCategories.map((category) => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredExpenses.map((expense) => {
            const categoryConfig = getCategoryConfig(expense.category);
            return (
              <div key={expense.id} className="bg-background rounded-lg p-4 border border-subtle hover:border-primary/30 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoryConfig.color}`}>
                      <Icon name={categoryConfig.icon} size={20} />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-text-primary">{expense.title}</h4>
                      <p className="font-body text-sm text-text-secondary">{expense.description}</p>
                      <p className="font-caption text-xs text-text-secondary">
                        {new Date(expense.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-heading font-bold text-lg text-text-primary">
                      ${expense.amount}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-caption
                      ${expense.status === 'confirmed' ?'bg-success-100 text-success-700' :'bg-warning-100 text-warning-700'
                      }`}>
                      {expense.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="text-text-secondary/50 mx-auto mb-4" />
            <p className="font-body text-text-secondary">No expenses found for this category</p>
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-soft-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-semibold text-lg text-text-primary">Add Expense</h3>
              <button
                onClick={() => setShowAddExpense(false)}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddExpense({
                title: formData.get('title'),
                category: formData.get('category'),
                amount: parseFloat(formData.get('amount')),
                description: formData.get('description')
              });
            }} className="space-y-4">
              <div>
                <label className="block font-body text-sm text-text-primary mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Expense title"
                />
              </div>
              
              <div>
                <label className="block font-body text-sm text-text-primary mb-2">Category</label>
                <select
                  name="category"
                  required
                  className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {expenseCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block font-body text-sm text-text-primary mb-2">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block font-body text-sm text-text-primary mb-2">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Optional description"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-body text-sm transition-all duration-200 hover-lift"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;