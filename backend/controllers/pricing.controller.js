class PricingController {

  static generateSuggestedPrice(req, res) {
    const { location, recurringClient, gallonsRequested } = req.body;

    const location_factor = location == "TX" ? 0.02 : 0.04;
    const recurring_factor = recurringClient ? 0.01 : 0;
    const order_factor = gallonsRequested >= 1000 ? 0.02 : 0.03;
    const company_factor = 0.1;

    const price = 1.5;

    const margin =
      price *
      (location_factor - recurring_factor + order_factor + company_factor);

    const suggestedPrice = price + margin;

    const totalAmount = suggestedPrice * gallonsRequested;

    if (!location) {
      res.status(401).json({ error: "Location field empty" });
    } else if (recurringClient == null) {
      res.status(402).json({ error: "Recurring client not inputted" });
    } else {
      res.status(200).json({ suggestedPrice, totalAmount });
    }
  }
}

export default PricingController;

/*
Where,

Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

Consider these factors:
Location Factor = 2% for Texas, 4% for out of state.
Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
Company Profit Factor = 10% always

Example:
1500 gallons requested, in state, does have history (i.e. quote history data exist in DB for this client)

Margin => (.02 - .01 + .02 + .1) * 1.50 = .195
Suggested Price/gallon => 1.50 + .195 = $1.695
Total Amount Due => 1500 * 1.695 = $2542.50 
*/
