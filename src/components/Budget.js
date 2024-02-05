import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, dispatch, expenses } = useContext(AppContext);
  const [editable, setEditable] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const upperLimit = 20000;

  const totalSpending = expenses.reduce((total, item) => total + item.cost, 0);

  const handleIncrease = () => {
    setNewBudget((prevBudget) => Math.min(prevBudget + 10, upperLimit));
  };

  const handleDecrease = () => {
    setNewBudget((prevBudget) => Math.max(prevBudget - 10, 0));
  };

  const handleSave = () => {
    if (newBudget > upperLimit) {
      // Display error message and do not update the budget
      alert("Error: Budget cannot exceed £20,000");
    }else if (newBudget < totalSpending) {
        alert("Error: Budget cannot be lower than spending");
    }else{
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
      <span>Budget: £{budget}</span>

      {editable ? (
        <div>
          <input
            type="number"
            step="10"
            value={newBudget}
            onChange={(e) => setNewBudget(parseFloat(e.target.value))}
          />
          <button onClick={handleIncrease}>Increase by 10</button>
          <button onClick={handleDecrease}>Decrease by 10</button>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <button onClick={() => setEditable(true)}>Edit Budget</button>
      )}
    </div>
  );
};

export default Budget;
