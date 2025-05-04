// --- Localization Manager ---
const localization = {
    en: {
        appTitle: "Token Converter",
        tokenCount: "Token Count",
        enterPositiveNumber: "Enter positive number",
        invalidInput: "Please enter a valid positive number",
        settingsTitle: "Conversion Settings",
        tokenWordRatio: "Token to word ratio: ",
        explanationTitle: "Ratio explanation:",
        standardRatio: "• 1.33 = Standard ratio (default)",
        lowerValue: "• Lower value = more words from tokens",
        higherValue: "• Higher value = fewer words from tokens",
        resetDefault: "Reset to Default",
        wordCount: "Word Count",
        pageCount: "Page Count",
        charCount: "Character Count",
        showTips: "Show Tips",
        hideTips: "Hide Tips",
        tipsTitle: "Useful Information",
        tip1: "• 1 token is approximately 4 characters in English",
        tip2: "• Large language models typically charge by tokens, not words",
        tip3: "• A standard page has 250 words or 1,800 characters",
        tip4: "• Average word length is 5-6 characters", // Consider language differences if precise
        tip5: "• On average, there are about 1.3 tokens per word"
    },
    sk: {
        appTitle: "Token Prevodník",
        tokenCount: "Počet tokenov",
        enterPositiveNumber: "Zadajte kladné celé číslo",
        invalidInput: "Zadajte platné kladné celé číslo",
        settingsTitle: "Nastavenia prevodu",
        tokenWordRatio: "Pomer tokenov na slovo: ",
        explanationTitle: "Vysvetlenie koeficientu:",
        standardRatio: "• 1.33 = Štandardný pomer (prednastavený)",
        lowerValue: "• Nižšia hodnota = viac slov z tokenov",
        higherValue: "• Vyššia hodnota = menej slov z tokenov",
        resetDefault: "Obnoviť predvolenú hodnotu",
        wordCount: "Počet slov",
        pageCount: "Počet normostrán",
        charCount: "Počet znakov",
        showTips: "Zobraziť tipy",
        hideTips: "Skryť tipy",
        tipsTitle: "Užitočné informácie",
        tip1: "• 1 token zodpovedá približne 4 znakom v angličtine",
        tip2: "• Veľké jazykové modely zvyčajne účtujú cenu za tokeny, nie slová",
        tip3: "• Normostrana má štandardne 250 slov alebo 1800 znakov",
        tip4: "• Priemerná dĺžka slova v slovenčine je 5-6 znakov",
        tip5: "• V priemere je to približne 1.3 tokena na slovo"
    }
};

const languageFlags = {
    en: "🇬🇧",
    sk: "🇸🇰"
};

const languageShortCodes = {
    en: "EN",
    sk: "SK"
};

let currentLanguage = 'en'; // Default language

function loc(key) {
    return localization[currentLanguage][key] || `[Missing ${key}]`;
}

function toggleLanguage() {
    const languages = Object.keys(localization);
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    currentLanguage = languages[nextIndex];
    updateUIWithLocalization();
    render(); // Re-render to show updated text
}

function updateUIWithLocalization() {
    document.getElementById('app-title').innerText = loc('appTitle');
    document.getElementById('token-count-label').innerText = loc('tokenCount');
    document.getElementById('token-input').placeholder = loc('enterPositiveNumber');
    document.getElementById('input-validation-message').innerText = loc('invalidInput');
    document.getElementById('settings-title').innerText = loc('settingsTitle');
    // The ratio display text is updated in render()
    document.getElementById('explanation-title').innerText = loc('explanationTitle');
    document.getElementById('standard-ratio').innerText = loc('standardRatio');
    document.getElementById('lower-value').innerText = loc('lowerValue');
    document.getElementById('higher-value').innerText = loc('higherValue');
    document.getElementById('reset-default-text').innerText = loc('resetDefault');
    document.getElementById('word-count-title').innerText = loc('wordCount');
    document.getElementById('page-count-title').innerText = loc('pageCount');
    document.getElementById('char-count-title').innerText = loc('charCount');
    // Show/Hide tips text is updated in render() based on showTips state
    document.getElementById('tips-title').innerText = loc('tipsTitle');
    document.getElementById('tip1').innerText = loc('tip1');
    document.getElementById('tip2').innerText = loc('tip2');
    document.getElementById('tip3').innerText = loc('tip3');
    document.getElementById('tip4').innerText = loc('tip4');
    document.getElementById('tip5').innerText = loc('tip5');

    // Update language button
    document.getElementById('lang-flag').innerText = languageFlags[currentLanguage];
    document.getElementById('lang-code').innerText = languageShortCodes[currentLanguage];
}


