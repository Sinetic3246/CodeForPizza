import React, { useState, useEffect, useRef } from 'react';
import { 
  Coffee, Shield, QrCode, Lock, User, AlertTriangle, 
  CheckCircle2, ShoppingBag, LogOut, Store, CreditCard, 
  Receipt, Plus, Trash2, TrendingUp,
  Sun, Moon, Camera, X, Send, Users, Sliders, Wallet, History, Check
} from 'lucide-react';
import './App.css';
import AuthScreen from './AuthScreen';

const BEVERAGE_SUBCATEGORIES = [
  'Tea', 'Iced Tea', 'Virgin Mojito', 'Smoothies', 'Milk Shake', 'Lemonade',
  'Coffee', 'Iced Coffee', 'Blended Coffee', 'Add ons', 'Special', 'Alternatives'
];
const CATEGORIES = ['Beverages', 'Food'];
const CAFE_MENU = [
  { id: 'tea-black', name: 'Black Tea', price: 70, category: 'Beverages', subcategory: 'Tea' },
  { id: 'tea-green', name: 'Green Tea', price: 120, category: 'Beverages', subcategory: 'Tea' },
  { id: 'tea-masala', name: 'Masala Tea', price: 110, category: 'Beverages', subcategory: 'Tea' },
  { id: 'iced-lemon', name: 'Lemon Iced Tea', price: 200, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'iced-peach', name: 'Peach Iced Tea', price: 200, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'iced-matcha', name: 'Iced Matcha Latte', price: 275, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'iced-matcha-berry', name: 'Strawberry/Blueberry Matcha Latte', price: 350, category: 'Beverages', subcategory: 'Iced Tea' },
  { id: 'mojito-classic', name: 'Classic Mojito', price: 250, category: 'Beverages', subcategory: 'Virgin Mojito' },
  { id: 'mojito-blue', name: 'Deep Blue Sea Mojito', price: 300, category: 'Beverages', subcategory: 'Virgin Mojito' },
  { id: 'mojito-kiwi', name: 'Kiwi Mojito', price: 300, category: 'Beverages', subcategory: 'Virgin Mojito' },
  { id: 'smoothie-banana', name: 'Banana Smoothie', price: 300, category: 'Beverages', subcategory: 'Smoothies' },
  { id: 'smoothie-fruit', name: 'Fruit Smoothie', price: 300, category: 'Beverages', subcategory: 'Smoothies' },
  { id: 'shake-chocolate', name: 'Chocolate Milk Shake', price: 280, category: 'Beverages', subcategory: 'Milk shake' },
  { id: 'shake-vanilla', name: 'Vanilla Milk Shake', price: 280, category: 'Beverages', subcategory: 'Milk shake' },
  { id: 'shake-strawberry', name: 'Strawberry Milk Shake', price: 280, category: 'Beverages', subcategory: 'Milk shake' },
  { id: 'lemonade-mint', name: 'Mint Lemonade', price: 220, category: 'Beverages', subcategory: 'Lemonade' },
  { id: 'lemonade-kiwi', name: 'Kiwi Lemonade', price: 250, category: 'Beverages', subcategory: 'Lemonade' },
  { id: 'coffee-espresso', name: 'Espresso (Single)', price: 110, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-doppio', name: 'Doppio (Double)', price: 140, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-americano-single', name: 'Americano (Single Shot)', price: 160, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-americano-double', name: 'Americano (Double Shot)', price: 185, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-macchiato-single', name: 'Macchiato (Single Shot)', price: 155, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-macchiato-double', name: 'Macchiato (Double Shot)', price: 175, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-cortado', name: 'Cortado', price: 195, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-cappuccino', name: 'Cappuccino', price: 200, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-latte', name: 'Cafe Latte', price: 210, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'coffee-mocha', name: 'Cafe Mocha', price: 285, category: 'Beverages', subcategory: 'Coffee' },
  { id: 'iced-americano', name: 'Iced Americano', price: 210, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-latte', name: 'Iced Latte', price: 255, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-cappuccino', name: 'Iced Cappuccino', price: 245, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-caramel-macchiato', name: 'Iced Caramel Macchiato', price: 375, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'iced-mocha', name: 'Iced Mocha', price: 375, category: 'Beverages', subcategory: 'Iced Coffee' },
  { id: 'frappe-mocha', name: 'Mocha Frappe', price: 375, category: 'Beverages', subcategory: 'Blended coffee' },
  { id: 'frappe-vanilla', name: 'Vanilla Frappe', price: 345, category: 'Beverages', subcategory: 'Blended coffee' },
  { id: 'blended-caramel-macchiato', name: 'Blended Caramel Macchiato', price: 375, category: 'Beverages', subcategory: 'Blended coffee' },
  { id: 'addon-vegan-milk', name: 'Vegan Milk', price: 130, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'addon-soy-milk', name: 'Soy Milk', price: 180, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'addon-almond-milk', name: 'Almond Milk', price: 180, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'addon-oat-milk', name: 'Oat Milk', price: 180, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-vanilla', name: 'Vanilla Syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-chocolate', name: 'Chocolate Syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-hazelnut', name: 'Hazelnut Syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'syrup-caramel', name: 'Caramel Syrup', price: 120, category: 'Beverages', subcategory: 'Add ons' },
  { id: 'special-caramel-macchiato', name: 'Caramel Macchiato', price: 260, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-vanilla-latte', name: 'Vanilla Latte', price: 255, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-hazelnut-latte', name: 'Hazelnut Latte', price: 255, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-flat-white', name: 'Flat White', price: 210, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-matcha-latte', name: 'Matcha Latte', price: 250, category: 'Beverages', subcategory: 'Special' },
  { id: 'special-coffee-orange', name: 'Coffee Orange', price: 450, category: 'Beverages', subcategory: 'Special' },
  { id: 'alternative-hot-lemon', name: 'Hot Lemon with Honey', price: 170, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-lemon-soda', name: 'Lemon Soda', price: 150, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-hot-chocolate', name: 'Hot Chocolate', price: 250, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-juice', name: 'Seasonal Fresh Juice (ask for flavours)', price: 325, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'alternative-water', name: 'Mineral Water', price: 50, category: 'Beverages', subcategory: 'Alternatives' },
  { id: 'food-oreo-dark', name: 'Dark Oreo Donut', price: 130, category: 'Food' },
  { id: 'food-oreo-white', name: 'White Oreo Donut', price: 130, category: 'Food' },
  { id: 'food-kitkat-dark', name: 'Dark KitKat Donut', price: 130, category: 'Food' },
  { id: 'food-kitkat-white', name: 'White KitKat Donut', price: 130, category: 'Food' },
  { id: 'food-snickers-dark', name: 'Dark Snickers Donut', price: 130, category: 'Food' },
  { id: 'food-snickers-white', name: 'White Snickers Donut', price: 130, category: 'Food' },
  { id: 'food-chicken-patties', name: 'Chicken Patties', price: 160, category: 'Food' },
  { id: 'food-croissant', name: 'Butter Croissant', price: 150, category: 'Food' },
  { id: 'food-choco-cookie', name: 'Choco Chip Cookie', price: 100, category: 'Food' },
  { id: 'food-red-velvet-cookie', name: 'Red Velvet Cookie', price: 100, category: 'Food' },
  { id: 'food-double-choco-cookie', name: 'Double Choco Chip Cookie', price: 120, category: 'Food' },
];

const MAX_WALLET_LIMIT = 10000;

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
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;
    let animFrameId = null;

    if (isOpen) {
      setErrorMessage('');
      setVideoActive(false);

      const initCamera = async () => {
        try {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          } catch (e) {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
          }

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            setVideoActive(true);

            if ('BarcodeDetector' in window) {
              const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
              const scanLoop = async () => {
                if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                  try {
                    const codes = await barcodeDetector.detect(videoRef.current);
                    if (codes.length > 0) {
                      onScanSuccess(codes[0].rawValue);
                      return;
                    }
                  } catch (e) {}
                }
                animFrameId = requestAnimationFrame(scanLoop);
              };
              animFrameId = requestAnimationFrame(scanLoop);
            }
          }
        } catch (err) {
          console.error('Camera access error:', err);
          setErrorMessage('Camera access denied or unavailable on this device.');
          setVideoActive(false);
        }
      };

      initCamera();
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
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
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="viewfinder-video"
            style={{ display: videoActive ? 'block' : 'none' }}
          />
          {!videoActive && (
            <div className="viewfinder-placeholder">
              <QrCode size={48} className="pulse-icon" />
              <span>{errorMessage || 'Activating camera...'}</span>
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
                {tx.type === 'credit' ? '+' : '-'} RS {Math.round(tx.amount)}
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

  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('studentData');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        id: parsed.id || generateStudentId(),
        name: parsed.name || 'Alex Sharma',
        walletBalance: parsed.walletBalance !== undefined ? Math.round(Number(parsed.walletBalance)) : 500,
        dailyCap: parsed.dailyCap ? Math.round(Number(parsed.dailyCap)) : 2000,
        spentToday: parsed.spentToday ? Math.round(Number(parsed.spentToday)) : 0,
      };
    }

    return {
      id: generateStudentId(),
      name: 'Alex Sharma',
      walletBalance: 500,
      dailyCap: 2000,
      spentToday: 0,
    };
  });

  const [incomingOrders, setIncomingOrders] = useState(() => {
    const saved = localStorage.getItem('incomingOrdersData');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactionsData');
    return saved ? JSON.parse(saved) : [
      { id: 'TX-101', title: 'Iced Tea Purchase', amount: 200, type: 'debit', date: 'Today, 10:15 AM', by: 'Student Portal' },
      { id: 'TX-100', title: 'Parent Initial Top-Up', amount: 500, type: 'credit', date: 'Yesterday', by: 'Parent Portal' }
    ];
  });

  const [staffSales, setStaffSales] = useState(() => {
    const saved = localStorage.getItem('staffSalesData');
    return saved ? JSON.parse(saved) : {
      totalRevenue: 0,
      ordersToday: 0,
    };
  });

  const [notification, setNotification] = useState(null);
  const bcRef = useRef(null);

  // Cross-device & Multi-tab robust synchronization engine
  useEffect(() => {
    if ('BroadcastChannel' in window && !bcRef.current) {
      bcRef.current = new BroadcastChannel('cafeopass_sync_channel');
      bcRef.current.onmessage = (event) => {
        const payload = event.data;
        if (!payload) return;
        if (payload.studentData) setStudent(payload.studentData);
        if (payload.transactionsData) setTransactions(payload.transactionsData);
        if (payload.incomingOrdersData) setIncomingOrders(payload.incomingOrdersData);
        if (payload.staffSalesData) setStaffSales(payload.staffSalesData);
      };
    }

    const syncFromLocalStorage = () => {
      try {
        const sData = localStorage.getItem('studentData');
        if (sData) {
          const parsed = JSON.parse(sData);
          setStudent((prev) => (JSON.stringify(prev) !== sData ? parsed : prev));
        }
        const tData = localStorage.getItem('transactionsData');
        if (tData) {
          const parsed = JSON.parse(tData);
          setTransactions((prev) => (JSON.stringify(prev) !== tData ? parsed : prev));
        }
        const oData = localStorage.getItem('incomingOrdersData');
        if (oData) {
          const parsed = JSON.parse(oData);
          setIncomingOrders((prev) => (JSON.stringify(prev) !== oData ? parsed : prev));
        }
        const salesData = localStorage.getItem('staffSalesData');
        if (salesData) {
          const parsed = JSON.parse(salesData);
          setStaffSales((prev) => (JSON.stringify(prev) !== salesData ? parsed : prev));
        }
      } catch (e) {
        console.error('Local Storage Sync Error:', e);
      }
    };

    const handleStorageEvent = (e) => {
      if (e.key === 'studentData' && e.newValue) setStudent(JSON.parse(e.newValue));
      if (e.key === 'transactionsData' && e.newValue) setTransactions(JSON.parse(e.newValue));
      if (e.key === 'incomingOrdersData' && e.newValue) setIncomingOrders(JSON.parse(e.newValue));
      if (e.key === 'staffSalesData' && e.newValue) setStaffSales(JSON.parse(e.newValue));
    };

    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('focus', syncFromLocalStorage);

    const pollTimer = setInterval(syncFromLocalStorage, 800);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('focus', syncFromLocalStorage);
      clearInterval(pollTimer);
      if (bcRef.current) {
        bcRef.current.close();
        bcRef.current = null;
      }
    };
  }, []);

  const broadcastSync = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    if (bcRef.current) {
      try {
        bcRef.current.postMessage({ [key]: value });
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  useEffect(() => {
    broadcastSync('studentData', student);
  }, [student]);

  useEffect(() => {
    broadcastSync('transactionsData', transactions);
  }, [transactions]);

  useEffect(() => {
    broadcastSync('incomingOrdersData', incomingOrders);
  }, [incomingOrders]);

  useEffect(() => {
    broadcastSync('staffSalesData', staffSales);
  }, [staffSales]);

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
      amount: Math.round(amount),
      type,
      date: 'Just now',
      by
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleAuth = (role, { createAccount = false, email = '', fullName = '', studentId = '' } = {}) => {
    const enteredName = fullName.trim() || (email ? email.split('@')[0].replace(/[._-]+/g, ' ').trim() : '');
    
    if (createAccount) {
      if (role === 'student') {
        const freshStudent = {
          id: generateStudentId(),
          name: enteredName || 'Student User',
          walletBalance: 500,
          dailyCap: 2000,
          spentToday: 0,
        };
        setStudent(freshStudent);
      } else if (role === 'parent' && studentId.trim()) {
        setStudent((prev) => ({
          ...prev,
          id: studentId.trim().toUpperCase()
        }));
      }
    } else if (enteredName && role === 'student' && !student.name) {
      setStudent((prev) => ({ ...prev, name: enteredName }));
    }

    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
  };

  if (!userRole) {
    return <AuthScreen onSignIn={handleAuth} theme={theme} toggleTheme={toggleTheme} currentStudentId={student.id} />;
  }

  if (userRole === 'student') {
    return (
      <StudentDashboard 
        student={student} 
        setStudent={setStudent}
        transactions={transactions}
        addTransaction={addTransaction}
        setIncomingOrders={setIncomingOrders}
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
        incomingOrders={incomingOrders}
        setIncomingOrders={setIncomingOrders}
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
  const [transferAmount, setTransferAmount] = useState('');
  const [newCapInput, setNewCapInput] = useState(student.dailyCap.toString());

  const handleSendMoney = (e) => {
    e.preventDefault();
    const amountNum = Math.round(parseFloat(transferAmount));

    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (student.walletBalance + amountNum > MAX_WALLET_LIMIT) {
      alert(`Top-up rejected! Total student wallet balance cannot exceed RS ${MAX_WALLET_LIMIT}. (Current Balance: RS ${Math.round(student.walletBalance)})`);
      return;
    }

    setStudent((prev) => ({
      ...prev,
      walletBalance: Math.round(prev.walletBalance + amountNum),
    }));

    addTransaction(`Parent Top-Up (${student.name})`, amountNum, 'credit', 'Parent Portal');
    triggerToast(`Successfully sent RS ${amountNum} to ${student.name}`);
    setTransferAmount('');
  };

  const handleUpdateCap = (e) => {
    e.preventDefault();
    const capNum = Math.round(parseFloat(newCapInput));

    if (isNaN(capNum) || capNum < 0) {
      alert('Please enter a valid cap amount');
      return;
    }

    if (capNum > MAX_WALLET_LIMIT) {
      alert(`Daily spending cap cannot exceed RS ${MAX_WALLET_LIMIT}.`);
      return;
    }

    setStudent((prev) => ({
      ...prev,
      dailyCap: capNum,
    }));

    triggerToast(`Updated ${student.name}'s Daily Allowance Cap to RS ${capNum}`);
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

      <div className="panel target-student-panel">
        <div className="panel-row">
          <div className="student-profile-info">
            <div className="avatar-box">
              <User size={18} className="cafe-icon" />
            </div>
            <div>
              <div className="student-name">{student.name}</div>
              <div className="student-meta">
                ID: <strong>{student.id}</strong> • Balance: <strong>RS {Math.round(student.walletBalance)}</strong>
              </div>
            </div>
          </div>
          <span className="status-badge active-badge">Pass Active</span>
        </div>
      </div>

      <TransactionHistory transactions={transactions} />

      <div className="panel">
        <div className="widget-title gold-text" style={{ marginBottom: '14px' }}>
          <Send size={17} />
          <span>INSTANT WALLET TOP-UP</span>
        </div>

        <form onSubmit={handleSendMoney}>
          <div className="auth-label" style={{ marginBottom: '6px' }}>Top-Up Amount (RS)</div>
          <div className="auth-input-wrap" style={{ marginBottom: '14px' }}>
            <Wallet size={16} />
            <input 
              type="number" 
              placeholder="Enter amount in RS" 
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
              <button type="button" className="sim-chip" onClick={() => setTransferAmount('500')}>+ RS 500</button>
              <button type="button" className="sim-chip" onClick={() => setTransferAmount('1000')}>+ RS 1,000</button>
              <button type="button" className="sim-chip" onClick={() => setTransferAmount('5000')}>+ RS 5,000</button>
            </div>
          </div>

          <button className="primary-btn gold-btn" type="submit" style={{ width: '100%' }}>
            <Send size={16} /> Transfer Money to Student Pass
          </button>
        </form>
      </div>

      <div className="panel budget-panel">
        <div className="widget-title gold-text" style={{ marginBottom: '12px' }}>
          <Sliders size={17} />
          <span>DAILY ALLOWANCE CONTROL</span>
        </div>

        <form onSubmit={handleUpdateCap}>
          <div className="auth-label" style={{ marginBottom: '6px' }}>Daily Spending Cap (RS)</div>
          <div className="auth-input-wrap" style={{ marginBottom: '14px' }}>
            <Shield size={16} />
            <input 
              type="number" 
              placeholder="Max limit RS 10,000" 
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
          <span>Current Cap: <strong>RS {Math.round(student.dailyCap)}</strong></span>
          <span>Spent Today: <strong>RS {Math.round(student.spentToday)}</strong></span>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// STUDENT DASHBOARD COMPONENT
// =============================================================
function StudentDashboard({ 
  student, 
  setStudent, 
  transactions, 
  addTransaction, 
  setIncomingOrders, 
  setStaffSales,
  onLogout, 
  triggerToast, 
  notification, 
  toggleTheme, 
  renderThemeIcon 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Tea');
  const [studentCart, setStudentCart] = useState([]);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const filteredMenu = CAFE_MENU.filter((item) => item.category === selectedCategory && (selectedCategory !== 'Beverages' || item.subcategory === selectedSubcategory));
  const cartTotal = Math.round(studentCart.reduce((sum, item) => sum + item.price, 0));

  const addToCart = (item) => {
    if (student.walletBalance <= 0) {
      alert('Warning: Your wallet balance is RS 0! Please ask your parent to top up your account.');
      return;
    }
    if (cartTotal + item.price > student.walletBalance) {
      alert(`Insufficient Funds! You cannot add ${item.name} (RS ${item.price}) because your balance is RS ${Math.round(student.walletBalance)}.`);
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
      alert('Cannot complete order! Wallet balance is RS 0.');
      return;
    }

    if (cartTotal > student.walletBalance) {
      alert(`Insufficient funds! Your current wallet balance is RS ${Math.round(student.walletBalance)}, but your order total is RS ${cartTotal}.`);
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
      walletBalance: Math.max(0, Math.round(prev.walletBalance - cartTotal)),
      spentToday: Math.round(prev.spentToday + cartTotal),
    }));

    const itemsSummary = studentCart.map((i) => i.name).join(', ');

    addTransaction(`Order: ${itemsSummary}`, cartTotal, 'debit', `Student Portal (${student.name})`);

    const orderPayload = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      studentName: student.name,
      items: [...studentCart],
      totalAmount: cartTotal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setIncomingOrders((prev) => [orderPayload, ...prev]);

    setStaffSales((prev) => ({
      totalRevenue: Math.round(prev.totalRevenue + cartTotal),
      ordersToday: prev.ordersToday + 1,
    }));

    triggerToast(`Order placed & paid! RS ${cartTotal} sent to Staff POS`);
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
            <div className="header-sub">Student Portal • Ullens Canteen</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="theme-btn-compact" onClick={toggleTheme} title="Toggle Theme">{renderThemeIcon()}</button>
          <button className="logout-btn" onClick={onLogout} title="Sign Out"><LogOut size={16} /></button>
        </div>
      </header>

      <div className="panel balance-panel">
        <div className="panel-row">
          <span className="panel-label">AVAILABLE BALANCE</span>
          <span className="status-badge active-badge">Pass Active</span>
        </div>
        <div className="balance-amount">
          <span className="currency-unit">RS</span>
          <span className={`amount-value ${student.walletBalance === 0 ? 'red-text' : ''}`}>
            {Math.round(student.walletBalance)}
          </span>
        </div>

        {student.walletBalance === 0 && (
          <div className="warning-box">
            <AlertTriangle size={16} /> Warning: Your wallet balance is RS 0! Please request a top-up from your parent.
          </div>
        )}

        <div className="student-profile-card">
          <div className="profile-info-row">
            <span className="profile-label">Student Name:</span>
            <span className="profile-value">{student.name}</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Assigned ID:</span>
            <span className="profile-value id-badge">{student.id}</span>
          </div>
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
          <span className="meta-text">Daily Limit: RS {Math.round(student.dailyCap)}</span>
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
          <span>Spent Today: <strong>RS {Math.round(student.spentToday)}</strong></span>
          <span className={remainingBudget < 30 ? 'red-text' : 'green-text'}>
            Remaining: RS {Math.round(remainingBudget)}
          </span>
        </div>
      </div>

      <div className="panel pos-cart-panel">
        <div className="panel-row">
          <span className="pos-cart-title"><Receipt size={16} className="cafe-icon" /> Your Order List</span>
          <span className="pos-cart-total">Total: RS {cartTotal}</span>
        </div>

        {studentCart.length === 0 ? (
          <div className="empty-cart-msg">Select Beverages or Food below to build your order</div>
        ) : (
          <div className="cart-items-scroll">
            {studentCart.map((item, idx) => (
              <div key={idx} className="cart-row">
                <span>{item.name}</span>
                <div className="cart-row-right">
                  <span className="cart-item-price">RS {item.price}</span>
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
            ? 'Wallet Empty (RS 0)' 
            : cartTotal > student.walletBalance 
            ? 'Insufficient Funds' 
            : `Place Order (RS ${cartTotal})`}
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
            <span className="item-price-tag">+ RS {item.price}</span>
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
              This order of <strong>RS {cartTotal}</strong> exceeds your daily limit. Enter Parent PIN to authorize.
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
function StaffDashboard({ 
  student, 
  setStudent, 
  transactions, 
  addTransaction, 
  incomingOrders, 
  setIncomingOrders, 
  staffSales, 
  setStaffSales, 
  onLogout, 
  triggerToast, 
  notification, 
  toggleTheme, 
  renderThemeIcon 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Tea');
  const [cart, setCart] = useState([]);
  const [showScanner, setShowScanner] = useState(false);

  const filteredMenu = CAFE_MENU.filter((item) => item.category === selectedCategory && (selectedCategory !== 'Beverages' || item.subcategory === selectedSubcategory));

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (index) => setCart((prev) => prev.filter((_, i) => i !== index));

  const cartTotal = Math.round(cart.reduce((sum, item) => sum + item.price, 0));

  const handleCompleteOrderQueue = (orderId, amount, studentName) => {
    setIncomingOrders((prev) => prev.filter((o) => o.id !== orderId));
    triggerToast(`Served & cleared order for ${studentName}`);
  };

  const handleDirectCharge = () => {
    if (cart.length === 0) return;

    if (student.walletBalance < cartTotal) {
      alert(`Insufficient Funds! Student balance (RS ${Math.round(student.walletBalance)}) cannot cover total RS ${cartTotal}.`);
      return;
    }

    setStudent((prev) => ({
      ...prev,
      walletBalance: Math.max(0, Math.round(prev.walletBalance - cartTotal)),
      spentToday: Math.round(prev.spentToday + cartTotal),
    }));

    setStaffSales((prev) => ({
      totalRevenue: Math.round(prev.totalRevenue + cartTotal),
      ordersToday: prev.ordersToday + 1,
    }));

    const itemsSummary = cart.map(i => i.name).join(', ');
    addTransaction(`Staff Register Charge: ${itemsSummary}`, cartTotal, 'debit', `Staff Terminal (${student.name})`);
    triggerToast(`Charged RS ${cartTotal} to ${student.name}`);
    setCart([]);
  };

  const handleScanPassResult = (scannedVal) => {
    setShowScanner(false);
    triggerToast(`Scanned Student Pass: ${student.name}`);
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
          <span className="currency-unit">RS</span>
          <span className="amount-value">{Math.round(staffSales.totalRevenue)}</span>
        </div>
        <span className="meta-text">{staffSales.ordersToday} Orders Processed Today</span>
      </div>

      <div className="panel target-student-panel">
        <div className="panel-row" style={{ marginBottom: '10px' }}>
          <div className="widget-title green-text">
            <ShoppingBag size={16} />
            <span>INCOMING STUDENT ORDERS</span>
          </div>
          <button className="scan-mini-btn" onClick={() => setShowScanner(true)}>
            <QrCode size={14} /> Scan Pass
          </button>
        </div>

        {incomingOrders.length === 0 ? (
          <div className="empty-cart-msg">
            No incoming student orders. Waiting for students to place an order...
          </div>
        ) : (
          <div className="staff-orders-queue">
            {incomingOrders.map((order) => (
              <div key={order.id} className="staff-order-card">
                <div className="staff-order-header">
                  <span className="staff-student-title">Student: <strong>{order.studentName}</strong></span>
                  <span className="staff-order-time">{order.timestamp}</span>
                </div>
                <div className="staff-order-body">
                  <div className="staff-order-items">
                    {order.items.map((item, i) => (
                      <span key={i} className="staff-item-chip">{item.name} (RS {item.price})</span>
                    ))}
                  </div>
                  <div className="staff-order-footer">
                    <span className="staff-order-total">Paid Amount: <strong>RS {order.totalAmount}</strong></span>
                    <button 
                      className="complete-order-btn" 
                      onClick={() => handleCompleteOrderQueue(order.id, order.totalAmount, order.studentName)}
                    >
                      <Check size={14} /> Serve Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TransactionHistory transactions={transactions} />

      <div className="panel pos-cart-panel">
        <div className="panel-row">
          <span className="pos-cart-title"><Receipt size={16} className="staff-icon" /> Direct Register Sale</span>
          <span className="pos-cart-total">Total: RS {cartTotal}</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-msg">Select items from menu below to build charge</div>
        ) : (
          <div className="cart-items-scroll">
            {cart.map((item, idx) => (
              <div key={idx} className="cart-row">
                <span>{item.name}</span>
                <div className="cart-row-right">
                  <span className="cart-item-price">RS {item.price}</span>
                  <button className="trash-btn" onClick={() => removeFromCart(idx)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="primary-btn green-btn" 
          disabled={cart.length === 0} 
          onClick={handleDirectCharge}
        >
          <CreditCard size={18} />
          Charge RS {cartTotal} to Canteen Register
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
              <span className="item-cat">{item.subcategory || item.category}</span>
              <span className="item-price-sub">RS {item.price}</span>
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