import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function generatePdf(
  { dishes, orderId, totalPrice, date },
  { address, phone, name }
) {
  const arr = [];
  dishes.forEach((dish, _) => {
    const newDish = Object.values(dish).slice(2, 5);
    newDish[3] = newDish[2] * newDish[1];
    arr.push(newDish);
  });

  const doc = new jsPDF("p", "mm", [110, 150]);

  doc.setFontSize(10);

  doc.text(`Invoice: Order Id: ${orderId}`, 40, 10);

  doc.setFontSize(8);
  doc.text(`${name}`, 10, 20);
  doc.text(`${address}`, 10, 25);
  doc.text(`Phone(+91 ${phone})`, 10, 30);

  doc.text(`Date Invoice: ${new Date(date).toLocaleDateString()}`, 10, 35);

  doc.autoTable({
    theme: "plain",
    startY: 45,
    styles: {
      cellPadding: 2,
      fontSize: 8,
      halign: "center",
      valign: "middle",
    },
    head: [["Name", "Price", "Quantity", "Amount"]],
    body: arr,
  });

  let finalY = doc.previousAutoTable.finalY;
  doc.text(`Total:  $${totalPrice}`, 75, finalY + 10); //you use the variable and add the number of pixels you want it to move.

  window.open(doc.output("bloburl"));
}