// --- Token Calculator Logic ---
const TokenCalculator = {
    // Default conversion constants
    tokensPerWord: 1.33, // This will be updated from state
    wordsPerPage: 250,
    charsPerWord: 5,

    calculateWords: function(tokens) {
        if (tokens <= 0 || isNaN(tokens)) return 0;
        return Math.floor(tokens / this.tokensPerWord);
    },

    calculatePages: function(words) {
        if (words <= 0 || isNaN(words)) return 0;
         // Use Math.floor to get whole pages
        return Math.floor(words / this.wordsPerPage);
    },

    calculateCharacters: function(words) {
         if (words <= 0 || isNaN(words)) return 0;
        return Math.floor(words * this.charsPerWord); // Using Math.floor for whole characters
    },

    formatNumber: function(number) {
        // JavaScript's toLocaleString handles thousand separators based on locale
        return number.toLocaleString();
    }
};

// --- State Variables (replaces @State) ---
let tokenInput = "";
let showSettings = false;
let showTips = false;
let tokensPerWordRatio = 1.33; // Initial value

// --- DOM References ---
const tokenInputElem = document.getElementById('token-input');
const inputValidationMessageElem = document.getElementById('input-validation-message');
const clearInputButton = document.getElementById('clear-input');
const toggleSettingsButton = document.getElementById('toggle-settings');
const settingsContentElem = document.getElementById('settings-content');
const settingsChevronElem = document.getElementById('settings-chevron');
const ratioSliderElem = document.getElementById('ratio-slider');
const tokenWordRatioDisplayElem = document.getElementById('token-word-ratio-display');
const resetRatioButton = document.getElementById('reset-ratio');
const resultsSectionElem = document.getElementById('results-section');
const wordCountValueElem = document.getElementById('word-count-value');
const pageCountValueElem = document.getElementById('page-count-value');
const charCountValueElem = document.getElementById('char-count-value');
const toggleTipsButton = document.getElementById('toggle-tips');
const showHideTipsTextElem = document.getElementById('show-hide-tips-text');
const tipsChevronElem = document.getElementById('tips-chevron');
const tipsContentElem = document.getElementById('tips-content');
const languageToggleButton = document.getElementById('language-toggle');


// --- Helper Functions ---
function isInputValid() {
    const tokens = parseInt(tokenInput, 10);
    return !isNaN(tokens) && tokens > 0;
}

function calculateResults() {
    if (!isInputValid()) {
        return { wordCount: 0, pageCount: 0, charCount: 0 };
    }
    const tokens = parseInt(tokenInput, 10);
    TokenCalculator.tokensPerWord = tokensPerWordRatio; // Update calculator ratio
    const wordCount = TokenCalculator.calculateWords(tokens);
    const pageCount = TokenCalculator.calculatePages(wordCount);
    const charCount = TokenCalculator.calculateCharacters(wordCount);
    return { wordCount, pageCount, charCount };
}

function updateResultsDisplay() {
     if (isInputValid()) {
         const results = calculateResults();
         wordCountValueElem.innerText = TokenCalculator.formatNumber(results.wordCount);
         pageCountValueElem.innerText = TokenCalculator.formatNumber(results.pageCount);
         charCountValueElem.innerText = TokenCalculator.formatNumber(results.charCount);
         resultsSectionElem.classList.remove('hidden');
     } else {
         // Hide results or show default 0s when input is invalid or empty
         wordCountValueElem.innerText = TokenCalculator.formatNumber(0);
         pageCountValueElem.innerText = TokenCalculator.formatNumber(0);
         charCountValueElem.innerText = TokenCalculator.formatNumber(0);
         // Optionally hide the whole results section if input is invalid/empty
         // resultsSectionElem.classList.add('hidden');
     }
}


