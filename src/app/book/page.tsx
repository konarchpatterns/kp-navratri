"use client";

import React, { useState } from "react";
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
    { name: "Konarch Prasad", email: "konarch2026@gmail.com", phone: "+91 98765 43210", city: "Vadodara, Gujarat" },
    { name: "Amit Sharma", email: "amit@gmail.com", phone: "+91 91234 56789", city: "" }
  ]);

  // State for Step 3
  const [paymentMethod, setPaymentMethod] = useState("upi");

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
                  <input type="text" value={attendees[0].name} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <div className="input-wrapper">
                  <span className="icon">@</span>
                  <input type="email" value={attendees[0].email} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <div className="input-wrapper">
                  <span className="icon">📞</span>
                  <input type="tel" value={attendees[0].phone} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label>City *</label>
                <div className="input-wrapper">
                  <MapPin size={18} color="#999" />
                  <select>
                    <option>Vadodara, Gujarat</option>
                  </select>
                </div>
              </div>
            </div>

            {totalTickets > 1 && (
              <>
                <h3 className="section-heading">Additional Attendees ({totalTickets - 1})</h3>
                <p className="section-subheading">Enter details for other attendees in your group.</p>
                
                <div className="attendee-card">
                  <div className="attendee-header">
                    <h3 className="attendee-title">👤 Attendee 2</h3>
                    <button className="remove-btn">✕</button>
                  </div>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <div className="input-wrapper">
                      <User size={18} color="#999" />
                      <input type="text" value={attendees[1].name} readOnly />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                      <span className="icon">@</span>
                      <input type="email" value={attendees[1].email} readOnly />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-wrapper">
                      <span className="icon">📞</span>
                      <input type="tel" value={attendees[1].phone} readOnly />
                    </div>
                  </div>
                </div>
                
                <button className="add-attendee-btn">+ Add Another Attendee</button>
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
                  <div className="upi-item"><div className="upi-circle">G</div><span>GPay</span></div>
                  <div className="upi-item"><div className="upi-circle">P</div><span>PhonePe</span></div>
                  <div className="upi-item"><div className="upi-circle">P</div><span>Paytm</span></div>
                  <div className="upi-item"><div className="upi-circle">B</div><span>BHIM</span></div>
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

            <div className="ticket-pass">
              <div className="ticket-pass-header">
                <img src="/images/logo.webp" alt="Logo" className="tp-logo" />
                <div className="tp-title">
                  VADODARA<br/><span>VIBRANT NAVRATRI 2026</span>
                </div>
                <div className="tp-confirmed">
                  <Check size={12} color="#4CAF50" /> Confirmed
                </div>
              </div>
              
              <div className="ticket-pass-body">
                <div className="tp-details">
                  <p className="tp-label">Booking ID</p>
                  <p className="tp-value-large">VVN260614001</p>
                  
                  <p className="tp-value-medium" style={{marginTop: 16}}>14 OCT 2026 (WED)</p>
                  
                  <div className="tp-row">
                    <div>
                      <p className="tp-label">Gate</p>
                      <p className="tp-value">A</p>
                    </div>
                    <div>
                      <p className="tp-label">Entry Time</p>
                      <p className="tp-value">7:00 PM</p>
                    </div>
                  </div>

                  <div className="tp-row" style={{marginTop: 16}}>
                    <div>
                      <p className="tp-label">Attendee</p>
                      <p className="tp-value"><User size={12} style={{marginRight: 4}}/> Konarch Prasad</p>
                    </div>
                    <div>
                      <p className="tp-label">Tickets</p>
                      <p className="tp-value">{ticketQuantities.general} × General Entry</p>
                    </div>
                  </div>
                </div>
                
                <div className="tp-qr">
                  {/* Fake QR Code */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VVN260614001" alt="QR Code" />
                  <p>VVN260614001</p>
                </div>
              </div>
              
              {/* Perforated edge effect */}
              <div className="ticket-divider" />

              <div className="tp-actions">
                <button className="tp-btn secondary"><Download size={16}/> Download Ticket</button>
                <button className="tp-btn primary"><CalendarIcon size={16}/> Add to Calendar</button>
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
