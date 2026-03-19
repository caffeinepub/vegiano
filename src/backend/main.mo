import List "mo:core/List";

actor {
  type Item = {
    name : Text;
    quantity : Nat;
    price : Float;
  };

  type Order = {
    customerName : Text;
    phoneNumber : Text;
    address : Text;
    items : [Item];
    totalAmount : Float;
  };

  let orders = List.empty<Order>();

  public shared ({ caller }) func submitOrder(customerName : Text, phoneNumber : Text, address : Text, items : [Item], totalAmount : Float) : async () {
    let newOrder : Order = {
      customerName;
      phoneNumber;
      address;
      items;
      totalAmount;
    };
    orders.add(newOrder);
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.toArray();
  };
};
