"use client";

import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";
import { 
  ChevronLeft, Check, Ticket, User, CreditCard, 
  MapPin, Calendar as CalendarIcon, Clock, ShieldCheck, Download
} from "lucide-react";
import "./book.css";

const DATES = [
  { day: "11 OCT", dayName: "SUN" },
  { day: "12 OCT", dayName: "MON" },
  { day: "13 OCT", dayName: "TUE" },
  { day: "14 OCT", dayName: "WED" },
  { day: "15 OCT", dayName: "THU" },
  { day: "16 OCT", dayName: "FRI" },
  { day: "17 OCT", dayName: "SAT" },
  { day: "18 OCT", dayName: "SUN" },
  { day: "19 OCT", dayName: "MON" },
];

const TICKET_TYPES = [
  { id: "general", title: "GENERAL ENTRY", price: 300, desc: "Access to Garba Ground\nStandard Entry • Open Arena", popular: true },
  { id: "vip", title: "VIP PASS", price: 799, desc: "Premium Viewing Area\nSeparate Entry • Better Facilities", popular: false },
  { id: "couple", title: "COUPLE PASS", price: 1299, desc: "Special Couple Entry\nTwo Person Entry • Reserved Area", popular: false },
  { id: "group", title: "GROUP PASS (5+)", price: 1199, desc: "Best for Friends & Groups\nExclusive Entry • Group Benefits", popular: false },
];

