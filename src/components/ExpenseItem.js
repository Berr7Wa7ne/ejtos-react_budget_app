import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../App.css'; 

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{`${currency} ${props.cost}`}</td>
            <td>
                <button className="allocation-button" onClick={() => increaseAllocation(props.name)}>
                    <div className="green-circle">
                        <div className="white-cross"></div>
                    </div>
                </button>
            </td>
            <td onClick={handleDeleteExpense}>Delete</td>
        </tr>
    );
};

export default ExpenseItem;
