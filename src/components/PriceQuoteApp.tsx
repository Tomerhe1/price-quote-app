'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, FileDown, Save } from 'lucide-react';

interface Item {
  id: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

const PriceQuoteApp: React.FC = () => {
  const [customerName, setCustomerName] = useState<string>('נמסטה 193, חולון');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [items, setItems] = useState<Item[]>([
    { id: 1, description: 'נקודת חשמל', quantity: 1, price: 2900, total: 2900 },
    { id: 2, description: 'חיבור מכונת כביסה', quantity: 1, price: 1800, total: 1800 },
    { id: 3, description: 'חיבור תנור חשמלי', quantity: 1, price: 1800, total: 1800 },
    { id: 4, description: 'נקודת כוח', quantity: 42, price: 220, total: 9240 },
    { id: 5, description: 'נקודת כוח כפולה', quantity: 12, price: 280, total: 3360 },
    { id: 6, description: 'ת. תאורה', quantity: 176, price: 190, total: 33440 },
    { id: 7, description: 'נקודות תקשורת הכנה בלבד', quantity: 40, price: 50, total: 2000 },
    { id: 8, description: 'מפסק חד קוטבי', quantity: 8, price: 280, total: 2240 },
    { id: 9, description: 'מפסק חלף קוטבי', quantity: 5, price: 1000, total: 5000 },
    { id: 10, description: 'מפסק מחלף צלב חשמלי', quantity: 2, price: 1000, total: 2000 },
    { id: 11, description: 'חיבור מאוורר', quantity: 4, price: 290, total: 1160 },
    { id: 12, description: 'קו הזנה', quantity: 3, price: 550, total: 1650 },
    { id: 13, description: 'UPS', quantity: 8, price: 850, total: 6800 },
    { id: 14, description: 'ח.ח', quantity: 9, price: 270, total: 2430 },
    { id: 15, description: 'נקודת תקשורת הכנה בלבד', quantity: 29, price: 190, total: 5510 },
    { id: 16, description: 'לד סטריפ', quantity: 3, price: 200, total: 600 },
    { id: 17, description: 'טלויזיה', quantity: 5, price: 200, total: 1000 },
    { id: 18, description: 'לוח חשמל ראשי', quantity: 1, price: 6000, total: 6000 },
    { id: 19, description: 'לוח חשמל משני', quantity: 2, price: 4500, total: 9000 },
    { id: 20, description: 'לוח תקשורת הכנה בלבד', quantity: 1, price: 900, total: 900 },
    { id: 21, description: 'חפירת כוח', quantity: 14, price: 270, total: 3780 },
    { id: 22, description: 'נקודת כוח כפול', quantity: 7, price: 320, total: 2240 },
    { id: 23, description: 'קו הזנה בחלל', quantity: 20, price: 120, total: 2400 },
    { id: 24, description: 'מגבילות הכנה בלבד', quantity: 5, price: 180, total: 900 },
    { id: 25, description: 'ברקים', quantity: 5, price: 180, total: 900 },
    { id: 26, description: 'נקודת פיה 5x1.5', quantity: 3, price: 450, total: 1350 },
    { id: 27, description: 'רכבת חשמלי', quantity: 1, price: 1800, total: 1800 },
    { id: 28, description: 'מאורה', quantity: 3, price: 200, total: 600 },
    { id: 29, description: 'חיבור על לא שקע', quantity: 1, price: 250, total: 250 },
    { id: 30, description: 'מעבר מין הקיר הכנה', quantity: 2, price: 450, total: 900 }
  ]);

  const updateItem = (id: number, field: keyof Item, value: string | number): void => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addNewItem = (): void => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems([...items, { id: newId, description: '', quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (id: number): void => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const exportToPDF = (): void => {
    window.print();
  };

  const saveQuote = (): void => {
    const quoteData = {
      customerName,
      customerAddress,
      items,
      date: new Date().toISOString(),
      total: calculateTotal()
    };
    localStorage.setItem('lastQuote', JSON.stringify(quoteData));
    alert('ההצעה נשמרה בהצלחה!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <div className="p-8">
          {/* Header */}
          <div className="text-right mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">אתים קייסי</h1>
            <div className="text-gray-600 space-y-1">
              <div>עבודות חשמל ותקשורת</div>
              <div>רח׳ נווה חיים 7, חדרה</div>
              <div>טל: 053-7792489</div>
            </div>
            <h2 className="text-2xl font-semibold mt-6 text-gray-800">הצעת מחיר</h2>
          </div>

          {/* Customer Details */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-600 font-medium">
                תאריך: {new Date().toLocaleDateString('he-IL')}
              </div>
              <div className="flex items-center">
                <span className="font-bold ml-2">לכבוד:</span>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="border-b-2 border-gray-200 mx-2 text-right focus:outline-none focus:border-blue-500 p-2 bg-transparent"
                  placeholder="שם הלקוח"
                />
              </div>
            </div>
            <div className="flex justify-end items-center">
              <span className="font-bold ml-2">כתובת:</span>
              <input 
                type="text" 
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="border-b-2 border-gray-200 mx-2 text-right focus:outline-none focus:border-blue-500 p-2 w-64 bg-transparent"
                placeholder="כתובת הפרויקט"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6 flex gap-3">
            <Button
              onClick={exportToPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              ייצא ל-PDF
            </Button>
            <Button
              onClick={saveQuote}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              שמור הצעה
            </Button>
            <Button
              onClick={addNewItem}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              הוסף פריט
            </Button>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="py-4 px-4 font-bold text-gray-700">פריט</th>
                  <th className="py-4 px-4 font-bold text-gray-700">כמות</th>
                  <th className="py-4 px-4 font-bold text-gray-700">מחיר יח׳</th>
                  <th className="py-4 px-4 font-bold text-gray-700">סה״כ</th>
                  <th className="py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <input 
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full border-b border-gray-200 focus:outline-none focus:border-blue-500 text-right p-2 bg-transparent"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input 
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-20 border rounded-md text-center p-2 bg-white"
                        min="1"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <input 
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                          className="w-24 border rounded-md text-center p-2 bg-white"
                        />
                        <span>₪</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{item.total.toLocaleString()} ₪</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex justify-end text-lg">
              <span className="font-bold ml-4 text-gray-700">סה״כ:</span>
              <span className="text-gray-900">{calculateTotal().toLocaleString()} ₪</span>
            </div>
            <div className="flex justify-end text-lg">
              <span className="font-bold ml-4 text-gray-700">מע״מ 17%:</span>
              <span className="text-gray-900">{(calculateTotal() * 0.17).toLocaleString()} ₪</span>
            </div>
            <div className="flex justify-end text-xl font-bold text-blue-600">
              <span className="ml-4">סה״כ כולל מע״מ:</span>
              <span>{(calculateTotal() * 1.17).toLocaleString()} ₪</span>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="mt-8 text-right space-y-2 text-gray-600">
            <div className="flex items-center justify-end">
              <span className="w-2 h-2 bg-gray-400 rounded-full ml-2"></span>
              התשלום במזומן או בהעברה בנקאית
            </div>
            <div className="flex items-center justify-end">
              <span className="w-2 h-2 bg-gray-400 rounded-full ml-2"></span>
              תוקף ההצעה: 14 ימים
            </div>
            <div className="flex items-center justify-end">
              <span className="w-2 h-2 bg-gray-400 rounded-full ml-2"></span>
              המחירים כוללים מע&quot;מ
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PriceQuoteApp;