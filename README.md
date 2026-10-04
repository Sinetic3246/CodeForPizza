# ☕ CafeoPass - Canteen Fintech & POS System

**CafeoPass** (Caffeophilia POS) is a full-stack, real-time canteen web application built for Ullens School. It provides a seamless cashless payment experience for students, management controls for parents, and an efficient Point of Sale (POS) terminal for canteen staff.

---

## 🌟 Key Features

### 🎓 Student Portal
* **Digital Wallet & Pass**: View wallet balance and display a dynamic QR pass for register checkouts.
* **Smart Budget Shield**: Automated tracking of daily spending against parent-set allowances with PIN-override capabilities.
* **Interactive Menu**: Order hot beverages, cold drinks, pastries, and food categorized into clean filter tabs.
* **Live Order Sync**: Orders placed are immediately transmitted to the staff terminal in real time.

### 👨‍👩‍👧 Parent Control Portal
* **Instant Wallet Top-Up**: Recharge student account balances instantly (capped at RS 10,000).
* **Allowance Control**: Set and update daily spending caps to encourage responsible spending.
* **Audit Trail**: Track full student transaction history and real-time spending summaries.

### 🏪 Staff POS Terminal
* **Live Order Queue**: Receive incoming student orders instantly with status update controls ("Serve Order").
* **Direct Counter Register**: Build custom on-the-spot orders for walk-in transactions.
* **QR Pass Scanner**: Built-in camera scanner with automatic QR detection using browser API capabilities.
* **Revenue Metrics**: Track live daily canteen revenue and total order volume.

---

## 🛠️ Tech Stack

* **Frontend**: React, Vite, Plain CSS3 (Custom variables, Dark/Light theme engine)
* **Backend & Database**: LocalStorage from device
* **Icons**: [Lucide React](https://lucide.dev/)
* **Utilities**: Browser Camera MediaDevices API & BarcodeDetector API

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js (`v18.0.0` or higher)
* npm or yarn
