import React from 'react';

const OrderSummary = ({orderSummary}) => {
    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Authors</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderSummary.map((item) => (
                        <tr key={item.bookid}>
                            <td>{item.booktitle}</td>
                            <td>{item.authors}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price*item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            <h3>Total: {orderSummary.reduce((acc, item) => acc + item.price*item.quantity, 0).toFixed(2)}</h3>
        </div>
    );
};

export default OrderSummary;