// --- Render Function (Updates the UI based on state) ---
function render() {
    // Update Input and Validation
    tokenInputElem.value = tokenInput; // Keep input field in sync if needed (e.g., after clear)
    if (!isInputValid() && tokenInput !== "") {
        inputValidationMessageElem.classList.remove('hidden');
        tokenInputElem.classList.add('invalid');
    } else {
        inputValidationMessageElem.classList.add('hidden');
        tokenInputElem.classList.remove('invalid');
    }

    // Show/hide clear button
    if (tokenInput.length > 0) {
        clearInputButton.classList.remove('hidden');
    } else {
        clearInputButton.classList.add('hidden');
    }


    // Update Settings Section Visibility
    if (showSettings) {
        settingsContentElem.classList.remove('hidden');
        settingsChevronElem.innerHTML = "&uarr;"; // Up arrow
    } else {
        settingsContentElem.classList.add('hidden');
        settingsChevronElem.innerHTML = "&darr;"; // Down arrow
    }

    // Update Ratio Slider and Display
    ratioSliderElem.value = tokensPerWordRatio;
    tokenWordRatioDisplayElem.innerText = loc('tokenWordRatio') + tokensPerWordRatio.toFixed(2);

    // Update Results Display
    updateResultsDisplay();


    // Update Tips Section Visibility
    if (showTips) {
        tipsContentElem.classList.remove('hidden');
         showHideTipsTextElem.innerText = loc('hideTips');
        tipsChevronElem.innerHTML = "&uarr;"; // Up arrow
    } else {
        tipsContentElem.classList.add('hidden');
         showHideTipsTextElem.innerText = loc('showTips');
        tipsChevronElem.innerHTML = "&darr;"; // Down arrow
    }

    // Update localization (already handled by updateUIWithLocalization, call it separately if state changes language)
}


// --- Event Listeners ---
tokenInputElem.addEventListener('input', (event) => {
    // Ensure only positive integers can be entered (basic handling)
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, ''); // Remove non-digits
    if (value.startsWith('0') && value.length > 1) { // Prevent leading zeros unless it's just '0'
        value = parseInt(value, 10).toString(); // Convert to number and back to string
    }
     if (value === '0') value = ''; // Disallow '0' as a valid positive number
     tokenInput = value; // Update state

    // Update the input field's value directly if it was changed by logic (e.g., removing non-digits)
    if (event.target.value !== tokenInput) {
        event.target.value = tokenInput;
    }

    render(); // Re-render on input change
});

clearInputButton.addEventListener('click', () => {
    tokenInput = "";
    tokenInputElem.value = ""; // Clear the actual input field
    render(); // Re-render
    tokenInputElem.focus(); // Put focus back on the input
});


toggleSettingsButton.addEventListener('click', () => {
    showSettings = !showSettings; // Toggle state
    render(); // Re-render
});

ratioSliderElem.addEventListener('input', (event) => {
    tokensPerWordRatio = parseFloat(event.target.value); // Update state
    render(); // Re-render to update displayed ratio and results
});

resetRatioButton.addEventListener('click', () => {
    tokensPerWordRatio = 1.33; // Reset state
    render(); // Re-render
});

toggleTipsButton.addEventListener('click', () => {
    showTips = !showTips; // Toggle state
    render(); // Re-render
});

languageToggleButton.addEventListener('click', () => {
    toggleLanguage(); // Toggle language and re-render
});


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language based on browser preference (optional, but good practice)
    const browserLanguage = navigator.language.split('-')[0]; // Get base language code
    if (localization[browserLanguage]) {
        currentLanguage = browserLanguage;
    } else {
        currentLanguage = 'en'; // Fallback to English
    }

    updateUIWithLocalization(); // Set initial localized text
    render(); // Initial render to set up the UI based on default state
});