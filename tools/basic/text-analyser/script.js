// Text Analysis Functions
class TextAnalyzer {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
    }

    initializeElements() {
        // Stat elements
        this.charCount = document.getElementById('charCount');
        this.charNoSpaces = document.getElementById('charNoSpaces');
        this.wordCount = document.getElementById('wordCount');
        this.readingTime = document.getElementById('readingTime');
        this.paragraphCount = document.getElementById('paragraphCount');
        this.sentenceCount = document.getElementById('sentenceCount');
        this.avgWordsPerSentence = document.getElementById('avgWordsPerSentence');
        this.speakingTime = document.getElementById('speakingTime');

        // Action buttons
        this.clearBtn = document.getElementById('clearBtn');
        this.copyBtn = document.getElementById('copyBtn');

        // Tool buttons
        this.uppercaseBtn = document.getElementById('uppercaseBtn');
        this.lowercaseBtn = document.getElementById('lowercaseBtn');
        this.capitalizeBtn = document.getElementById('capitalizeBtn');
        this.reverseBtn = document.getElementById('reverseBtn');
    }

    bindEvents() {
        // Text input events
        this.textInput.addEventListener('input', () => this.updateStats());
        this.textInput.addEventListener('paste', () => {
            setTimeout(() => this.updateStats(), 10);
        });

        // Action button events
        this.clearBtn.addEventListener('click', () => this.clearText());
        this.copyBtn.addEventListener('click', () => this.copyText());

        // Tool button events
        this.uppercaseBtn.addEventListener('click', () => this.transformText('uppercase'));
        this.lowercaseBtn.addEventListener('click', () => this.transformText('lowercase'));
        this.capitalizeBtn.addEventListener('click', () => this.transformText('capitalize'));
        this.reverseBtn.addEventListener('click', () => this.transformText('reverse'));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    // Core analysis functions
    countCharacters(text) {
        return text.length;
    }

    countCharactersNoSpaces(text) {
        return text.replace(/\s/g, '').length;
    }

    countWords(text) {
        if (text.trim() === '') return 0;
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    countParagraphs(text) {
        if (text.trim() === '') return 0;
        return text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    }

    countSentences(text) {
        if (text.trim() === '') return 0;
        // Match sentences ending with . ! ? followed by space or end of string
        const sentences = text.match(/[.!?]+(?:\s|$)/g);
        return sentences ? sentences.length : 0;
    }

    calculateReadingTime(wordCount) {
        // Average reading speed: 200-250 words per minute
        const wordsPerMinute = 225;
        const minutes = wordCount / wordsPerMinute;
        return Math.ceil(minutes);
    }

    calculateSpeakingTime(wordCount) {
        // Average speaking speed: 150-160 words per minute
        const wordsPerMinute = 155;
        const minutes = wordCount / wordsPerMinute;
        return Math.ceil(minutes);
    }

    calculateAverageWordsPerSentence(wordCount, sentenceCount) {
        if (sentenceCount === 0) return 0;
        return Math.round((wordCount / sentenceCount) * 10) / 10;
    }

    // Main update function
    updateStats() {
        const text = this.textInput.value;
        
        // Basic counts
        const charCount = this.countCharacters(text);
        const charNoSpaces = this.countCharactersNoSpaces(text);
        const wordCount = this.countWords(text);
        const paragraphCount = this.countParagraphs(text);
        const sentenceCount = this.countSentences(text);
        
        // Calculated values
        const readingTime = this.calculateReadingTime(wordCount);
        const speakingTime = this.calculateSpeakingTime(wordCount);
        const avgWordsPerSentence = this.calculateAverageWordsPerSentence(wordCount, sentenceCount);

        // Update UI with animation
        this.animateCounterUpdate(this.charCount, charCount);
        this.animateCounterUpdate(this.charNoSpaces, charNoSpaces);
        this.animateCounterUpdate(this.wordCount, wordCount);
        this.animateCounterUpdate(this.readingTime, readingTime);
        this.animateCounterUpdate(this.paragraphCount, paragraphCount);
        this.animateCounterUpdate(this.sentenceCount, sentenceCount);
        this.animateCounterUpdate(this.avgWordsPerSentence, avgWordsPerSentence);
        
        // Speaking time with unit
        this.speakingTime.textContent = `${speakingTime} min`;
    }

    // Animation for counter updates
    animateCounterUpdate(element, newValue) {
        const currentValue = parseInt(element.textContent) || 0;
        
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'transform 0.2s ease-out';
            
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
            }, 100);
        }
    }

    // Action functions
    clearText() {
        this.textInput.value = '';
        this.textInput.focus();
        this.updateStats();
        this.showFeedback('Text cleared!', 'success');
    }

    async copyText() {
        const text = this.textInput.value;
        
        if (!text.trim()) {
            this.showFeedback('No text to copy!', 'warning');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            this.showFeedback('Text copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            this.textInput.select();
            document.execCommand('copy');
            this.showFeedback('Text copied!', 'success');
        }
    }

    // Text transformation functions
    transformText(type) {
        const text = this.textInput.value;
        
        if (!text.trim()) {
            this.showFeedback('No text to transform!', 'warning');
            return;
        }

        let transformedText = '';

        switch (type) {
            case 'uppercase':
                transformedText = text.toUpperCase();
                break;
            case 'lowercase':
                transformedText = text.toLowerCase();
                break;
            case 'capitalize':
                transformedText = this.capitalizeWords(text);
                break;
            case 'reverse':
                transformedText = text.split('').reverse().join('');
                break;
            default:
                return;
        }

        this.textInput.value = transformedText;
        this.updateStats();
        this.showFeedback(`Text transformed to ${type}!`, 'success');
    }

    capitalizeWords(text) {
        return text.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Feedback system
    showFeedback(message, type = 'info') {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        // Create feedback element
        const feedback = document.createElement('div');
        feedback.classList.add('feedback-message', `feedback-${type}`);
        feedback.textContent = message;
        
        // Style the feedback
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            font-size: 14px;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        // Set color based on type
        const colors = {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#6366f1'
        };
        feedback.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM and animate
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 10);

        // Remove after delay
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.remove();
                }
            }, 300);
        }, 3000);
    }

    // Keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'k':
                    e.preventDefault();
                    this.clearText();
                    break;
                case 'enter':
                    e.preventDefault();
                    this.copyText();
                    break;
            }
        }
        
        // Alt + shortcuts for text transformations
        if (e.altKey) {
            switch (e.key.toLowerCase()) {
                case 'u':
                    e.preventDefault();
                    this.transformText('uppercase');
                    break;
                case 'l':
                    e.preventDefault();
                    this.transformText('lowercase');
                    break;
                case 'c':
                    e.preventDefault();
                    this.transformText('capitalize');
                    break;
                case 'r':
                    e.preventDefault();
                    this.transformText('reverse');
                    break;
            }
        }
    }
}

