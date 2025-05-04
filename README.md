# Token Calculator PWA

A Progressive Web App (PWA) for calculating estimated word, page, and character counts from a given number of tokens. Useful for working with large language models or content creation based on token limits.

## Features

* **Token to Word/Page/Character Conversion:** Quickly convert token counts based on adjustable ratios.
* **Configurable Ratio:** Easily change the token-to-word conversion ratio using a slider.
* **Ratio Explanation:** Understand how the ratio affects the conversion.
* **Reset to Default:** Quickly revert the ratio to the standard value (1.33).
* **Localization:** Supports English (EN 🇬🇧) and Slovak (SK 🇸🇰) languages with easy toggling.
* **Manual Theme Toggle:** Switch between Light, Dark, and System themes manually, overriding system preferences.
* **Helpful Tips:** Access useful information about tokens, words, and standard page counts.
* **Responsive Design:** Optimized layout for various screen sizes (mobile, tablet, desktop).
* **Progressive Web App (PWA):** Installable on devices, works offline (basic caching).

## Demo

[Provide a link to a live demo of your PWA here, if hosted.]

## Screenshot

![Screenshot of the Token Calculator PWA](image_3658f4.png)

## Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Progressive Web App (Web App Manifest, Service Worker)

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[Your-GitHub-Username]/[your-repo-name].git
    cd [your-repo-name]
    ```
2.  **Serve the files:** PWAs, especially those with Service Workers, need to be served over HTTP(S). You can use a simple local web server for testing.
    * **Using Python:** If you have Python installed, run `python -m http.server` in the project directory.
    * **Using Node.js:** If you have Node.js installed, you can use `npx serve` (install with `npm install -g serve` if needed).
    * **Other Options:** Many IDEs (like VS Code with extensions) or tools provide built-in web servers.
3.  **Open in browser:** Navigate to the address provided by your local server (e.g., `http://localhost:8000`).

## Usage

1.  Enter the number of tokens in the input field.
2.  The estimated Word Count, Page Count, and Character Count will be displayed below.
3.  Tap "Conversion Settings" to adjust the token-to-word ratio using the slider or reset it to the default (1.33).
4.  Tap the language button (🇬🇧 EN / 🇸🇰 SK) in the header to switch languages.
5.  Tap the theme icon (☀️/🌙/⚙️) in the header to cycle through Light, Dark, and System themes.
6.  Tap "Show Tips" to view helpful information.

## Localization

The application supports the following languages:

* English (EN)
* Slovak (SK)

## Contributing

Contributions are welcome! If you have suggestions for improvements or find bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

AdaptToAIera