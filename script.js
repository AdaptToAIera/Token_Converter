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
        tip4: "• Average word length is 5-6 characters",
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
    document.getElementById('app-title').innerText = loc('appTitle'); // For <title> tag
    document.getElementById('app-title-header').innerText = loc('appTitle'); // For header <h1>
    document.getElementById('token-count-label').innerText = loc('tokenCount');
    document.getElementById('token-input').placeholder = loc('enterPositiveNumber');
    document.getElementById('input-validation-message').innerText = loc('invalidInput');
    document.getElementById('settings-title').innerText = loc('settingsTitle');
    document.getElementById('explanation-title').innerText = loc('explanationTitle');
    document.getElementById('standard-ratio').innerText = loc('standardRatio');
    document.getElementById('lower-value').innerText = loc('lowerValue');
    document.getElementById('higher-value').innerText = loc('higherValue');
    document.getElementById('reset-default-text').innerText = loc('resetDefault');
    document.getElementById('word-count-title').innerText = loc('wordCount');
    document.getElementById('page-count-title').innerText = loc('pageCount');
    document.getElementById('char-count-title').innerText = loc('charCount');
    document.getElementById('tips-title').innerText = loc('tipsTitle');
    document.getElementById('tip1').innerText = loc('tip1');
    document.getElementById('tip2').innerText = loc('tip2');
    document.getElementById('tip3').innerText = loc('tip3');
    document.getElementById('tip4').innerText = loc('tip4');
    document.getElementById('tip5').innerText = loc('tip5');

    // Update language button
    document.getElementById('lang-flag').innerText = languageFlags[currentLanguage];
    document.getElementById('lang-code').innerText = languageShortCodes[currentLanguage];

    // Update show/hide tips text based on current state (handled in render)
}


// --- Token Calculator Logic ---
const TokenCalculator = {
    tokensPerWord: 1.33,
    wordsPerPage: 250,
    charsPerWord: 5, // Average chars per word

    calculateWords: function(tokens) {
        const tokensNum = parseInt(tokens, 10);
        if (tokensNum <= 0 || isNaN(tokensNum)) return 0;
        return Math.floor(tokensNum / this.tokensPerWord);
    },

    calculatePages: function(words) {
         const wordsNum = parseInt(words, 10);
        if (wordsNum <= 0 || isNaN(wordsNum)) return 0;
        return Math.floor(wordsNum / this.wordsPerPage);
    },

    calculateCharacters: function(words) {
         const wordsNum = parseInt(words, 10);
         if (wordsNum <= 0 || isNaN(wordsNum)) return 0;
        return Math.floor(wordsNum * this.charsPerWord);
    },

    formatNumber: function(number) {
        return number.toLocaleString();
    }
};

// --- State Variables (replaces @State) ---
let tokenInput = "";
let showSettings = false;
let showTips = false;
let tokensPerWordRatio = 1.33; // Initial value
let themePreference = 'system'; // 'system', 'light', 'dark'

// --- DOM References ---
const htmlElement = document.documentElement; // Reference to the <html> tag
const themeColorMeta = document.getElementById('theme-color-meta'); // Reference to theme color meta tag
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
const wordCountValueElem = document.getElementById('word-count-value'); // Note: These IDs are based on your original code, ensure they match HTML
const pageCountValueElem = document.getElementById('page-count-value');
const charCountValueElem = document.getElementById('char-count-value');
const toggleTipsButton = document.getElementById('toggle-tips');
const showHideTipsTextElem = document.getElementById('show-hide-tips-text');
const tipsChevronElem = document.getElementById('tips-chevron');
const tipsContentElem = document.getElementById('tips-content');
const languageToggleButton = document.getElementById('language-toggle');
const themeToggleButton = document.getElementById('theme-toggle'); // New reference for theme toggle button

