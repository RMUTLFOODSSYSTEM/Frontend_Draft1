// src/pages/Order.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Order.css";

function Order() {
  const [cart, setCart] = useState([]); // state สำหรับเก็บข้อมูลตะกร้า
  const [total, setTotal] = useState(0); // state สำหรับคำนวณยอดรวม

  // ใช้ useEffect เพื่อดึงข้อมูลจาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // คำนวณยอดรวมของสินค้าในตะกร้า
  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity + (item.addOn ? item.addOn.price : 0),
      0
    );
    setTotal(totalAmount);
  };

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const increaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
      return updatedCart;
    });
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const decreaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
      return updatedCart;
    });
  };

  // ฟังก์ชันลบรายการอาหาร
  const removeItem = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId); // ลบรายการที่ id ตรงกับ itemId
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // อัปเดต localStorage
      calculateTotal(updatedCart);
      return updatedCart;
    });
  };

  return (
    <div className="order-container">
      <h1 className="order-header">สรุปคำสั่งซื้อ</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">ตะกร้าของคุณยังไม่มีสินค้า</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="order-item">
              <p>
                <strong>{item.name}</strong> - {item.price} บาท
              </p>
              {item.addOn && (
                <p>
                  เพิ่ม: <strong>{item.addOn.name}</strong> - {item.addOn.price} บาท
                </p>
              )}

              {/* ปุ่มเพิ่ม/ลดจำนวนสินค้า */}
              <div className="quantity-container">
                <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span className="quantity-display">{item.quantity || 1}</span>
                <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              {/* ปุ่มลบรายการ */}
              <button className="remove-item-button" onClick={() => removeItem(item.id)}>
                ลบ
              </button>
            </div>
          ))}
          <p className="order-total">รวม: {total} บาท</p>
        </div>
      )}

      {/* ปุ่มไปที่หน้าชำระเงิน */}
      <Link to="/payment">
        <button className="checkout-button">ชำระเงิน</button>
      </Link>
    </div>
  );
}

export default Order;