// Utility functions for additional features
class TextUtils {
    static getWordFrequency(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g);
        if (!words) return {};
        
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        
        return frequency;
    }

    static getMostCommonWords(text, limit = 5) {
        const frequency = this.getWordFrequency(text);
        return Object.entries(frequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit);
    }

    static getTextComplexity(text) {
        const wordCount = text.trim().split(/\s+/).length;
        const sentenceCount = (text.match(/[.!?]+/g) || []).length;
        const avgWordsPerSentence = wordCount / sentenceCount || 0;
        
        // Simple complexity score based on sentence length
        if (avgWordsPerSentence <= 10) return 'Simple';
        if (avgWordsPerSentence <= 20) return 'Moderate';
        return 'Complex';
    }

    static estimateGradeLevel(text) {
        const words = text.trim().split(/\s+/).length;
        const sentences = (text.match(/[.!?]+/g) || []).length;
        const syllables = this.countSyllables(text);
        
        if (sentences === 0 || words === 0) return 0;
        
        // Flesch-Kincaid Grade Level formula
        const score = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
        return Math.max(0, Math.round(score * 10) / 10);
    }

    static countSyllables(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        return words.reduce((total, word) => {
            // Simple syllable counting algorithm
            const syllables = word.match(/[aeiouy]+/g) || [];
            return total + Math.max(1, syllables.length);
        }, 0);
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            updateCount: 0,
            averageUpdateTime: 0,
            totalUpdateTime: 0
        };
    }

    startTiming() {
        this.startTime = performance.now();
    }

    endTiming() {
        if (!this.startTime) return;
        
        const duration = performance.now() - this.startTime;
        this.metrics.updateCount++;
        this.metrics.totalUpdateTime += duration;
        this.metrics.averageUpdateTime = this.metrics.totalUpdateTime / this.metrics.updateCount;
        
        // Log performance in development
        if (duration > 10) {
            console.warn(`Slow update detected: ${duration.toFixed(2)}ms`);
        }
    }

    getMetrics() {
        return { ...this.metrics };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const analyzer = new TextAnalyzer();
    const performanceMonitor = new PerformanceMonitor();
    
    // Add performance monitoring to updates
    const originalUpdateStats = analyzer.updateStats;
    analyzer.updateStats = function() {
        performanceMonitor.startTiming();
        originalUpdateStats.call(this);
        performanceMonitor.endTiming();
    };
    
    // Expose utilities globally for potential extensions
    window.TextAnalyzer = TextAnalyzer;
    window.TextUtils = TextUtils;
    window.performanceMonitor = performanceMonitor;
    
    console.log('Text Analyzer initialized successfully!');
});