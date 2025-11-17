document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const quoteText = document.querySelector('.quote-text');
    const authorName = document.querySelector('.author-name');
    const generateBtn = document.querySelector('.generate-btn');

    // API Endpoint
    const apiUrl = 'https://api.quotable.io/random?tags=love';

    // Fallback quotes in case the API fails
    const fallbackQuotes = [
        { content: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known—and even that is an understatement.", author: "F. Scott Fitzgerald" },
        { content: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
        { content: "To be your friend was all I ever wanted; to be your lover was all I ever dreamed.", author: "Valerie Lombardo" },
        { content: "My heart is and always will be yours.", author: "Jane Austen" }
    ];

    // Displays a quote with a fade animation
    const displayQuote = (quote) => {
        // Fade out old quote
        quoteText.style.opacity = 0;
        authorName.style.opacity = 0;

        // Fade in new quote after a short delay
        setTimeout(() => {
            quoteText.textContent = `"${quote.content}"`;
            authorName.textContent = `- ${quote.author}`;
            quoteText.style.opacity = 1;
            authorName.style.opacity = 1;
            spawnHeart();
        }, 500);
    };

    // Fetches a new quote from the API
    const fetchQuote = async () => {
        // Show loading state
        quoteText.textContent = 'Loading...';
        authorName.textContent = '';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('API Error: Failed to fetch quote');
            }
            const data = await response.json();
            displayQuote(data);
        } catch (error) {
            console.error(error); // Log the actual error for debugging
            // Use a fallback quote if the API fails
            const fallbackQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            displayQuote(fallbackQuote);
        }
    };

    // Spawns a floating heart animation
    const spawnHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        document.body.appendChild(heart);

        // Randomize horizontal position and animation duration
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;

        // Remove the heart after the animation is complete
        setTimeout(() => {
            heart.remove();
        }, 5000);
    };

    // Event Listener for the generate button
    generateBtn.addEventListener('click', fetchQuote);

    // Fetch initial quote on page load
    fetchQuote();
});
