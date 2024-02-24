import { useAuth } from "../context/authContext";

export default function FuelHistory() {
    const {getUser} = useAuth()

    const user = getUser()

    return (
        <div>
            <table>
        <tr>
          <th>Gallons Requested</th>
          <th>Delivery Address</th>
          <th>Delivery Date</th>
          <th>Suggested Price</th>
          <th>Total Amount Due</th>
        </tr>
        {user["orders"].map((order,i) => {
            return(
            <tr key={i}>
                <td>{order["gallonsRequested"]}</td>
                <td>{order["deliveryAddress"]}</td>
                <td>{order["deliveryDate"]}</td>
                <td>{order["suggestedPrice"]}</td>
                <td>{order["totalAmountDue"]}</td>
            </tr>
            )
        })}
      </table>      
    </div>
    );
}