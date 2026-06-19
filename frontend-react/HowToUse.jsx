import React, { useState } from 'react';
import './HowToUse.css';

const HowToUse = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedBusiness, setSelectedBusiness] = useState('retail');
  const [language, setLanguage] = useState('hindi'); // 'hindi' or 'english'

  const businessTypes = {
    retail: {
      name: { hindi: "🛍️ रिटेल / दुकानदारी", english: "🛍️ Retail Store" },
      columns: "month, sales, ads, discount, season, footfall, competitor_price",
      example: "January,10000,5000,10,high,2500,1.05"
    },
    ecommerce: {
      name: { hindi: "🛒 ई-कॉमर्स / ऑनलाइन दुकान", english: "🛒 E-commerce" },
      columns: "month, sales, ads, discount, season, website_traffic, cart_abandonment",
      example: "January,15000,8000,15,high,25000,65"
    },
    agriculture: {
      name: { hindi: "🌾 कृषि / खेती", english: "🌾 Agriculture / Farming" },
      columns: "month, sales, ads, discount, season, rainfall, temperature, harvest_yield",
      example: "January,8000,2000,5,low,50,22,5000"
    },
    electronics: {
      name: { hindi: "📱 इलेक्ट्रॉनिक्स", english: "📱 Electronics" },
      columns: "month, sales, ads, discount, season, new_product_launch, tech_trend_score",
      example: "January,25000,15000,10,high,0,7.5"
    },
    food: {
      name: { hindi: "🍕 फूड / रेस्टोरेंट", english: "🍕 Food & Restaurant" },
      columns: "month, sales, ads, discount, season, weather, perishability_factor",
      example: "January,12000,4000,8,high,1,0.32"
    },
    manufacturing: {
      name: { hindi: "🏭 मैन्युफैक्चरिंग / फैक्ट्री", english: "🏭 Manufacturing" },
      columns: "month, sales, ads, discount, season, raw_material_cost, production_capacity",
      example: "January,50000,10000,5,high,25000,80"
    },
    services: {
      name: { hindi: "💼 सर्विसेज / सेवाएं", english: "💼 Services" },
      columns: "month, sales, ads, discount, season, customer_satisfaction, repeat_customers",
      example: "January,8000,3000,5,high,4.2,30"
    }
  };

  // Content based on language
  const content = {
    hindi: {
      title: "📖 कैसे उपयोग करें - Sales AI",
      subtitle: "बिल्कुल आसान भाषा में समझें | 5 मिनट में सीखें",
      quickStart: "⚡ क्विक स्टार्ट - 30 सेकंड में",
      step1: "Business चुनें",
      step2: "Template Download करें",
      step3: "Data भरें",
      step4: "Upload करें",
      step5: "Predict दबाएं",
      templateSection: "📥 स्टेप 1 और 2: Business Select करें और Template Download करें",
      selectBusiness: "अपना Business Type चुनें:",
      downloadTemplate: "📥 Template डाउनलोड करें",
      columnsForBusiness: "इस बिजनेस के लिए कॉलम होंगे:",
      example: "उदाहरण:",
      stepByStep: "📚 स्टेप-बाय-स्टेप गाइड",
      sampleData: "📊 सैंपल डाटा - कैसे भरें?",
      tip: "💡 टिप: पहले महीने का डाटा ऐसे भरें, फिर अपने असली डाटा से replace करें",
      proTips: "💡 प्रो टिप्स - बेहतर Prediction के लिए",
      tip1Title: "📅 जितना पुराना डाटा, उतना अच्छा",
      tip1Desc: "कम से कम 6-12 महीने का डाटा भरें। जितना ज्यादा डाटा होगा, AI उतना सही prediction करेगा।",
      tip2Title: "🎯 हर महीने अपडेट करें",
      tip2Desc: "हर महीने नया डाटा डालते रहें। इससे AI आपके बिजनेस के नए ट्रेंड सीखता रहेगा।",
      tip3Title: "📊 सभी कॉलम भरें",
      tip3Desc: "जितने भी कॉलम हैं, सब भरें। हर कॉलम AI को कुछ न कुछ सीखने में मदद करता है।",
      tip4Title: "⚠️ गलत डाटा से बचें",
      tip4Desc: "सुनिश्चित करें कि sales, ads, discount में सिर्फ नंबर हों (अल्फाबेट नहीं)।",
      faq: "❓ अक्सर पूछे जाने वाले सवाल",
      faq1Q: "🤔 CSV फाइल कैसे बनाऊं?",
      faq1A: "ऊपर 'Download Template' बटन दबाएं। एक फाइल डाउनलोड होगी। उसे Excel या Google Sheets में खोलें, अपना डाटा भरें, और Save करें।",
      faq2Q: "🤔 कितने महीने का डाटा चाहिए?",
      faq2A: "कम से कम 3 महीने, लेकिन 6-12 महीने का डाटा सबसे अच्छा रहता है।",
      faq3Q: "🤔 क्या मोबाइल से use कर सकता हूँ?",
      faq3A: "हाँ, बिल्कुल! Mobile Chrome या किसी भी browser से use कर सकते हैं।",
      faq4Q: "🤔 क्या मेरा डाटा safe है?",
      faq4A: "हाँ, आपका डाटा कहीं save नहीं होता। सिर्फ prediction के लिए use होता है और delete हो जाता है।",
      faq5Q: "🤔 मुझे error क्यों आ रहा है?",
      faq5A: "चेक करें कि आपने सभी कॉलम भरे हैं या नहीं। sales कॉलम में सिर्फ नंबर होने चाहिए।",
      video: "🎥 वीडियो ट्यूटोरियल (जल्द आ रहा है)",
      videoText: "जल्द ही हिंदी में वीडियो ट्यूटोरियल आ रहा है!"
    },
    english: {
      title: "📖 How to Use - Sales AI",
      subtitle: "Simple language guide | Learn in 5 minutes",
      quickStart: "⚡ Quick Start - 30 Seconds",
      step1: "Select Business",
      step2: "Download Template",
      step3: "Fill Data",
      step4: "Upload File",
      step5: "Click Predict",
      templateSection: "📥 Step 1 & 2: Select Business & Download Template",
      selectBusiness: "Select your Business Type:",
      downloadTemplate: "📥 Download Template",
      columnsForBusiness: "Columns for this business:",
      example: "Example:",
      stepByStep: "📚 Step-by-Step Guide",
      sampleData: "📊 Sample Data - How to fill?",
      tip: "💡 Tip: Fill first month like this, then replace with your actual data",
      proTips: "💡 Pro Tips - For Better Predictions",
      tip1Title: "📅 More data = Better predictions",
      tip1Desc: "Fill at least 6-12 months of data. More data means more accurate AI predictions.",
      tip2Title: "🎯 Update monthly",
      tip2Desc: "Keep adding new data every month. This helps AI learn your business trends.",
      tip3Title: "📊 Fill all columns",
      tip3Desc: "Fill every column. Each column helps AI understand your business better.",
      tip4Title: "⚠️ Avoid wrong data",
      tip4Desc: "Make sure sales, ads, discount columns contain only numbers (not letters).",
      faq: "❓ Frequently Asked Questions",
      faq1Q: "🤔 How to create a CSV file?",
      faq1A: "Click 'Download Template' button above. Open the downloaded file in Excel or Google Sheets, fill your data, and save.",
      faq2Q: "🤔 How many months of data are needed?",
      faq2A: "Minimum 3 months, but 6-12 months of data works best.",
      faq3Q: "🤔 Can I use it on mobile?",
      faq3A: "Yes, absolutely! You can use it on any mobile browser.",
      faq4Q: "🤔 Is my data safe?",
      faq4A: "Yes, your data is not saved anywhere. It's only used for prediction and gets deleted.",
      faq5Q: "🤔 Why am I getting an error?",
      faq5A: "Check if you filled all columns. The 'sales' column should contain only numbers.",
      video: "🎥 Video Tutorial (Coming Soon)",
      videoText: "Video tutorial coming soon in English & Hindi!"
    }
  };

  const t = content[language];

  const steps = {
    hindi: [
      {
        number: 1,
        title: "अपना Business Select करें",
        description: "सबसे पहले ऊपर दिए गए Business Type ड्रॉपडाउन से अपना बिजनेस चुनें।",
        details: [
          "Retail - दुकानदारी (किराना, कपड़े, जनरल स्टोर)",
          "E-commerce - ऑनलाइन दुकान (Amazon, Flipkart जैसी)",
          "Agriculture - खेती (फल, सब्जी, अनाज)",
          "Electronics - मोबाइल, TV, लैपटॉप",
          "Food - रेस्टोरेंट, होटल, ढाबा",
          "Manufacturing - फैक्ट्री",
          "Services - सैलून, प्लंबर, ट्यूशन"
        ]
      },
      {
        number: 2,
        title: "Template Download करें",
        description: "नीचे दिए गए 'Download Template' बटन पर क्लिक करें। आपकी बिजनेस के हिसाब से खाली CSV फाइल डाउनलोड हो जाएगी।",
        details: [
          "फाइल Excel या Google Sheets में खुलती है",
          "इसमें पहले से ही कॉलम नाम लिखे होते हैं",
          "बस अपना डाटा भरना है"
        ]
      },
      {
        number: 3,
        title: "Data भरें (पिछले 6-12 महीने)",
        description: "डाउनलोड की गई फाइल में अपने पिछले महीनों का डाटा भरें।",
        details: [
          "month - महीने का नाम (January, February...)",
          "sales - उस महीने की कुल बिक्री (रुपये में)",
          "ads - विज्ञापन पर खर्च (रुपये में)",
          "discount - दिया गया डिस्काउंट (%)",
          "season - high/medium/low (त्योहारी सीजन)",
          "अन्य कॉलम - आपके बिजनेस के हिसाब से"
        ]
      },
      {
        number: 4,
        title: "File Upload करें",
        description: "भरी हुई फाइल को 'Choose CSV File' बटन से सेलेक्ट करें और 'Predict Now' दबाएं।",
        details: [
          "फाइल CSV फॉर्मेट में होनी चाहिए",
          "कम से कम 3 महीने का डाटा होना चाहिए",
          "जितना ज्यादा डाटा होगा, उतना सही prediction आएगा"
        ]
      },
      {
        number: 5,
        title: "Results देखें और समझें",
        description: "AI आपको बताएगा कि अगले महीने कितनी बिक्री होगी और क्या करना चाहिए।",
        details: [
          "Next Month Prediction - अगले महीने की बिक्री",
          "AI Insight - आपके बिजनेस की सेहत",
          "Recommendation - क्या करना चाहिए",
          "Charts - ग्राफ में ट्रेंड देखें"
        ]
      }
    ],
    english: [
      {
        number: 1,
        title: "Select Your Business",
        description: "First, select your business type from the dropdown menu above.",
        details: [
          "Retail - Grocery, Clothing, General Store",
          "E-commerce - Online Store (like Amazon, Flipkart)",
          "Agriculture - Farming (Fruits, Vegetables, Grains)",
          "Electronics - Mobile, TV, Laptop",
          "Food - Restaurant, Hotel, Cafe",
          "Manufacturing - Factory",
          "Services - Salon, Plumber, Tuition"
        ]
      },
      {
        number: 2,
        title: "Download Template",
        description: "Click the 'Download Template' button below. An empty CSV file will be downloaded.",
        details: [
          "Open the file in Excel or Google Sheets",
          "Column names are already written",
          "Just fill your data"
        ]
      },
      {
        number: 3,
        title: "Fill Data (Last 6-12 months)",
        description: "Fill your past months' data in the downloaded file.",
        details: [
          "month - Month name (January, February...)",
          "sales - Total sales for that month (in Rupees)",
          "ads - Money spent on ads (in Rupees)",
          "discount - Discount given (%)",
          "season - high/medium/low (festival season)",
          "other columns - Based on your business type"
        ]
      },
      {
        number: 4,
        title: "Upload File",
        description: "Select the filled file using 'Choose CSV File' button and click 'Predict Now'.",
        details: [
          "File must be in CSV format",
          "At least 3 months of data required",
          "More data = more accurate prediction"
        ]
      },
      {
        number: 5,
        title: "View Results",
        description: "AI will tell you next month's sales and what to do.",
        details: [
          "Next Month Prediction - Sales for next month",
          "AI Insight - Your business health",
          "Recommendation - What actions to take",
          "Charts - See trends in graphs"
        ]
      }
    ]
  };

  const currentSteps = steps[language];

  const downloadTemplate = () => {
    const business = businessTypes[selectedBusiness];
    const headers = business.columns.split(', ');
    const exampleValues = business.example.split(',');
    
    let csvContent = headers.join(',') + '\n';
    csvContent += exampleValues.join(',') + '\n';
    
    if (selectedBusiness === 'retail') {
      csvContent += "February,12000,5500,12,high,2800,1.02\n";
      csvContent += "March,15000,6000,15,medium,3200,1.00\n";
    } else if (selectedBusiness === 'food') {
      csvContent += "February,11000,3800,10,medium,1,0.30\n";
      csvContent += "March,14000,4500,12,medium,2,0.28\n";
    } else {
      csvContent += "February," + exampleValues.slice(1).join(',') + '\n';
      csvContent += "March," + exampleValues.slice(1).map(v => Math.round(parseInt(v) * 1.1)).join(',') + '\n';
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedBusiness}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="how-to-use-page">
      {/* Language Toggle Button */}
      <div className="language-toggle">
        <button 
          className={`lang-btn ${language === 'hindi' ? 'active' : ''}`}
          onClick={() => setLanguage('hindi')}
        >
          🇮🇳 हिंदी
        </button>
        <button 
          className={`lang-btn ${language === 'english' ? 'active' : ''}`}
          onClick={() => setLanguage('english')}
        >
          🇬🇧 English
        </button>
      </div>

      <div className="htu-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      {/* Quick Start Section */}
      <div className="quick-start">
        <h2>{t.quickStart}</h2>
        <div className="quick-steps">
          <div className="quick-step">
            <span className="quick-num">1</span>
            <span>{t.step1}</span>
            <span>→</span>
          </div>
          <div className="quick-step">
            <span className="quick-num">2</span>
            <span>{t.step2}</span>
            <span>→</span>
          </div>
          <div className="quick-step">
            <span className="quick-num">3</span>
            <span>{t.step3}</span>
            <span>→</span>
          </div>
          <div className="quick-step">
            <span className="quick-num">4</span>
            <span>{t.step4}</span>
            <span>→</span>
          </div>
          <div className="quick-step">
            <span className="quick-num">5</span>
            <span>{t.step5}</span>
          </div>
        </div>
      </div>

      {/* Template Download Section */}
      <div className="template-download-section">
        <h2>{t.templateSection}</h2>
        <div className="business-selector-box">
          <label>{t.selectBusiness}</label>
          <select 
            value={selectedBusiness} 
            onChange={(e) => setSelectedBusiness(e.target.value)}
            className="business-select-large"
          >
            {Object.entries(businessTypes).map(([key, value]) => (
              <option key={key} value={key}>{value.name[language]}</option>
            ))}
          </select>
          <button className="download-template-btn" onClick={downloadTemplate}>
            {t.downloadTemplate}
          </button>
        </div>
        <div className="template-preview">
          <p><strong>{t.columnsForBusiness}</strong></p>
          <code>{businessTypes[selectedBusiness].columns}</code>
          <p><strong>{t.example}</strong></p>
          <code>{businessTypes[selectedBusiness].example}</code>
        </div>
      </div>

      {/* Detailed Steps */}
      <div className="steps-container">
        <h2>{t.stepByStep}</h2>
        <div className="steps-tabs">
          {currentSteps.map(step => (
            <button
              key={step.number}
              className={`step-tab ${activeStep === step.number ? 'active' : ''}`}
              onClick={() => setActiveStep(step.number)}
            >
              Step {step.number}
            </button>
          ))}
        </div>
        
        {currentSteps.map(step => (
          <div key={step.number} className={`step-content ${activeStep === step.number ? 'active' : ''}`}>
            <div className="step-number-large">{step.number}</div>
            <h3>{step.title}</h3>
            <p className="step-description">{step.description}</p>
            <ul>
              {step.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sample Data Section */}
      <div className="sample-data">
        <h2>{t.sampleData}</h2>
        <div className="sample-table-wrapper">
          <table className="sample-table">
            <thead>
              <tr>
                <th>month</th>
                <th>sales</th>
                <th>ads</th>
                <th>discount</th>
                <th>season</th>
                <th>weather</th>
                <th>perishability_factor</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>January</td><td>10000</td><td>5000</td><td>10</td><td>high</td><td>1</td><td>0.32</td></tr>
              <tr><td>February</td><td>12000</td><td>5500</td><td>12</td><td>high</td><td>1</td><td>0.30</td></tr>
              <tr><td>March</td><td>15000</td><td>6000</td><td>15</td><td>medium</td><td>2</td><td>0.28</td></tr>
            </tbody>
          </table>
        </div>
        <div className="sample-note">
          {t.tip}
        </div>
      </div>

      {/* Tips Section */}
      <div className="tips-section">
        <h2>{t.proTips}</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">📅</div>
            <h4>{t.tip1Title}</h4>
            <p>{t.tip1Desc}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <h4>{t.tip2Title}</h4>
            <p>{t.tip2Desc}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📊</div>
            <h4>{t.tip3Title}</h4>
            <p>{t.tip3Desc}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">⚠️</div>
            <h4>{t.tip4Title}</h4>
            <p>{t.tip4Desc}</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>{t.faq}</h2>
        <div className="faq-list">
          <div className="faq-item">
            <div className="faq-question">{t.faq1Q}</div>
            <div className="faq-answer">{t.faq1A}</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{t.faq2Q}</div>
            <div className="faq-answer">{t.faq2A}</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{t.faq3Q}</div>
            <div className="faq-answer">{t.faq3A}</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{t.faq4Q}</div>
            <div className="faq-answer">{t.faq4A}</div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{t.faq5Q}</div>
            <div className="faq-answer">{t.faq5A}</div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <h2>{t.video}</h2>
        <div className="video-placeholder">
          <span>📹</span>
          <p>{t.videoText}</p>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;