// --- Theme Icons (SVG paths) ---
const themeIcons = {
    light: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.528 1.714a.75.75 0 0 1 .472 1.09A7.468 7.468 0 0 0 7.5 7.5a3 3 0 0 1 5.991.071A7.468 7.468 0 0 0 16.5 7.5c.41 0 .814.02 1.215.06A.75.75 0 1 1 18.107 2.8a7.5 7.5 0 0 1 4.194 5.109 12 12 0 0 0-8.201-8.201Zm4.997 15.787a.75.75 0 0 1-.05-.109 15.307 15.307 0 0 1-1.002-1.973.75.75 0 0 1 1.45-.544 13.807 13.807 0 0 0 1.01 1.993.75.75 0 0 1-.408.91Z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM18.205 22.852a.75.75 0 0 1-.324-.303 15.307 15.307 0 0 1-1.002-1.973.75.75 0 0 1 1.45-.544 13.807 13.807 0 0 0 1.01 1.993.75.75 0 0 1-.408.91ZM5.795 22.852a.75.75 0 0 1-.408-.91 13.807 13.807 0 0 0 1.01-1.993.75.75 0 0 1 1.45.544 15.307 15.307 0 0 1-1.002 1.973.75.75 0 0 1-.324.303Z" clip-rule="evenodd" /></svg>', // Moon
    dark: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.528 1.714a.75.75 0 0 1 .472 1.09A7.468 7.468 0 0 0 7.5 7.5a3 3 0 0 1 5.991.071A7.468 7.468 0 0 0 16.5 7.5c.41 0 .814.02 1.215.06A.75.75 0 1 1 18.107 2.8a7.5 7.5 0 0 1 4.194 5.109 12 12 0 0 0-8.201-8.201Zm4.997 15.787a.75.75 0 0 1-.05-.109 15.307 15.307 0 0 1-1.002-1.973.75.75 0 0 1 1.45-.544 13.807 13.807 0 0 0 1.01 1.993.75.75 0 0 1-.408.91Z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM18.205 22.852a.75.75 0 0 1-.324-.303 15.307 15.307 0 0 1-1.002-1.973.75.75 0 0 1 1.45.544 13.807 13.807 0 0 0 1.01 1.993.75.75 0 0 1-.408.91ZM5.795 22.852a.75.75 0 0 1-.408-.91 13.807 13.807 0 0 0 1.01-1.993.75.75 0 0 1 1.45.544 15.307 15.307 0 0 1-1.002 1.973.75.75 0 0 1-.324.303Z" clip-rule="evenodd" /></svg>', // Sun
    system: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1-.75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.185a.75.75 0 0 0-1.06-.05L15.459 8.11a.75.75 0 0 0 .915 1.17L18.894 7.24a.75.75 0 0 0-.05-1.055ZM4.293 4.293a.75.75 0 0 0-1.06 1.06l1.77 1.77a.75.75 0 0 0 1.06-1.06L4.293 4.293ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75ZM5.11 15.459a.75.75 0 0 0-.915 1.17l1.77 1.77a.75.75 0 1 0 1.06-1.06l-1.77-1.77ZM18.894 17.915a.75.75 0 0 0 .05-1.06l-1.77-1.77a.75.75 0 0 0-1.06 1.06l1.77 1.77a.75.75 0 0 0 1.01-.009Z"/></svg>' // System (Sun with lines)
};

const themeColorsMeta = {
     light: '#f2f2f7',
     dark: '#1c1c1e',
     system: '#f2f2f7' // Default, will be overridden by media query
};


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
    TokenCalculator.tokensPerWord = tokensPerWordRatio;
    const wordCount = TokenCalculator.calculateWords(tokens);
    const pageCount = TokenCalculator.calculatePages(wordCount);
    const charCount = TokenCalculator.calculateCharacters(wordCount);
    return { wordCount, pageCount, charCount };
}

function updateResultsDisplay() {
     if (isInputValid()) {
         const results = calculateResults();
         // Update values based on reordered results
         pageCountValueElem.innerText = TokenCalculator.formatNumber(results.pageCount);
         wordCountValueElem.innerText = TokenCalculator.formatNumber(results.wordCount);
         charCountValueElem.innerText = TokenCalculator.formatNumber(results.charCount);
         resultsSectionElem.classList.remove('hidden');
     } else {
         // Hide results or show default 0s
         pageCountValueElem.innerText = TokenCalculator.formatNumber(0);
         wordCountValueElem.innerText = TokenCalculator.formatNumber(0);
         charCountValueElem.innerText = TokenCalculator.formatNumber(0);
         // Optional: resultsSectionElem.classList.add('hidden');
     }
}

