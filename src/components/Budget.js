// Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, dispatch, expenses, currency } = useContext(AppContext);
  const [editable, setEditable] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const upperLimit = 20000;

  const totalSpending = expenses.reduce((total, item) => total + item.cost, 0);

  const handleSave = () => {
    if (newBudget > upperLimit) {
      // Display error message and do not update the budget
      alert("Error: Budget cannot exceed £20,000");
    } else if (newBudget < totalSpending) {
      // Display error message as the budget cannot be lower than spending
      alert("Error: Budget cannot be lower than the total spending");
    } else {
      // Include the payload field with the new budget value
      dispatch({
        type: 'UPDATE_BUDGET',
        payload: newBudget, // Include the new budget value in the payload
      });
    }
    setEditable(false);
  };

  return (
    <div className='alert alert-secondary'>
      <label>Budget:</label>
      {editable ? (
        <div>
          <label>{currency}</label>
          <input
            type="number"
            step="10"
            value={newBudget}
            onChange={(e) => setNewBudget(parseFloat(e.target.value))}
          />
        </div>
      ) : (
        <label>
          {currency} {budget}
        </label>
      )}

      {editable && (
        <div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      {!editable && (
        <div>
          <button onClick={() => setEditable(true)}>Edit Budget</button>
        </div>
      )}
    </div>
  );
};

export default Budget;