export default function BookTickets() {
  const [step, setStep] = useState(1);
  
  // State for Step 1
  const [selectedDate, setSelectedDate] = useState("14 OCT");
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({
    general: 2,
    vip: 0,
    couple: 0,
    group: 0,
  });

  // State for Step 2
  const [attendees, setAttendees] = useState([
    { name: "", email: "", phone: "", city: "Vadodara, Gujarat" },
    { name: "", email: "", phone: "", city: "" }
  ]);
  
  // State for Step 3
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const updateAttendee = (index: number, field: string, value: string) => {
    setAttendees(prev => {
      const newAttendees = [...prev];
      if (!newAttendees[index]) {
        newAttendees[index] = { name: "", email: "", phone: "", city: "" };
      }
      newAttendees[index] = { ...newAttendees[index], [field]: value };
      return newAttendees;
    });
  };

  // Calculations
  const totalTickets = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);
  const subtotal = TICKET_TYPES.reduce((acc, type) => acc + (type.price * ticketQuantities[type.id]), 0);
  const convenienceFee = totalTickets > 0 ? 30 : 0;
  const gst = Math.round(subtotal * 0.18);
  const totalAmount = subtotal > 0 ? subtotal + convenienceFee + gst : 0;

  const updateQuantity = (id: string, delta: number) => {
    setTicketQuantities(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next < 0) return prev;
      return { ...prev, [id]: next };
    });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Generate an array of attendee indices based on totalTickets
  const attendeeIndices = Array.from({ length: totalTickets }, (_, i) => i);

  const [showUpiModal, setShowUpiModal] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 4) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    try {
      const canvas = await html2canvas(ticketRef.current, { backgroundColor: null });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `VVN_Ticket_260614001.png`;
      link.click();
    } catch (err) {
      console.error("Failed to download ticket", err);
    }
  };

  const handleUpiClick = (app: string) => {
    setSelectedUpiApp(app);
    setShowUpiModal(true);
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowUpiModal(false);
      nextStep(); // Go to step 4 (Confirm)
    }, 2500);
  };

  return (
    <div className="book-container">
      {/* HEADER */}
      <header className="book-header">
        <Link href="/" className="book-back-btn">
          <ChevronLeft size={24} color="#EAB04E" />
        </Link>
        <div className="book-logo">
          <img src="/images/logo.webp" alt="Navratri Logo" />
          <span>VADODARA<br/>VIBRANT NAVRATRI</span>
        </div>
        <div className="header-placeholder" />
      </header>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification fade-in">
          <Check size={16} color="#4CAF50" style={{marginRight: 8}} />
          Booking confirmation and ticket attached sent to {attendees[0]?.email || "your email"}.
        </div>
      )}

      {/* UPI Sandbox Modal */}
      {showUpiModal && (
        <div className="modal-overlay">
          <div className="modal-content fade-in">
            <h3 style={{ color: '#EAB04E', marginBottom: 12 }}>{selectedUpiApp} Sandbox</h3>
            <p style={{ marginBottom: 24, color: '#aaa', fontSize: 14 }}>
              Simulating payment of <strong style={{ color: '#fff' }}>₹{totalAmount}</strong> to Vadodara Vibrant Navratri.
            </p>
            {isProcessing ? (
              <div className="processing-state">
                <div className="spinner"></div>
                <p>Processing payment securely...</p>
              </div>
            ) : (
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowUpiModal(false)}>Cancel</button>
                <button className="pay-btn" onClick={simulatePayment}>Enter PIN & Pay ₹{totalAmount}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROGRESS BAR */}
      <div className="progress-container">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${((step - 1) / 3) * 100}%` }} />
        </div>
        <div className="progress-steps">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`progress-step ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
              <div className="step-circle">
                {step > s ? <Check size={14} /> : s}
              </div>
              <span className="step-label">
                {s === 1 ? "Tickets" : s === 2 ? "Details" : s === 3 ? "Payment" : "Confirm"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <main className="book-main">
        {step === 1 && (
          <div className="step-content fade-in">
            <h1 className="step-title">CHOOSE YOUR EXPERIENCE</h1>
            <p className="step-subtitle">Select your preferred date and ticket type to join the most vibrant Navratri celebration in Vadodara.</p>

            <div className="section-title">
              <span className="section-number">1</span> Select Date
            </div>
            <div className="date-scroll">
              {DATES.map(date => (
                <button 
                  key={date.day} 
                  className={`date-btn ${selectedDate === date.day ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date.day)}
                >
                  <span className="date-num">{date.day.split(' ')[0]} {date.day.split(' ')[1]}</span>
                  <span className="date-day">{date.dayName}</span>
                </button>
              ))}
            </div>

            <div className="section-title" style={{ marginTop: 32 }}>
              <span className="section-number">2</span> Select Ticket Type
            </div>
            <div className="ticket-list">
              {TICKET_TYPES.map(type => (
                <div key={type.id} className={`ticket-card ${type.popular ? 'popular' : ''}`}>
                  {type.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="ticket-card-content">
                    <div className="ticket-icon">
                      {type.id === 'general' ? <Ticket color="#EAB04E" /> : 
                       type.id === 'vip' ? <ShieldCheck color="#EAB04E" /> : <User color="#EAB04E" />}
                    </div>
                    <div className="ticket-info">
                      <h3>{type.title}</h3>
                      <p>{type.desc.split('\n')[0]}</p>
                      <p className="ticket-subdesc">{type.desc.split('\n')[1]}</p>
                    </div>
                    <div className="ticket-price-qty">
                      <div className="ticket-price">
                        <span className="rupee">₹</span> {type.price}
                        <span className="per-person">per person</span>
                      </div>
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(type.id, -1)}>-</button>
                        <span>{ticketQuantities[type.id]}</span>
                        <button onClick={() => updateQuantity(type.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content fade-in">
            <h1 className="step-title">ATTENDEE DETAILS</h1>
            <p className="step-subtitle">Please provide attendee information for ticket booking.</p>

            <div className="attendee-card">
              <h3 className="attendee-title">Primary Attendee</h3>
              <div className="form-group">
                <label>Full Name *</label>
                <div className="input-wrapper">
                  <User size={18} color="#999" />
                  <input type="text" placeholder="Enter Full Name" value={attendees[0]?.name || ""} onChange={(e) => updateAttendee(0, 'name', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <div className="input-wrapper">
                  <span className="icon">@</span>
                  <input type="email" placeholder="Enter Email Address" value={attendees[0]?.email || ""} onChange={(e) => updateAttendee(0, 'email', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <div className="input-wrapper">
                  <span className="icon">📞</span>
                  <input type="tel" placeholder="+91 xxxxx xxxxx" value={attendees[0]?.phone || ""} onChange={(e) => updateAttendee(0, 'phone', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>City *</label>
                <div className="input-wrapper">
                  <MapPin size={18} color="#999" />
                  <select value={attendees[0]?.city || "Vadodara, Gujarat"} onChange={(e) => updateAttendee(0, 'city', e.target.value)}>
                    <option>Vadodara, Gujarat</option>
                    <option>Ahmedabad, Gujarat</option>
                    <option>Surat, Gujarat</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {totalTickets > 1 && (
              <>
                <h3 className="section-heading">Additional Attendees ({totalTickets - 1})</h3>
                <p className="section-subheading">Enter details for other attendees in your group.</p>
                
                {attendeeIndices.slice(1).map((index) => (
                  <div key={index} className="attendee-card">
                    <div className="attendee-header">
                      <h3 className="attendee-title">👤 Attendee {index + 1}</h3>
                    </div>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <div className="input-wrapper">
                        <User size={18} color="#999" />
                        <input type="text" placeholder="Enter Full Name" value={attendees[index]?.name || ""} onChange={(e) => updateAttendee(index, 'name', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <div className="input-wrapper">
                        <span className="icon">@</span>
                        <input type="email" placeholder="Enter Email Address (Optional)" value={attendees[index]?.email || ""} onChange={(e) => updateAttendee(index, 'email', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <div className="input-wrapper">
                        <span className="icon">📞</span>
                        <input type="tel" placeholder="+91 xxxxx xxxxx (Optional)" value={attendees[index]?.phone || ""} onChange={(e) => updateAttendee(index, 'phone', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="step-content fade-in">
            <h1 className="step-title">SECURE PAYMENT</h1>
            <p className="step-subtitle">Choose your preferred payment method and complete your booking.</p>

            <div className="order-summary-card">
              <div className="os-header">
                <h3>Order Summary</h3>
                <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
              </div>
              
              <div className="os-item-details">
                <img src="/images/kv.png" alt="Event" className="os-img" />
                <div className="os-info">
                  <h4>General Entry</h4>
                  <p className="os-qty">₹ 300 × {ticketQuantities.general} <span>₹ {300 * ticketQuantities.general}</span></p>
                  <p className="os-meta"><CalendarIcon size={12}/> 14 October 2026 (Wed)  <Clock size={12}/> 7:00 PM Onwards</p>
                  <p className="os-meta"><MapPin size={12}/> VVN Garba Ground, Vadodara</p>
                </div>
              </div>

              <div className="os-breakdown">
                <div className="os-row">
                  <span>Subtotal</span>
                  <span>₹ {subtotal}</span>
                </div>
                <div className="os-row">
                  <span>Convenience Fee</span>
                  <span>₹ {convenienceFee}</span>
                </div>
                <div className="os-row">
                  <span>GST (18%)</span>
                  <span>₹ {gst}</span>
                </div>
                <div className="os-row os-total">
                  <span>Total Amount</span>
                  <span>₹ {totalAmount}</span>
                </div>
              </div>

              <div className="coupon-box">
                <p>Have a coupon code?</p>
                <div className="coupon-input-group">
                  <input type="text" placeholder="Enter coupon code" />
                  <button>Apply</button>
                </div>
              </div>
            </div>

            <h3 className="section-heading">Payment Method</h3>
            <div className="payment-methods">
              <button className={`pm-btn ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
                <span className="pm-icon">📱</span> UPI
              </button>
              <button className={`pm-btn ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                <CreditCard size={16} /> Card
              </button>
              <button className={`pm-btn ${paymentMethod === 'net' ? 'active' : ''}`} onClick={() => setPaymentMethod('net')}>
                <span className="pm-icon">🏦</span> Net Banking
              </button>
              <button className={`pm-btn ${paymentMethod === 'wallet' ? 'active' : ''}`} onClick={() => setPaymentMethod('wallet')}>
                <span className="pm-icon">👛</span> Wallets
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="upi-options">
                <p>Pay using UPI</p>
                <div className="upi-grid">
                  <div className="upi-item" onClick={() => handleUpiClick('GPay')} style={{cursor: 'pointer'}}><div className="upi-circle">G</div><span>GPay</span></div>
                  <div className="upi-item" onClick={() => handleUpiClick('PhonePe')} style={{cursor: 'pointer'}}><div className="upi-circle">P</div><span>PhonePe</span></div>
                  <div className="upi-item" onClick={() => handleUpiClick('Paytm')} style={{cursor: 'pointer'}}><div className="upi-circle">P</div><span>Paytm</span></div>
                  <div className="upi-item" onClick={() => handleUpiClick('BHIM')} style={{cursor: 'pointer'}}><div className="upi-circle">B</div><span>BHIM</span></div>
                  <div className="upi-item"><div className="upi-circle">...</div><span>Other UPI</span></div>
                </div>
              </div>
            )}
            
            <p className="secure-text">🔒 Your payment information is secure and encrypted.</p>
          </div>
        )}

        {step === 4 && (
          <div className="step-content fade-in confirm-step">
            <div className="success-icon">
              <Check size={40} color="#fff" />
            </div>
            <h1 className="success-title">Booking Confirmed!</h1>
            <p className="success-subtitle">Thank you for being a part of<br/>Vadodara Vibrant Navratri 2026</p>

            <div className="ticket-landscape" ref={ticketRef}>
              {/* LEFT SIDE: Event Details */}
              <div className="ticket-left">
                <div className="tl-content">
                  <img src="/images/logo.webp" alt="Logo" className="tl-logo" />
                  
                  <div className="tl-title-area">
                    <h2 className="tl-main-title">
                      <span className="tl-vadodara">VADODARA</span><br/>
                      <span className="tl-vibrant">VIBRANT</span><br/>
                      <span className="tl-navratri">NAVRATRI</span><br/>
                      <span className="tl-year">2026</span>
                    </h2>
                  </div>

                  <div className="tl-info-grid">
                    <div className="tl-info-item">
                      <CalendarIcon size={18} color="#EAB04E" />
                      <div>
                        <strong>11 - 19</strong><br/><span>OCTOBER 2026</span>
                      </div>
                    </div>
                    <div className="tl-info-item">
                      <Clock size={18} color="#EAB04E" />
                      <div>
                        <strong>7:00 PM</strong><br/><span>ONWARDS</span>
                      </div>
                    </div>
                    <div className="tl-info-item">
                      <MapPin size={18} color="#EAB04E" />
                      <div>
                        <strong>VVN GARBA GROUND</strong><br/><span>VADODARA, GUJARAT</span>
                      </div>
                    </div>
                  </div>

                  <div className="tl-features">
                    <div className="tl-feature">
                      <img src="/images/dandiya-icon.png" alt="" className="tl-f-icon" onError={(e) => e.currentTarget.style.display='none'} />
                      <span><strong>9 NIGHTS</strong><br/>OF GARBA</span>
                    </div>
                    <div className="tl-feature">
                      <User size={16} color="#EAB04E" />
                      <span><strong>30,000+</strong><br/>DAILY ENTHUSIASTS</span>
                    </div>
                    <div className="tl-feature">
                      <img src="/images/mic-icon.png" alt="" className="tl-f-icon" onError={(e) => e.currentTarget.style.display='none'} />
                      <span><strong>6+ FEATURED</strong><br/>ARTISTS</span>
                    </div>
                    <div className="tl-feature">
                      <div className="tl-f-text">
                        FOOD • CULTURE<br/>FUN • FAMILY
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PERFORATION */}
              <div className="ticket-perforation">
                <div className="perf-circle-top"></div>
                <div className="perf-line"></div>
                <div className="perf-circle-bottom"></div>
              </div>

              {/* RIGHT SIDE: Ticket Stub */}
              <div className="ticket-right">
                <img src="/images/logo.webp" alt="Logo" className="tr-logo" />
                
                <div className="tr-type">
                  <h3 style={{fontSize: 12}}>{Object.entries(ticketQuantities).filter(([_, q]) => q > 0).map(([id, q]) => `${q}x ${TICKET_TYPES.find(t => t.id === id)?.title}`).join(', ')}</h3>
                  <p>— TOTAL: ₹{totalAmount} —</p>
                </div>

                <div className="tr-attendee" style={{marginBottom: 12}}>
                  <p className="tr-label">ATTENDEE</p>
                  <p className="tr-value" style={{fontSize: 13}}>{attendees[0]?.name || "Guest"}</p>
                </div>

                <div className="tr-date">
                  <p className="tr-label">DATE</p>
                  <p className="tr-value">14 OCT 2026 (WED)</p>
                </div>

                <div className="tr-gate-time">
                  <div>
                    <p className="tr-label">GATE</p>
                    <p className="tr-value">A</p>
                  </div>
                  <div className="tr-divider"></div>
                  <div>
                    <p className="tr-label">ENTRY TIME</p>
                    <p className="tr-value">7:00 PM</p>
                  </div>
                </div>

                <div className="tr-qr">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=VVN260614001" alt="QR Code" />
                  <p>VVN260614001</p>
                </div>

                <div className="tr-rules">
                  <p><User size={10} /> Valid for one person only</p>
                  <p><span style={{fontSize:10}}>✕</span> Non-transferable</p>
                  <p><span style={{fontSize:10}}>🆔</span> Please carry a valid ID</p>
                </div>
              </div>
            </div>

            <div className="tp-actions" data-html2canvas-ignore>
              <button className="tp-btn secondary" onClick={downloadTicket}>
                <Download size={16}/> Download Ticket
              </button>
              <button className="tp-btn primary"><CalendarIcon size={16}/> Add to Calendar</button>
            </div>
            
            <div className="email-confirmation-msg" data-html2canvas-ignore>
              <div className="ec-icon">
                <Check size={20} color="#4CAF50" />
              </div>
              <div className="ec-text">
                <strong>Booking Confirmed!</strong>
                <p>An email with your ticket and booking details has been sent to <strong>{attendees[0]?.email || "your email"}</strong>.</p>
              </div>
            </div>

            <div className="important-info">
              <h4>Important Information</h4>
              <ul>
                <li>Please carry a valid photo ID.</li>
                <li>Non-transferable ticket.</li>
                <li>Reach 30 minutes early for hassle-free entry.</li>
                <li>Follow event guidelines and enjoy responsibly.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER BAR (Only for steps 1-3) */}
      {step < 4 && (
        <div className="book-footer">
          <div className="bf-summary">
            {step === 1 && (
              <>
                <div className="bf-info">
                  <p className="bf-label">Selected Date</p>
                  <p className="bf-value">{selectedDate} 2026 (WED)</p>
                </div>
                <div className="bf-total">
                  <p className="bf-label">Total Amount</p>
                  <p className="bf-value">₹ {totalAmount}</p>
                </div>
              </>
            )}
            
            {step === 2 && (
              <>
                <div className="bf-info-row">
                  <img src="/images/kv.png" alt="thumb" className="bf-thumb" />
                  <div>
                    <p className="bf-value">General Entry × {ticketQuantities.general}</p>
                    <p className="bf-label">14 OCT 2026 (WED)</p>
                  </div>
                </div>
                <div className="bf-total">
                  <p className="bf-value-large">₹ {totalAmount}</p>
                  <p className="bf-label-link" onClick={() => setStep(1)}>View Details ▾</p>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="bf-total-only">
                <p className="bf-secure-total">🔒 Pay Securely ₹ {totalAmount}</p>
              </div>
            )}
          </div>
          
          <div className="bf-actions">
            {step > 1 && (
              <button className="bf-back-btn" onClick={prevStep}>
                ← Back
              </button>
            )}
            <button 
              className={`bf-next-btn ${totalAmount === 0 ? 'disabled' : ''}`} 
              onClick={nextStep}
              disabled={totalAmount === 0}
            >
              {step === 1 ? "Next: Attendee Details →" : step === 2 ? "Next: Payment →" : `Pay Securely ₹ ${totalAmount}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