// --- Theme Management ---
function applyTheme(theme) {
    themePreference = theme;
    localStorage.setItem('themePreference', themePreference); // Save preference

    // Remove existing theme attributes
    htmlElement.removeAttribute('data-theme');

    // Apply selected theme or let system media query take over
    if (themePreference !== 'system') {
        htmlElement.setAttribute('data-theme', themePreference);
        themeColorMeta.content = themeColorsMeta[themePreference];
    } else {
         // Reset theme color to system default (light) and let media query handle dark
         themeColorMeta.content = themeColorsMeta['system'];
    }

    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    const iconButton = themeToggleButton;
    const currentIcon = iconButton.querySelector('.icon'); // Find existing icon

    // Remove existing icon SVG
    if (currentIcon) {
        currentIcon.remove();
    }

    let newIconSVG = '';
    let ariaLabel = '';

    // Determine which icon to show based on *current active theme*
    // This requires checking the actual computed style or data-theme attribute
    const activeTheme = htmlElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (activeTheme === 'dark') {
        newIconSVG = themeIcons.dark; // Show Sun icon in Dark mode
        ariaLabel = loc('switchToLight'); // Need to add these localization keys
    } else { // Active theme is light
         newIconSVG = themeIcons.light; // Show Moon icon in Light mode
         ariaLabel = loc('switchToDark'); // Need to add these localization keys
    }

    // However, the *next* click will cycle the *preference*, not the active theme directly
    // So the icon should perhaps indicate the *next* preference?
    // Let's simplify: The icon indicates the current *preference* state.

    switch (themePreference) {
        case 'light':
            newIconSVG = themeIcons.light; // Show Moon icon
            ariaLabel = loc('switchToDark'); // Next is dark
            break;
        case 'dark':
            newIconSVG = themeIcons.dark; // Show Sun icon
            ariaLabel = loc('switchToSystem'); // Next is system
            break;
        case 'system':
        default:
             newIconSVG = themeIcons.system; // Show System icon
             ariaLabel = loc('switchToLight'); // Next is light
            break;
    }

    // Insert the new icon SVG
    iconButton.innerHTML = newIconSVG;
    iconButton.setAttribute('aria-label', ariaLabel); // Update aria label

}


// --- Render Function (Updates the UI based on state) ---
function render() {
    // Update Input and Validation
    tokenInputElem.value = tokenInput;
    const isValid = isInputValid();
    const inputContainer = tokenInputElem.closest('.input-container'); // Get the parent container

    if (!isValid && tokenInput !== "") {
        inputValidationMessageElem.classList.remove('hidden');
        inputContainer.classList.add('invalid'); // Apply invalid class to container
    } else {
        inputValidationMessageElem.classList.add('hidden');
        inputContainer.classList.remove('invalid');
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

    // Language localization update is handled by updateUIWithLocalization(), called separately or on load
    // Theme toggle icon update is handled by updateThemeToggleIcon(), called separately or on theme change
}


// --- Event Listeners ---
tokenInputElem.addEventListener('input', (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    if (value.startsWith('0') && value.length > 1) {
        value = parseInt(value, 10).toString();
    }
    // Allow empty string, but not '0' as a positive number
    if (value === '0') value = '';
    tokenInput = value;

    if (event.target.value !== tokenInput) {
        event.target.value = tokenInput;
    }

    render();
});

clearInputButton.addEventListener('click', () => {
    tokenInput = "";
    tokenInputElem.value = "";
    render();
    tokenInputElem.focus();
});


toggleSettingsButton.addEventListener('click', () => {
    showSettings = !showSettings;
    render();
});

ratioSliderElem.addEventListener('input', (event) => {
    tokensPerWordRatio = parseFloat(event.target.value);
    render();
});

resetRatioButton.addEventListener('click', () => {
    tokensPerWordRatio = 1.33;
    render();
});

toggleTipsButton.addEventListener('click', () => {
    showTips = !showTips;
    render();
});

languageToggleButton.addEventListener('click', () => {
    toggleLanguage();
});

themeToggleButton.addEventListener('click', () => {
    // Cycle through themes: system -> light -> dark -> system
    switch (themePreference) {
        case 'system':
            applyTheme('light');
            break;
        case 'light':
            applyTheme('dark');
            break;
        case 'dark':
        default: // Fallback just in case
            applyTheme('system');
            break;
    }
    // applyTheme also calls updateThemeToggleIcon
    // render() is not strictly necessary here as theme changes are handled by CSS variables
});

// Listen for changes in system theme preference
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
systemThemeQuery.addEventListener('change', (event) => {
    // If user is currently using system preference, update theme meta tag
    if (themePreference === 'system') {
        // The CSS media query handles the visual theme,
        // but we might want to update the theme-color meta tag.
        // This is slightly tricky as we need to know the *actual* resolved theme.
        // A simple approach is to just re-apply 'system' theme preference
        applyTheme('system');
    }
    // render() is not needed here as CSS variables handle the visual change
    // if themePreference is 'system'
});


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language based on browser preference or saved state (if you implement saving language)
    const browserLanguage = navigator.language.split('-')[0];
    if (localization[browserLanguage]) {
        currentLanguage = browserLanguage;
    } else {
        currentLanguage = 'en'; // Fallback
    }

    // Load theme preference from local storage
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        applyTheme(savedTheme);
    } else {
        applyTheme('system'); // Default to system
    }

    updateUIWithLocalization(); // Set initial localized text
    render(); // Initial render to set up the UI based on default state and loaded preference

     // Update theme toggle icon initially
     updateThemeToggleIcon();

});