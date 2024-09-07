export type TIndividualOrder = {
  customerName: string;
  _id?: string;
  address: string;
  industry?: string;
  urgentOrder?: boolean;
  orderId: string;
  phoneNumber: string;
  orderStatus: string;
  orderBGColor: string;
  tryerDate: string;
  orderDate: string;
  deliveryDate: string;
  item: [
    {
      category: string;
      measurement: object[];
      lugeSize: string[];
      quantity: number;
      note: string;
    }
  ];
};
