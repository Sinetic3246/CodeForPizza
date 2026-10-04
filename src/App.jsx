import React, { useState, useEffect, useRef } from 'react';
import { 
  Coffee, Shield, QrCode, Lock, User, AlertTriangle, 
  CheckCircle2, ShoppingBag, LogOut, Store, CreditCard, 
  Receipt, Plus, Trash2, TrendingUp,
  Sun, Moon, Camera, X, Send, Users, Sliders, Wallet, History
} from 'lucide-react';
import './App.css';
import AuthScreen from './AuthScreen';

// Cafe menu grouped by category and beverage subcategory.
const BEVERAGE_SUBCATEGORIES = [
  'Tea', 'Iced Tea', 'Virgin Mojito', 'Smoothies', 'Milk shake', 'Lemonade',
  'Coffee', 'Iced Coffee', 'Blended coffee', 'Add ons', 'Special', 'Alternatives'
];
const CATEGORIES = ['Beverages', 'Food'];
const CAFE_MENU = [
  { id: 'tea-black', name: 'Black tea', price: 70, category: 'Beverages', subcategory: 'Tea' },
  { id: 'tea-green', name: 'Green tea', price: 120, category: 'Beverages', subcategory: 'Tea' },
  { id: 'tea-masala', name: 'Masala tea', price: 110, category: 'Beverages', subcategory: 'Tea' },
  { id: 'iced-lemon', name: 'Lemon iced tea', price: 200, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'iced-peach', name: 'Peach iced tea', price: 200, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'iced-matcha', name: 'Iced matcha Latte', price: 275, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'iced-matcha-berry', name: 'Strawberry/Blueberry Matcha latte', price: 350, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'mojito-classic', name: 'Classic mojito', price: 250, category: 'Beverages', subcategory: 'Virgin Mojito' },
  { id: 'mojito-blue', name: 'Deep blue sea mojito', price: 300, category: 'Beverages', subcategory: 'Virgin Mojito' },
  { id: 'mojito-kiwi', name: 'Kiwi mojito', price: 300, category: 'Beverages', subcategory: 'Virgin Mojito' },
  { id: 'smoothie-banana', name: 'Banana Smoothie', price: 300, category: 'Beverages', subcategory: 'Smoothies' },
  { id: 'smoothie-fruit', name: 'Fruit Smoothie', price: 300, category: 'Beverages', subcategory: 'Smoothies' },
  { id: 'shake-chocolate', name: 'Chocolate milk shake', price: 280, category: 'Beverages', subcategory: 'Milk shake' },
  { id: 'shake-vanilla', name: 'Vanilla milk shake', price: 280, category: 'Beverages', subcategory: 'Milk shake' },
  { id: 'shake-strawberry', name: 'Strawberry milk shake', price: 280, category: 'Beverages', subcategory: 'Milk shake' },
  { id: 'lemonade-mint', name: 'Mint lemonade', price: 220, category: 'Beverages', subcategory: 'Lemonade' },
  { id: 'lemonade-kiwi', name: 'Kiwi lemonade', price: 250, category: 'Beverages', subcategory: 'Lemonade' },
  { id: 'coffee-espresso', name: 'Espresso (single)', price: 110, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-doppio', name: 'Doppio (double)', price: 140, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-americano-single', name: 'Americano (single shot)', price: 160, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-americano-double', name: 'Americano (double shot)', price: 185, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-macchiato-single', name: 'Macchiato (single shot)', price: 155, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-macchiato-double', name: 'Macchiato (double shot)', price: 175, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-cortado', name: 'Cortado', price: 195, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-cappuccino', name: 'Cappuccino', price: 200, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-latte', name: 'Cafe latte', price: 210, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-mocha', name: 'Cafe mocha', price: 285, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'iced-americano', name: 'Iced Americano', price: 210, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-latte', name: 'Iced latte', price: 255, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-cappuccino', name: 'Iced cappuccino', price: 245, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-caramel-macchiato', name: 'Iced caramel macchiato', price: 375, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-mocha', name: 'Iced mocha', price: 375, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'frappe-mocha', name: 'Mocha frappe', price: 375, category: 'Beverages', subcategory: 'Blended coffee' },
  { id: 'frappe-vanilla', name: 'Vanilla frappe', price: 345, category: 'Beverages', subcategory: 'Blended coffee' },
  { id: 'blended-caramel-macchiato', name: 'Blended caramel macchiato', price: 375, category: 'Beverages', subcategory: 'Blended coffee' },
  { id: 'addon-vegan-milk', name: 'Vegan milk', price: 130, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'addon-soy-milk', name: 'Soy milk', price: 180, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'addon-almond-milk', name: 'Almond milk', price: 180, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'addon-oat-milk', name: 'Oat milk', price: 180, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-vanilla', name: 'Vanilla syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-chocolate', name: 'Chocolate syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-hazelnut', name: 'Hazelnut syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-caramel', name: 'Caramel syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'special-caramel-macchiato', name: 'Caramel macchiato', price: 260, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-vanilla-latte', name: 'Vanilla latte', price: 255, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-hazelnut-latte', name: 'Hazelnut latte', price: 255, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-flat-white', name: 'Flat white', price: 210, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-matcha-latte', name: 'Matcha latte', price: 250, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-coffee-orange', name: 'Coffee orange', price: 450, category: 'Beverages', subcategory: 'Special' },
  { id: 'alternative-hot-lemon', name: 'Hot lemon with honey', price: 170, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-lemon-soda', name: 'Lemon soda', price: 150, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-hot-chocolate', name: 'Hot chocolate', price: 250, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-juice', name: 'Seasonal fresh juice (ask for flavours)', price: 325, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-water', name: 'Mineral water', price: 50, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'food-oreo-dark', name: 'Dark Oreo donut', price: 130, category: 'Food' },
  { id: 'food-oreo-white', name: 'White Oreo donut', price: 130, category: 'Food' },
  { id: 'food-kitkat-dark', name: 'Dark KitKat donut', price: 130, category: 'Food' },
  { id: 'food-kitkat-white', name: 'White KitKat donut', price: 130, category: 'Food' },
  { id: 'food-snickers-dark', name: 'Dark Snickers donut', price: 130, category: 'Food' },
  { id: 'food-snickers-white', name: 'White Snickers donut', price: 130, category: 'Food' },
  { id: 'food-chicken-patties', name: 'Chicken patties', price: 160, category: 'Food' },
  { id: 'food-croissant', name: 'Butter Croissant', price: 150, category: 'Food' },
  { id: 'food-choco-cookie', name: 'Choco chip cookie', price: 100, category: 'Food' },
  { id: 'food-red-velvet-cookie', name: 'Red velvet cookie', price: 100, category: 'Food' },
  { id: 'food-double-choco-cookie', name: 'Double choco chip cookie', price: 120, category: 'Food' },
];

const MAX_WALLET_LIMIT = 10000;

// Unique Student ID generator using Timestamp + Random Hex Code
function generateStudentId() {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `STU-${timestamp}-${randomNum}`;
}

function DynamicQRCode({ value, size = 150 }) {
  const encoded = encodeURIComponent(value);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&color=2c1a0e&bgcolor=f7f3ed`;

  return (
    <div className="qr-code-wrapper">
      <img src={qrUrl} alt={`QR Code for ${value}`} width={size} height={size} className="qr-img" />
    </div>
  );
}

function QRScannerModal({ isOpen, onClose, onScanSuccess, title = "Scan QR Code" }) {
  const [videoActive, setVideoActive] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;
    if (isOpen) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setVideoActive(true);
          }
        })
        .catch(() => setVideoActive(false));
    }
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box scanner-modal">
        <div className="modal-header">
          <Camera size={20} className="cafe-icon" />
          <span>{title}</span>
          <button className="icon-close-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="viewfinder-container">
          {videoActive ? (
            <video ref={videoRef} autoPlay playsInline className="viewfinder-video" />
          ) : (
            <div className="viewfinder-placeholder">
              <QrCode size={48} className="pulse-icon" />
              <span>Camera active • Align QR inside frame</span>
            </div>
          )}
          <div className="scanner-overlay"><div className="scan-reticle"></div><div className="laser-beam"></div></div>
        </div>
        <div className="quick-scan-sim">
          <span className="sim-label">Quick Test Scans:</span>
          <div className="sim-actions">
            <button className="sim-chip" onClick={() => onScanSuccess('STUDENT_PASS_VERIFIED')}>Scan Student Pass</button>
          </div>
        </div>
        <button className="cancel-btn" onClick={onClose}>Close Scanner</button>
      </div>
    </div>
  );
}

// Reusable Transaction History Component
function TransactionHistory({ transactions }) {
  return (
    <div className="panel transaction-history-panel">
      <div className="widget-title gold-text" style={{ marginBottom: '12px' }}>
        <History size={16} />
        <span>TRANSACTION HISTORY</span>
      </div>
      {transactions.length === 0 ? (
        <div className="empty-cart-msg">No recent transactions recorded.</div>
      ) : (
        <div className="history-list">
          {transactions.slice(0, 10).map((tx) => (
            <div key={tx.id} className="history-item">
              <div className="history-left">
                <span className="history-title">{tx.title}</span>
                <span className="history-meta">{tx.date} • {tx.by}</span>
              </div>
              <span className={`history-amount ${tx.type === 'credit' ? 'green-text' : 'red-text'}`}>
                {tx.type === 'credit' ? '+' : '-'} Rs {tx.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Dynamic Student Account with unique ID generation
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('studentData');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        id: parsed.id || generateStudentId(),
        name: parsed.name || 'New Student',
        walletBalance: Math.min(MAX_WALLET_LIMIT, Math.max(0, Number(parsed.walletBalance) || 0)),
        dailyCap: Math.min(MAX_WALLET_LIMIT, Math.max(0, Number(parsed.dailyCap) || 0)),
      };
    }

    return {
      id: generateStudentId(),
      name: 'New Student',
      walletBalance: 2500.0,
      dailyCap: 2000.0,
      spentToday: 0.0,
    };
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactionsData');
    return saved ? JSON.parse(saved) : [
      { id: 'TX-101', title: 'Iced Latte', amount: 255, type: 'debit', date: 'Today, 10:15 AM', by: 'Student POS' },
      { id: 'TX-100', title: 'Parent Top-Up', amount: 1000, type: 'credit', date: 'Yesterday', by: 'Parent Portal' }
    ];
  });

  const [staffSales, setStaffSales] = useState({
    totalRevenue: 4850.0,
    ordersToday: 32,
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('studentData', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('transactionsData', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const renderThemeIcon = () => theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />;

  const triggerToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3200);
  };

  const addTransaction = (title, amount, type, by) => {
    const newTx = {
      id: `TX-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title,
      amount,
      type,
      date: 'Just now',
      by
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleAuth = (role, { createAccount = false, email = '', fullName = '' } = {}) => {
    // Derive name from input or email
    const enteredName = fullName.trim() || (email ? email.split('@')[0].replace(/[._-]+/g, ' ').trim() : '');
    
    if (createAccount && role === 'student') {
      const freshStudent = {
        id: generateStudentId(), // Unique ID assigned on registration
        name: enteredName || 'Student User',
        walletBalance: 0,
        dailyCap: 2000,
        spentToday: 0,
      };
      setStudent(freshStudent);
      setTransactions([]);
    } else if (enteredName && role === 'student') {
      setStudent((prev) => ({
        ...prev,
        name: enteredName,
      }));
    }

    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
  };

  if (!userRole) {
    return <AuthScreen onSignIn={handleAuth} theme={theme} toggleTheme={toggleTheme} />;
  }

  if (userRole === 'student') {
    return (
      <StudentDashboard 
        student={student} 
        setStudent={setStudent}
        transactions={transactions}
        addTransaction={addTransaction}
        onLogout={handleLogout}
        triggerToast={triggerToast}
        notification={notification}
        theme={theme}
        toggleTheme={toggleTheme}
        renderThemeIcon={renderThemeIcon}
      />
    );
  }

  if (userRole === 'parent') {
    return (
      <ParentDashboard 
        student={student}
        setStudent={setStudent}
        transactions={transactions}
        addTransaction={addTransaction}
        onLogout={handleLogout}
        triggerToast={triggerToast}
        notification={notification}
        theme={theme}
        toggleTheme={toggleTheme}
        renderThemeIcon={renderThemeIcon}
      />
    );
  }

  if (userRole === 'staff') {
    return (
      <StaffDashboard 
        student={student}
        setStudent={setStudent}
        transactions={transactions}
        addTransaction={addTransaction}
        staffSales={staffSales}
        setStaffSales={setStaffSales}
        onLogout={handleLogout}
        triggerToast={triggerToast}
        notification={notification}
        theme={theme}
        toggleTheme={toggleTheme}
        renderThemeIcon={renderThemeIcon}
      />
    );
  }
}

// =============================================================
// PARENT DASHBOARD COMPONENT
// =============================================================
function ParentDashboard({ student, setStudent, transactions, addTransaction, onLogout, triggerToast, notification, toggleTheme, renderThemeIcon }) {
  const [targetStudentId, setTargetStudentId] = useState(student.id || '');
  const [transferAmount, setTransferAmount] = useState('');
  const [newCapInput, setNewCapInput] = useState(student.dailyCap.toString());

  useEffect(() => {
    if (student?.id) {
      setTargetStudentId(student.id);
    }
  }, [student?.id]);

  const handleSendMoney = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(transferAmount);

    if (!targetStudentId.trim()) {
      alert('Please enter a valid Student Pass ID');
      return;
    }

    if (targetStudentId.trim().toUpperCase() !== student.id.toUpperCase()) {
      alert('Student Pass ID not found. Check the unique ID shown in the linked student profile.');
      return;
    }

    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (student.walletBalance + amountNum > MAX_WALLET_LIMIT) {
      alert(`Top-up rejected! Total student wallet balance cannot exceed Rs ${MAX_WALLET_LIMIT}. (Current Balance: Rs ${student.walletBalance.toFixed(2)})`);
      return;
    }

    setStudent((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amountNum,
    }));

    addTransaction(`Parent Top-Up (${targetStudentId})`, amountNum, 'credit', 'Parent Portal');
    triggerToast(`Successfully sent Rs ${amountNum.toFixed(2)} to Student (${targetStudentId})`);
    setTransferAmount('');
  };

  const handleUpdateCap = (e) => {
    e.preventDefault();
    const capNum = parseFloat(newCapInput);

    if (isNaN(capNum) || capNum < 0) {
      alert('Please enter a valid cap amount');
      return;
    }

    if (capNum > MAX_WALLET_LIMIT) {
      alert(`Daily spending cap cannot exceed Rs ${MAX_WALLET_LIMIT}.`);
      return;
    }

    setStudent((prev) => ({
      ...prev,
      dailyCap: capNum,
    }));

    triggerToast(`Updated ${student.name}'s Daily Allowance Cap to Rs ${capNum.toFixed(2)}`);
  };

  return (
    <div className="app-viewport">
      {notification && (
        <div className="toast-banner">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      <header className="app-header">
        <div className="header-brand">
          <div className="icon-circle">
            <Users size={20} className="cafe-icon" />
          </div>
          <div>
            <div className="header-title">Parent Control</div>
            <div className="header-sub">Ullens Cafe Fintech • Guardian Portal</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="theme-btn-compact" onClick={toggleTheme} title="Toggle Theme">
            {renderThemeIcon()}
          </button>
          <button className="logout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Linked Student Overview */}
      <div className="panel target-student-panel">
        <div className="panel-row">
          <div className="student-profile-info">
            <div className="avatar-box">
              <User size={18} className="cafe-icon" />
            </div>
            <div>
              <div className="student-name">{student.name}</div>
              <div className="student-meta">
                Unique ID: <strong>{student.id}</strong> • Balance: <strong>Rs {student.walletBalance.toFixed(2)}</strong>
              </div>
            </div>
          </div>
          <span className="status-badge active-badge">Pass Active</span>
        </div>
      </div>

      <TransactionHistory transactions={transactions} />

      {/* Transfer Funds Section */}
      <div className="panel">
        <div className="widget-title gold-text" style={{ marginBottom: '14px' }}>
          <Send size={17} />
          <span>SEND FUNDS TO STUDENT ID</span>
        </div>

        <form onSubmit={handleSendMoney}>
          <div className="auth-label" style={{ marginBottom: '6px' }}>Student Unique ID</div>
          <div className="auth-input-wrap" style={{ marginBottom: '14px' }}>
            <QrCode size={16} />
            <input 
              type="text" 
              placeholder="Student Unique ID" 
              value={targetStudentId}
              onChange={(e) => setTargetStudentId(e.target.value)}
              required
            />
          </div>

          <div className="auth-label" style={{ marginBottom: '6px' }}>Top-Up Amount (Rs)</div>
          <div className="auth-input-wrap" style={{ marginBottom: '14px' }}>
            <Wallet size={16} />
            <input 
              type="number" 
              placeholder="Enter amount in Rs" 
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              min="1"
              max={MAX_WALLET_LIMIT}
              required
            />
          </div>

          <div className="quick-scan-sim" style={{ marginTop: '0', marginBottom: '16px' }}>
            <span className="sim-label">Quick Presets:</span>
            <div className="sim-actions">
              <button type="button" className="sim-chip" onClick={() => setTransferAmount('500')}>+ Rs 500</button>
              <button type="button" className="sim-chip" onClick={() => setTransferAmount('1000')}>+ Rs 1,000</button>
              <button type="button" className="sim-chip" onClick={() => setTransferAmount('5000')}>+ Rs 5,000</button>
              <button type="button" className="sim-chip" onClick={() => setTransferAmount('10000')}>+ Rs 10,000</button>
            </div>
          </div>

          <button className="primary-btn gold-btn" type="submit">
            <Send size={16} /> Transfer Money to Pass
          </button>
        </form>
      </div>

      {/* Allowance Controls */}
      <div className="panel budget-panel">
        <div className="widget-title gold-text" style={{ marginBottom: '12px' }}>
          <Sliders size={17} />
          <span>DAILY ALLOWANCE CONTROL (MAX RS 10,000)</span>
        </div>

        <form onSubmit={handleUpdateCap}>
          <div className="auth-label" style={{ marginBottom: '6px' }}>Daily Spending Cap (Rs)</div>
          <div className="auth-input-wrap" style={{ marginBottom: '14px' }}>
            <Shield size={16} />
            <input 
              type="number" 
              placeholder="Max Rs 10,000 limit" 
              value={newCapInput}
              onChange={(e) => setNewCapInput(e.target.value)}
              min="0"
              max="10000"
              required
            />
          </div>

          <button className="secondary-btn" type="submit" style={{ width: '100%' }}>
            Update Allowance Limit
          </button>
        </form>

        <div className="summary-text" style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed var(--panel-border)' }}>
          <span>Current Cap: <strong>Rs {student.dailyCap.toFixed(2)}</strong></span>
          <span>Spent Today: Rs {student.spentToday.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// STUDENT DASHBOARD COMPONENT
// =============================================================
function StudentDashboard({ student, setStudent, transactions, addTransaction, onLogout, triggerToast, notification, toggleTheme, renderThemeIcon }) {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Tea');
  const [studentCart, setStudentCart] = useState([]);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const filteredMenu = CAFE_MENU.filter((item) => item.category === selectedCategory && (selectedCategory !== 'Beverages' || item.subcategory === selectedSubcategory));
  const cartTotal = studentCart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (item) => {
    if (student.walletBalance <= 0) {
      alert('Warning: Your wallet balance is Rs 0.00! Please ask your parent to top up your account.');
      return;
    }
    if (cartTotal + item.price > student.walletBalance) {
      alert(`Insufficient Funds! You cannot add ${item.name} (Rs ${item.price}) because your balance is Rs ${student.walletBalance.toFixed(2)}.`);
      return;
    }
    setStudentCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setStudentCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    if (studentCart.length === 0) return;

    if (student.walletBalance <= 0) {
      alert('Cannot complete order! Wallet balance is Rs 0.00.');
      return;
    }

    if (cartTotal > student.walletBalance) {
      alert(`Insufficient funds! Your current wallet balance is Rs ${student.walletBalance.toFixed(2)}, but your total is Rs ${cartTotal.toFixed(2)}.`);
      return;
    }

    if (student.spentToday + cartTotal > student.dailyCap) {
      setShowPinModal(true);
      return;
    }

    executeOrder();
  };

  const executeOrder = () => {
    setStudent((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance - cartTotal,
      spentToday: prev.spentToday + cartTotal,
    }));

    const itemsSummary = studentCart.map(i => i.name).join(', ');
    addTransaction(`Order: ${itemsSummary}`, cartTotal, 'debit', 'Student Portal');
    triggerToast(`Order placed successfully! Total: Rs ${cartTotal.toFixed(2)}`);
    setStudentCart([]);
  };

  const handlePinSubmit = () => {
    if (pinInput === '1234') {
      executeOrder();
      setShowPinModal(false);
      setPinInput('');
    } else {
      alert('Incorrect Parent PIN. Try: 1234');
    }
  };

  const progress = Math.min((student.spentToday / student.dailyCap) * 100, 100);
  const remainingBudget = Math.max(0, student.dailyCap - student.spentToday);

  return (
    <div className="app-viewport">
      {notification && (
        <div className="toast-banner">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      <header className="app-header">
        <div className="header-brand">
          <div className="icon-circle"><Coffee size={20} className="cafe-icon" /></div>
          <div>
            <div className="header-title">CafeoPass</div>
            <div className="header-sub">Student Portal • {student.name} ({student.id})</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="theme-btn-compact" onClick={toggleTheme} title="Toggle Theme">{renderThemeIcon()}</button>
          <button className="logout-btn" onClick={onLogout} title="Sign Out"><LogOut size={16} /></button>
        </div>
      </header>

      {/* Wallet Balance Banner */}
      <div className="panel balance-panel">
        <div className="panel-row">
          <span className="panel-label">AVAILABLE BALANCE</span>
          <span className="status-badge active-badge">Pass Active</span>
        </div>
        <div className="balance-amount">
          <span className="currency-unit">Rs</span>
          <span className={`amount-value ${student.walletBalance === 0 ? 'red-text' : ''}`}>
            {student.walletBalance.toFixed(2)}
          </span>
        </div>

        {student.walletBalance === 0 && (
          <div className="warning-box">
            <AlertTriangle size={16} /> Warning: Your wallet balance is empty (Rs 0.00)! Please request a top-up from your parent.
          </div>
        )}
        
        {/* Editable Name & Unique ID Display Field */}
        <div className="auth-label" style={{ margin: '14px 0 6px' }}>Student Profile Name</div>
        <div className="auth-input-wrap" style={{ marginBottom: '10px' }}>
          <User size={16} />
          <input
            type="text"
            aria-label="Student profile name"
            value={student.name}
            onChange={(e) => setStudent((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your name"
          />
        </div>

        <div className="auth-label" style={{ margin: '6px 0 6px' }}>Assigned Unique Student ID</div>
        <div className="auth-input-wrap" style={{ marginBottom: '14px', opacity: 0.85, background: 'var(--tab-bg)' }}>
          <QrCode size={16} />
          <input
            type="text"
            readOnly
            value={student.id}
            title="Unique Student ID assigned automatically"
          />
        </div>

        <div className="action-button-group">
          <button className="secondary-btn" onClick={() => setShowQrModal(true)}>
            <QrCode size={18} /> My QR Pass
          </button>
        </div>
      </div>

      <TransactionHistory transactions={transactions} />

      <div className="panel budget-panel">
        <div className="panel-row">
          <div className="widget-title gold-text">
            <Shield size={16} />
            <span>BUDGET SHIELD</span>
          </div>
          <span className="meta-text">Daily Limit: Rs {student.dailyCap.toFixed(0)}</span>
        </div>

        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${progress}%`,
              backgroundColor: progress > 85 ? 'var(--rose-red)' : 'var(--caramel-gold)'
            }} 
          />
        </div>

        <div className="panel-row summary-text">
          <span>Spent Today: <strong>Rs {student.spentToday.toFixed(2)}</strong></span>
          <span className={remainingBudget < 30 ? 'red-text' : 'green-text'}>
            Remaining: Rs {remainingBudget.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Cart Order List */}
      <div className="panel pos-cart-panel">
        <div className="panel-row">
          <span className="pos-cart-title"><Receipt size={16} className="cafe-icon" /> Your Order List</span>
          <span className="pos-cart-total">Total: Rs {cartTotal.toFixed(2)}</span>
        </div>

        {studentCart.length === 0 ? (
          <div className="empty-cart-msg">Select Beverages or Food below to build your order</div>
        ) : (
          <div className="cart-items-scroll">
            {studentCart.map((item, idx) => (
              <div key={idx} className="cart-row">
                <span>{item.name}</span>
                <div className="cart-row-right">
                  <span className="cart-item-price">Rs {item.price}</span>
                  <button className="trash-btn" onClick={() => removeFromCart(idx)} title="Remove Item"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="primary-btn gold-btn" 
          disabled={studentCart.length === 0 || student.walletBalance <= 0 || cartTotal > student.walletBalance} 
          onClick={handleCheckout}
        >
          <CreditCard size={18} />
          {student.walletBalance <= 0 
            ? 'Wallet Empty (Rs 0.00)' 
            : cartTotal > student.walletBalance 
            ? 'Insufficient Funds' 
            : `Place Order (Rs ${cartTotal.toFixed(2)})`}
        </button>
      </div>

      <div className="section-title"><ShoppingBag size={16} /><span>Ullens Cafe Menu</span></div>

      <div className="category-scroll-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? 'active-tab' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              if (cat === 'Beverages') setSelectedSubcategory(BEVERAGE_SUBCATEGORIES[0]);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedCategory === 'Beverages' && (
        <div className="category-scroll-bar subcategory-scroll-bar" aria-label="Beverage subcategories">
          {BEVERAGE_SUBCATEGORIES.map((subcategory) => (
            <button
              key={subcategory}
              className={`category-tab ${selectedSubcategory === subcategory ? 'active-tab' : ''}`}
              onClick={() => setSelectedSubcategory(subcategory)}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}

      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <button 
            key={item.id} 
            className="menu-card-btn" 
            onClick={() => addToCart(item)}
            disabled={student.walletBalance <= 0}
          >
            <div className="menu-card-info">
              <span className="item-name">{item.name}</span>
              <span className="item-cat">{item.subcategory || item.category}</span>
            </div>
            <span className="item-price-tag">+ Rs {item.price}</span>
          </button>
        ))}
      </div>

      {showQrModal && (
        <div className="modal-backdrop">
          <div className="modal-box qr-display-modal">
            <div className="modal-header">
              <QrCode size={20} className="cafe-icon" />
              <span>Student CafeoPass QR</span>
              <button className="icon-close-btn" onClick={() => setShowQrModal(false)}><X size={18} /></button>
            </div>
            <div className="qr-card-content">
              <DynamicQRCode value={`CAFEOPASS:${student.id}:${student.name}`} size={160} />
              <div className="qr-student-info">
                <span className="qr-student-name">{student.name}</span>
                <span className="qr-student-id">Pass ID: {student.id}</span>
              </div>
              <p className="qr-instruction">Present this QR code at Ullens Cafe register to pay instantly.</p>
            </div>
          </div>
        </div>
      )}

      {showPinModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <div className="modal-header red-text">
              <AlertTriangle size={20} />
              <span>Allowance Cap Exceeded</span>
            </div>
            <p className="modal-body">
              This order of <strong>Rs {cartTotal.toFixed(2)}</strong> exceeds your daily limit. Enter Parent PIN to authorize.
            </p>
            <input
              type="password"
              maxLength={4}
              className="pin-field"
              placeholder="••••"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              autoFocus
            />
            <button className="primary-btn gold-btn" onClick={handlePinSubmit}>
              <Lock size={16} /> Authorize Order
            </button>
            <button className="cancel-btn" onClick={() => { setShowPinModal(false); setPinInput(''); }}>
              Cancel Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// STAFF TERMINAL DASHBOARD COMPONENT
// =============================================================
function StaffDashboard({ student, setStudent, transactions, addTransaction, staffSales, setStaffSales, onLogout, triggerToast, notification, toggleTheme, renderThemeIcon }) {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Tea');
  const [cart, setCart] = useState([]);
  const [showScanner, setShowScanner] = useState(false);

  const filteredMenu = CAFE_MENU.filter((item) => item.category === selectedCategory && (selectedCategory !== 'Beverages' || item.subcategory === selectedSubcategory));

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (index) => setCart((prev) => prev.filter((_, i) => i !== index));

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChargePass = () => {
    if (cart.length === 0) return;

    if (student.walletBalance < cartTotal) {
      alert(`Insufficient Funds! Student balance (Rs ${student.walletBalance.toFixed(2)}) cannot cover total Rs ${cartTotal.toFixed(2)}.`);
      return;
    }

    if (student.spentToday + cartTotal > student.dailyCap) {
      alert(`Transaction Declined! Student ${student.name} exceeds daily limit (Rs ${student.dailyCap}). Parent authorization required.`);
      return;
    }

    setStudent((prev) => ({
      ...prev,
      walletBalance: Math.min(MAX_WALLET_LIMIT, prev.walletBalance - cartTotal),
      spentToday: prev.spentToday + cartTotal,
    }));

    setStaffSales((prev) => ({
      totalRevenue: prev.totalRevenue + cartTotal,
      ordersToday: prev.ordersToday + 1,
    }));

    const itemsSummary = cart.map(i => i.name).join(', ');
    addTransaction(`Staff Order: ${itemsSummary}`, cartTotal, 'debit', 'Staff POS Terminal');
    triggerToast(`Charged Rs ${cartTotal.toFixed(2)} to ${student.name}'s Pass`);
    setCart([]);
  };

  const handleScanPassResult = () => {
    setShowScanner(false);
    triggerToast(`Scanned & Verified Student Pass: ${student.name} (${student.id})`);
  };

  return (
    <div className="app-viewport">
      {notification && (
        <div className="toast-banner green-banner">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      <header className="app-header">
        <div className="header-brand">
          <div className="icon-circle green-bg"><Store size={20} className="staff-icon" /></div>
          <div>
            <div className="header-title">Caffeophilia POS</div>
            <div className="header-sub">Staff Terminal • Canteen Register</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="theme-btn-compact" onClick={toggleTheme} title="Toggle Theme">{renderThemeIcon()}</button>
          <button className="logout-btn" onClick={onLogout} title="Sign Out"><LogOut size={16} /></button>
        </div>
      </header>

      <div className="panel metric-panel">
        <div className="panel-row">
          <div className="widget-title green-text">
            <TrendingUp size={16} />
            <span>TODAY'S CANTEEN REVENUE</span>
          </div>
          <span className="status-badge staff-mode-badge">Register Live</span>
        </div>
        <div className="balance-amount">
          <span className="currency-unit">Rs</span>
          <span className="amount-value">{staffSales.totalRevenue.toFixed(2)}</span>
        </div>
        <span className="meta-text">{staffSales.ordersToday} Orders Completed Today</span>
      </div>

      <div className="panel target-student-panel">
        <div className="panel-row">
          <div className="student-profile-info">
            <div className="avatar-box"><User size={18} className="cafe-icon" /></div>
            <div>
              <div className="student-name">{student.name} ({student.id})</div>
              <div className="student-meta">
                Balance: Rs {student.walletBalance.toFixed(2)} (Max Rs 10,000) • Cap Left: Rs {Math.max(0, student.dailyCap - student.spentToday).toFixed(2)}
              </div>
            </div>
          </div>
          <button className="scan-mini-btn" onClick={() => setShowScanner(true)}>
            <QrCode size={14} /> Scan Pass
          </button>
        </div>
      </div>

      <TransactionHistory transactions={transactions} />

      <div className="panel pos-cart-panel">
        <div className="panel-row">
          <span className="pos-cart-title"><Receipt size={16} className="staff-icon" /> Current Order Bill</span>
          <span className="pos-cart-total">Total: Rs {cartTotal.toFixed(2)}</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-msg">Select items from menu below to build charge</div>
        ) : (
          <div className="cart-items-scroll">
            {cart.map((item, idx) => (
              <div key={idx} className="cart-row">
                <span>{item.name}</span>
                <div className="cart-row-right">
                  <span className="cart-item-price">Rs {item.price}</span>
                  <button className="trash-btn" onClick={() => removeFromCart(idx)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="primary-btn green-btn" 
          disabled={cart.length === 0} 
          onClick={handleChargePass}
        >
          <CreditCard size={18} />
          Charge Rs {cartTotal.toFixed(2)} to Student Pass
        </button>
      </div>

      <div className="section-title"><Plus size={16} /><span>Add Items to Order</span></div>

      <div className="category-scroll-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-tab staff-tab ${selectedCategory === cat ? 'active-staff-tab' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              if (cat === 'Beverages') setSelectedSubcategory(BEVERAGE_SUBCATEGORIES[0]);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedCategory === 'Beverages' && (
        <div className="category-scroll-bar subcategory-scroll-bar" aria-label="Beverage subcategories">
          {BEVERAGE_SUBCATEGORIES.map((subcategory) => (
            <button
              key={subcategory}
              className={`category-tab staff-tab ${selectedSubcategory === subcategory ? 'active-staff-tab' : ''}`}
              onClick={() => setSelectedSubcategory(subcategory)}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}

      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <button key={item.id} className="menu-card-btn staff-add-btn" onClick={() => addToCart(item)}>
            <div className="menu-card-info">
              <span className="item-name">{item.name}</span>
              <span className="item-cat">{item.subcategory || item.category}</span><span className="item-price-sub">Rs {item.price}</span>
            </div>
          </button>
        ))}
      </div>

      <QRScannerModal 
        isOpen={showScanner} 
        onClose={() => setShowScanner(false)} 
        onScanSuccess={handleScanPassResult}
        title="Scan Student CafeoPass QR"
      />
    </div>
  );
}