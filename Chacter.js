      // DOM elements
        const textInput = document.getElementById('textInput');
        const charCount = document.getElementById('charCount');
        const charNoSpacesCount = document.getElementById('charNoSpacesCount');
        const charWithSpacesCount = document.getElementById('charWithSpacesCount');
        const wordCount = document.getElementById('wordCount');
        const sentenceCount = document.getElementById('sentenceCount');
        const paragraphCount = document.getElementById('paragraphCount');
        const readingTime = document.getElementById('readingTime');
        const speakingTime = document.getElementById('speakingTime');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const limitText = document.getElementById('limitText');
        const resetBtn = document.getElementById('resetBtn');
        const limitButtons = document.querySelectorAll('.limit-btn');
        
        // Default character limit
        let charLimit = 500;
        
        // Initialize with default text
        updateStats();
        
        // Event listeners
        textInput.addEventListener('input', updateStats);
        resetBtn.addEventListener('click', resetText);
        
        // Limit buttons
        limitButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                limitButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Update character limit
                charLimit = parseInt(this.getAttribute('data-limit'));
                // Update stats to reflect new limit
                updateStats();
            });
        });
        
        // Update all statistics
        function updateStats() {
            const text = textInput.value;
            
            // Character counts
            const charsWithSpaces = text.length;
            const charsNoSpaces = text.replace(/\s/g, '').length;
            
            // Word count (split by whitespace and filter out empty strings)
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            const wordCountValue = text.trim() === '' ? 0 : words.length;
            
            // Sentence count (split by . ! ?)
            const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
            const sentenceCountValue = sentences.length;
            
            // Paragraph count (split by newlines)
            const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);
            const paragraphCountValue = paragraphs.length;
            
            // Reading time (average reading speed: 200-250 words per minute)
            const readingTimeValue = Math.ceil(wordCountValue / 200);
            
            // Speaking time (average speaking speed: 130-150 words per minute)
            const speakingTimeValue = Math.ceil(wordCountValue / 130);
            
            // Update DOM elements
            charCount.textContent = charsWithSpaces;
            charNoSpacesCount.textContent = charsNoSpaces;
            charWithSpacesCount.textContent = charsWithSpaces;
            wordCount.textContent = wordCountValue;
            sentenceCount.textContent = sentenceCountValue;
            paragraphCount.textContent = paragraphCountValue;
            readingTime.textContent = `${readingTimeValue} min`;
            speakingTime.textContent = `${speakingTimeValue} min`;
            
            // Update progress bar and limit info
            updateLimitInfo(charsWithSpaces);
        }
        
        // Update progress bar and limit information
        function updateLimitInfo(charsWithSpaces) {
            // Update limit text
            limitText.textContent = charLimit === 0 ? "No limit set" : `Limit: ${charLimit} characters`;
            
            // If no limit is set, hide progress bar
            if (charLimit === 0) {
                progressFill.style.width = "0%";
                progressText.textContent = "No limit";
                progressText.className = "";
                return;
            }
            
            // Calculate percentage
            const percentage = Math.min((charsWithSpaces / charLimit) * 100, 100);
            
            // Update progress bar
            progressFill.style.width = `${percentage}%`;
            
            // Update progress text and color based on percentage
            let progressClass = "";
            if (percentage >= 90) {
                progressClass = "danger";
                progressFill.style.background = "linear-gradient(to right, #ff416c, #ff4b2b)";
            } else if (percentage >= 75) {
                progressClass = "warning";
                progressFill.style.background = "linear-gradient(to right, #ff9500, #ffcc00)";
            } else {
                progressFill.style.background = "linear-gradient(to right, #4cd964, #5ac8fa)";
            }
            
            progressText.textContent = `${percentage.toFixed(1)}% used (${charsWithSpaces}/${charLimit})`;
            progressText.className = progressClass;
            
            // Change textarea border color if approaching or exceeding limit
            if (percentage >= 100) {
                textInput.style.borderColor = "#ff3b30";
                textInput.style.boxShadow = "0 0 0 3px rgba(255, 59, 48, 0.1)";
            } else if (percentage >= 75) {
                textInput.style.borderColor = "#ff9500";
                textInput.style.boxShadow = "0 0 0 3px rgba(255, 149, 0, 0.1)";
            } else {
                textInput.style.borderColor = "#6a11cb";
                textInput.style.boxShadow = "0 0 0 3px rgba(106, 17, 203, 0.1)";
            }
        }
        
        // Reset text to default
        function resetText() {
            textInput.value = "Hello! This is a character counter demo. As you type, you'll see real-time statistics about your text including character count, word count, and more. Try it out by typing, pasting, or editing this text.";
            updateStats();
            
            // Add a little animation to reset button
            resetBtn.innerHTML = '<i class="fas fa-check"></i> Text Reset!';
            setTimeout(() => {
                resetBtn.innerHTML = '<i class="fas fa-redo"></i> Reset Text';
            }, 1500);
        }