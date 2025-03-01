// src/pages/Menu.js

import React, { useState } from "react"; // ลบ useEffect ออก
import { useParams, Link } from "react-router-dom";
import "./Menu.css"; // เพิ่มไฟล์ CSS สำหรับสไตล์

// ตัวอย่างข้อมูลเมนูของร้านแต่ละร้าน
const menus = {
  1: [
    { id: 1, name: "Menu1", price: 30 },
    { id: 2, name: "Menu2", price: 35 },
    { id: 3, name: "Menu3", price: 40 },
  ],
  2: [
    { id: 1, name: "Special1", price: 50 },
    { id: 2, name: "Special2", price: 55 },
  ],
  3: [
    { id: 1, name: "MenuA", price: 60 },
    { id: 2, name: "MenuB", price: 65 },
  ],
  4: [
    { id: 1, name: "Food1", price: 20 },
    { id: 2, name: "Food2", price: 25 },
  ],
  5: [
    { id: 1, name: "Dish1", price: 40 },
    { id: 2, name: "Dish2", price: 45 },
  ]
};

// รายการ Add-on
const addOns = [
  { id: 1, name: "ไข่ดาว", price: 7 },
  { id: 2, name: "ไข่ต้ม", price: 6 },
  { id: 3, name: "พิเศษ", price: 5 }, // เพิ่ม "พิเศษ" ราคา 5 บาท
];

function Menu() {
  const { shopId } = useParams(); // ดึง shopId จาก URL
  const [cart, setCart] = useState([]); // state สำหรับเก็บข้อมูลตะกร้า
  const [selectedAddOns, setSelectedAddOns] = useState({}); // state สำหรับเก็บ Add-on ของแต่ละเมนู

  // ดึงข้อมูลเมนูของร้านจาก `menus` ตาม `shopId`
  const shopMenu = menus[shopId] || [];

  // ฟังก์ชันเลือก Add-on (toggle behavior)
  const handleAddOnChange = (itemId, addon) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      if (addon === null) {
        // ถ้าเลือก "ไม่มี" (Add-on = null)
        const updatedAddOns = { ...prevSelectedAddOns };
        delete updatedAddOns[itemId]; // ลบการเลือก Add-on
        return updatedAddOns;
      }
      // ถ้าเลือก Add-on อื่น ๆ
      return {
        ...prevSelectedAddOns,
        [itemId]: addon,
      };
    });
  };

  // ฟังก์ชันเพิ่มสินค้าในตะกร้า
  const addToCart = (item, selectedAddOn) => {
    const newItem = {
      ...item,
      addOn: selectedAddOn, // เพิ่ม Add-on ลงในข้อมูลสินค้า
    };

    const updatedCart = [...cart, newItem];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="menu-container">
      <h1>ร้าน {shopId}</h1>
      <div className="menu-items">
        {shopMenu.map((item) => {
          const selectedAddOn = selectedAddOns[item.id];

          return (
            <div key={item.id} className="menu-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} บาท</span>
              </div>

              {/* แสดง Add-on ให้เลือก */}
              <div className="addon-container">
                <span>เลือก Add-on: </span>
                {addOns.map((addon) => (
                  <label key={addon.id} className="addon-label">
                    <input
                      type="radio"
                      name={`addon-${item.id}`}
                      value={addon.name}
                      onChange={() => handleAddOnChange(item.id, addon)}
                      checked={selectedAddOn?.id === addon.id} // เพิ่มการตรวจสอบ selectedAddOn
                    />
                    {addon.name} ({addon.price} บาท)
                  </label>
                ))}

                {/* ตัวเลือกไม่เลือก Add-on */}
                <label className="addon-label">
                  <input
                    type="radio"
                    name={`addon-${item.id}`}
                    value="none"
                    onChange={() => handleAddOnChange(item.id, null)}
                    checked={selectedAddOn === null}
                  />
                  ไม่มี
                </label>
              </div>

              <button
                className="add-button"
                onClick={() => addToCart(item, selectedAddOn)}
              >
                เพิ่ม
              </button>
            </div>
          );
        })}
      </div>

      {/* ปุ่มไปยังตะกร้า */}
      <Link to="/order">
        <button className="go-to-cart">
          ไปยังตะกร้า ({cart.length} รายการ)
        </button>
      </Link>
    </div>
  );
}

export default Menu;
