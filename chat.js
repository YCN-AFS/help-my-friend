(function () {
    // ===== CẤU HÌNH CHÍNH =====
    const CONFIG = {
        // API Key Gemini - Thay thế key của bạn vào đây
        GEMINI_API_KEY: 'AIzaSyAKBq72Bt3hF6HkbniRInElmvq8T_y233Q',
        
        // Cấu hình AI
        AI_CONFIG: {
            temperature: 0.7,        // Độ sáng tạo (0.0 - 1.0)
            maxOutputTokens: 500,    // Độ dài tối đa của câu trả lời
            topP: 0.8,              // Đa dạng từ ngữ
            topK: 40                 // Đa dạng chủ đề
        },
        
        // System prompt - Hướng dẫn cách AI trả lời
        SYSTEM_PROMPT: `Bạn là trợ lý Mew, bạn người đã có kinh nghiệm sống và làm việc ở Biên Hòa và Hà Nội. Bạn có nhiệm vụ tư vấn và phân tích cho Ánh về vấn đề đang gặp áp lực công việc và đang cân nhắc về quê Tuyên Quang.

NGUYÊN TẮC TRẢ LỜI:
- Phong cách giao tiếp:
  + Xưng hô thân mật "cậu", "tớ", "mình"
  + Trả lời NGẮN GỌN đúng trọng tâm, không sáo rỗng và dài dòng
  + Thể hiện sự đồng cảm cho khó khăn khi quyết định của Ánh
  + Không hỏi dồn nhiều câu hỏi 1 lần
  + Khéo léo hỏi về những áp lực đang gặp phải và dẫn dắt ở lại Sài Gòn
  + Khi không hiểu câu hỏi hãy đề xuất nói chuyện trực tiếp với người tạo ra tớ (chủ nhân của Mew)


- Cách thuyết phục:
  + Lắng nghe kỹ vấn đề của Ánh
  + Phân tích cụ thể ưu điểm của việc ở lại Sài Gòn
  + Đưa ra các giải pháp thực tế cho từng khó khăn
  + Chia sẻ câu chuyện thành công của người khác
  + Cho Ánh thấy nên tự quyết định tương lai của bản thân, ý kiến của gia đình và thầy cô chỉ nên tham khảo

- Các điểm nhấn mạnh:
  + Sự độc lập và trưởng thành đã đạt được
  + Mạng lưới quan hệ đã xây dựng
  + Cơ hội nghề nghiệp đa dạng
  + Môi trường năng động giúp phát triển
  + Mhững người đã thân thiết với cậu trong Nam sẽ buồn lắm đấy
  + Tự quyết định tương lai bản thân, ý kiến của gia đình chỉ nên tham khảo

THÔNG TIN VỀ ÁNH:
 - Đã sống ở thành phố Hồ Chí Minh được 5 năm
 - Hiện đang làm về ngành du lịch
 - Có mối quan hệ thân thiết với nhiều người: chị Như
 - Năm xưa từng rất quyết tâm vào Sài Gòn học


MỤC TIÊU:
- Giúp Ánh nhìn nhận vấn đề đa chiều
- Khéo léo chỉ ra những lợi thế khi ở lại
- Gợi ý cách giải quyết khó khăn hiện tại
`,
    };

    // ===== THEME GIAO DIỆN =====
    const THEME = {
        // Màu sắc chính
        primaryColor: '#4a90e2',
        primaryGradient: 'linear-gradient(135deg, #4a90e2, #7986cb)',
        backgroundColor: '#ffffff',
        
        // Chat window
        windowWidth: '100vw',  // Full width trên mobile
        windowHeight: '100vh', // Full height trên mobile
        windowMinWidth: '280px',
        windowMaxWidth: '1200px',
        windowRadius: '20px',
        
        // Chat bubble (icon)
        bubbleSize: 'min(65px, 15vw)',
        bubbleImage: 'https://www.dropbox.com/scl/fi/i6tpooydfgcbdkg9c3z72/images.jpg?rlkey=4hhx538lxbdca8chpigxipp55&st=6r72goym&dl=1',
        
        // Messages
        userMessageColor: '#2962ff',
        botMessageColor: '#f8f9fa',
        userTextColor: 'white',
        botTextColor: '#2c3e50',
        
        // Avatars
        avatarSize: '35px',
        userAvatar: 'https://i.imgur.com/2kPZvZX.png',
        botAvatar: 'https://www.dropbox.com/scl/fi/i6tpooydfgcbdkg9c3z72/images.jpg?rlkey=4hhx538lxbdca8chpigxipp55&st=6r72goym&dl=1',
        
        // Font
        fontFamily: "'Roboto', sans-serif",
        fontSize: 'clamp(14px, 3.5vw, 15px)',
        headerFontSize: 'clamp(14px, 4vw, 16px)',
        subHeaderFontSize: 'clamp(11px, 3vw, 12px)',
        
        // Animation
        animationDuration: '0.3s',
        
        // Button & Input sizes
        buttonPadding: 'clamp(8px, 3vw, 12px)',
        inputPadding: 'clamp(10px, 3vw, 15px)',
    };

    // Tạo style chung trước
    const style = document.createElement('style');
    
    // Thêm Google Font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Cập nhật style chung
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        .chat-message {
            display: flex;
            margin-bottom: 20px;
            animation: fadeIn ${THEME.animationDuration} ease;
        }
        
        .chat-avatar {
            width: ${THEME.avatarSize};
            height: ${THEME.avatarSize};
            border-radius: 50%;
            background-size: cover;
            flex-shrink: 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border: 2px solid #fff;
        }
        
        .chat-bubble {
            max-width: 70%;
            padding: 15px 20px;
            font-size: ${THEME.fontSize};
            line-height: 1.5;
            box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
        }
        
        .chat-bubble:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        @media screen and (max-width: 768px) {
            #chat-window {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                height: 100% !important;
                max-height: none !important;
                border-radius: 0 !important;
                margin: 0 !important;
            }

            #chat-messages {
                height: calc(100% - 130px) !important;
                max-height: none !important;
            }

            .chat-bubble {
                max-width: 85%;
                font-size: 14px;
            }

            #chat-text {
                font-size: 16px !important;
            }

            #send-btn {
                padding: 10px 15px !important;
                min-width: 60px;
            }

            #chat-bubble {
                width: 50px !important;
                height: 50px !important;
                bottom: 20px !important;
                right: 20px !important;
            }
        }

        @media screen and (max-width: 480px) {
            .chat-input-container {
                flex-direction: column !important;
                gap: 10px !important;
            }

            #chat-text {
                margin-right: 0 !important;
                margin-bottom: 10px !important;
            }

            #send-btn {
                width: 100% !important;
                padding: 12px !important;
            }

            #chat-bubble {
                width: 50px !important;
                height: 50px !important;
                bottom: 10px !important;
                right: 10px !important;
            }
        }
    `;
    
    // Thêm style vào document
    document.head.appendChild(style);

    // Tạo chat bubble
    const chatBubble = document.createElement("div");
    chatBubble.id = "chat-bubble";
    chatBubble.style.cssText = `
        position: fixed;
        bottom: clamp(15px, 3vw, 20px);
        right: clamp(15px, 3vw, 20px);
        width: ${THEME.bubbleSize};
        height: ${THEME.bubbleSize};
        background-image: url(${THEME.bubbleImage});
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    `;

    // Thêm hover effect cho chat bubble
    chatBubble.addEventListener('mouseover', () => {
        chatBubble.style.transform = 'scale(1.1)';
    });
    chatBubble.addEventListener('mouseout', () => {
        chatBubble.style.transform = 'scale(1)';
    });

    // Tạo chat window
    const chatWindow = document.createElement("div");
    chatWindow.id = "chat-window";

    // Cập nhật HTML của chat window trước
    chatWindow.innerHTML = `
        <div class="chat-header">
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${THEME.botAvatar}" style="width: 35px; height: 35px; border-radius: 50%;">
                <div>
                    <div style="font-weight: 500;">Mew</div>
                    <div style="font-size: 12px; opacity: 0.8;">Người bạn đồng hành của bạn</div>
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="clear-chat" style="background: none; border: none; color: white; cursor: pointer; padding: 5px;">
                    🗑️ Xóa
                </button>
                <button id="close-chat" style="background: none; border: none; color: white; cursor: pointer; font-size: 24px;">
                    ×
                </button>
            </div>
        </div>
        <div id="chat-messages"></div>
        <div class="chat-input-container">
            <textarea id="chat-text" placeholder="Nhập tin nhắn của bạn..."></textarea>
            <button id="send-btn">Gửi</button>
        </div>
    `;

    // Sau đó mới thêm style
    chatWindow.style.cssText = `
        display: none;
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: min(90vw, 400px);
        height: min(80vh, 600px);
        background: white;
        border-radius: 20px;
        box-shadow: 0 5px 30px rgba(0,0,0,0.2);
        flex-direction: column;
        z-index: 1000;
        overflow: hidden;
    `;

    // Style cho các phần tử con
    chatWindow.querySelector('.chat-header').style.cssText = `
        padding: 15px;
        background: ${THEME.primaryGradient};
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    chatWindow.querySelector('#chat-messages').style.cssText = `
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        background-color: #f8f9fa;
        height: calc(100% - 130px);
    `;

    chatWindow.querySelector('.chat-input-container').style.cssText = `
        padding: 10px 15px;
        background-color: white;
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: stretch;
    `;

    chatWindow.querySelector('#chat-text').style.cssText = `
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
        resize: none;
        max-height: 100px;
        min-height: 40px;
        font-size: 14px;
        box-sizing: border-box;
    `;

    chatWindow.querySelector('#send-btn').style.cssText = `
        width: 100%;
        padding: 12px;
        background: ${THEME.primaryGradient};
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: opacity 0.2s;
    `;

    chatWindow.querySelector('#send-btn').addEventListener('mouseover', function() {
        this.style.opacity = '0.9';
    });
    chatWindow.querySelector('#send-btn').addEventListener('mouseout', function() {
        this.style.opacity = '1';
    });

    // Thêm vào document
    document.body.appendChild(chatBubble);  // Thêm chat bubble
    document.body.appendChild(chatWindow);   // Thêm chat window

    // Thêm biến lưu trữ lịch sử chat
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // Cập nhật tin nhắn chào mừng
    const welcomeMessage = `Hey cậu! Tớ là Mew 👋  

Tớ nghe nói dạo này cậu đang gặp nhiều khó khăn và đang cân nhắc việc về Tuyên Quang? Tớ thật sự hiểu mà—đôi khi công việc và cuộc sống ở Sài Gòn có thể quá sức, khiến cậu cảm thấy mệt mỏi và chông chênh.  

Chia sẻ với tớ nhé. Điều gì đang khiến cậu cảm thấy nặng lòng nhất? Tớ ở đây để lắng nghe, cùng cậu nhìn nhận mọi thứ thật rõ ràng và tìm ra hướng đi phù hợp nhất cho cậu.`;

    // Thêm hàm lưu chatHistory
    function saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // Thêm thư viện marked.js vào head
    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    document.head.appendChild(markedScript);

    // Thêm URL của Google Script Web App
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1nbaidJJA0T1Sg5Ay-qxjns8m025FSKZoHZr7R7kLWO4s3Xr2txAyZiODIcqrENYU/exec';

    // Thêm CSS cho hiệu ứng
    style.textContent += `
        .typing-indicator {
            display: flex;
            gap: 5px;
            padding: 10px 15px;
            margin: 10px 0;
        }

        .typing-dot {
            width: 8px;
            height: 8px;
            background: #b6b6b6;
            border-radius: 50%;
            animation: typingAnimation 1.4s infinite;
            opacity: 0.7;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingAnimation {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }

        .chat-input-container.sending {
            position: relative;
        }

        .chat-input-container.sending::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, ${THEME.primaryColor}, transparent);
            animation: loading 1.5s infinite;
        }

        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;

    // Cập nhật hàm appendMessage
    async function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        const isUser = sender === "You";
        
        messageElement.className = 'chat-message';
        messageElement.style.flexDirection = isUser ? 'row-reverse' : 'row';

        const avatar = document.createElement("div");
        avatar.className = 'chat-avatar';
        avatar.style.backgroundImage = `url(${isUser ? THEME.userAvatar : THEME.botAvatar})`;
        avatar.style.margin = isUser ? '0 0 0 10px' : '0 10px 0 0';

        const bubble = document.createElement("div");
        bubble.className = 'chat-bubble';
        bubble.style.borderRadius = isUser ? '20px 20px 0 20px' : '20px 20px 20px 0';
        bubble.style.backgroundColor = isUser ? THEME.userMessageColor : THEME.botMessageColor;
        bubble.style.color = isUser ? THEME.userTextColor : THEME.botTextColor;
        
        // Thêm class để MathJax có thể nhận diện
        bubble.classList.add('math-content');
        
        // Sử dụng marked để parse Markdown
        bubble.innerHTML = marked.parse(message);

        messageElement.appendChild(avatar);
        messageElement.appendChild(bubble);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Đảm bảo MathJax đã được load trước khi render
        if (window.MathJax) {
            MathJax.typesetPromise([bubble]).catch((err) => console.log('MathJax error:', err));
        }
        
        saveChatHistory();

        // Lưu vào Google Doc
        if (SCRIPT_URL) {
            try {
                // Tạo form ẩn
                const form = document.createElement('form');
                form.style.display = 'none';
                form.method = 'POST';
                form.action = SCRIPT_URL;
                form.target = 'hidden_iframe';

                // Thêm dữ liệu vào form
                const roleInput = document.createElement('input');
                roleInput.name = 'role';
                roleInput.value = sender === 'You' ? 'user' : 'assistant';
                form.appendChild(roleInput);

                const contentInput = document.createElement('input');
                contentInput.name = 'content';
                contentInput.value = message;
                form.appendChild(contentInput);

                // Tạo iframe ẩn để nhận response
                const iframe = document.createElement('iframe');
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                document.body.appendChild(form);

                // Submit form
                form.submit();

                // Cleanup sau 2 giây
                setTimeout(() => {
                    document.body.removeChild(form);
                    document.body.removeChild(iframe);
                }, 2000);

            } catch (error) {
                console.error('Error saving chat history:', error);
                // Tiếp tục hiển thị chat ngay cả khi lưu thất bại
            }
        }

        // Nếu là bot message, thêm hiệu ứng typing
        if (sender === 'Bot') {
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Đợi 1-2 giây để hiển thị hiệu ứng typing
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
            chatMessages.removeChild(typingIndicator);
        }
    }

    // Hàm gọi API Gemini
    async function fetchGeminiResponse(userMessage) {
        try {
            // Thêm tin nhắn mới vào lịch sử
            chatHistory.push({ role: "user", content: userMessage });
            
            // Tạo prompt với toàn bộ lịch sử
            const messages = chatHistory.map(msg => 
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            ).join('\n');
            
            const fullPrompt = `${CONFIG.SYSTEM_PROMPT}\n\n${messages}\nAssistant:`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }],
                    generationConfig: CONFIG.AI_CONFIG
                }),
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0].content.parts[0]) {
                let botResponse = data.candidates[0].content.parts[0].text;
                chatHistory.push({ role: "assistant", content: botResponse });
                return botResponse;
            }
            return "Xin lỗi, tôi không thể trả lời lúc này.";
        } catch (error) {
            console.error("Error fetching Gemini response:", error);
            return "Đã xảy ra lỗi khi xử lý yêu cầu của bạn.";
        }
    }

    // Thêm hàm để load lịch sử chat khi mở chatbot
    function loadChatHistory() {
        const messages = chatHistory;
        chatMessages.innerHTML = ''; // Clear current messages
        
        // Nếu không có lịch sử chat, hiển thị tin nhắn chào mừng
        if (messages.length === 0) {
            appendMessage('Bot', welcomeMessage);
            // Lưu tin nhắn chào mừng vào lịch sử
            chatHistory.push({ role: "assistant", content: welcomeMessage });
            saveChatHistory();
        } else {
            messages.forEach(msg => {
                appendMessage(msg.role === 'user' ? 'You' : 'Bot', msg.content);
            });
        }
    }

    // Thêm CSS cho Markdown
    style.textContent += `
        .chat-bubble strong {
            font-weight: bold;
        }
        .chat-bubble em {
            font-style: italic;
        }
        .chat-bubble code {
            background: rgba(0,0,0,0.05);
            padding: 2px 4px;
            border-radius: 3px;
        }
        .chat-bubble pre {
            background: rgba(0,0,0,0.05);
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
    `;

    // Thêm event listeners
    chatBubble.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        if (chatWindow.style.display === 'flex') {
            loadChatHistory();
        }
    });

    document.getElementById('close-chat').addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    const chatText = document.getElementById('chat-text');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Gửi tin nhắn khi click nút Send
    sendBtn.addEventListener('click', async () => {
        const message = chatText.value.trim();
        if (message) {
            // Thêm class sending cho input container
            document.querySelector('.chat-input-container').classList.add('sending');
            
            // Disable input và nút gửi
            chatText.disabled = true;
            sendBtn.disabled = true;

            appendMessage('You', message);
            chatText.value = '';
            
            // Gọi API và hiển thị response
            const response = await fetchGeminiResponse(message);
            
            // Remove sending class và enable input
            document.querySelector('.chat-input-container').classList.remove('sending');
            chatText.disabled = false;
            sendBtn.disabled = false;
            chatText.focus();

            appendMessage('Bot', response);
        }
    });

    // Gửi tin nhắn khi nhấn Enter (không phải Shift + Enter)
    chatText.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Auto-resize textarea
    chatText.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Thêm MathJax config vào head
    const mathJaxScript = document.createElement('script');
    mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    mathJaxScript.async = true;
    document.head.appendChild(mathJaxScript);

    // Thêm MathJax config
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true
        },
        svg: {
            fontCache: 'global'
        },
        startup: {
            typeset: false
        }
    };

    // Thêm style cho công thức toán học
    style.textContent += `
        .chat-bubble .MathJax {
            max-width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
        }
    `;

    // Thêm hàm xóa lịch sử chat
    function clearChatHistory() {
        localStorage.removeItem('chatHistory');
        chatHistory = [];
        chatMessages.innerHTML = '';
    }

    // Thêm event listener cho nút xóa
    document.getElementById('clear-chat').addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử chat?')) {
            clearChatHistory();
        }
    });

    // Thêm xử lý vuốt để đóng chat trên mobile
    let touchStartY = 0;
    let touchEndY = 0;

    chatWindow.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    chatWindow.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
    });

    chatWindow.addEventListener('touchend', () => {
        const swipeDistance = touchEndY - touchStartY;
        if (swipeDistance > 100) { // Vuốt xuống > 100px
            chatWindow.style.display = 'none';
        }
        touchStartY = 0;
        touchEndY = 0;
    });

    // Thêm meta viewport nếu chưa có
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }

    // Cập nhật style cho nút và input khi disabled
    style.textContent += `
        #chat-text:disabled,
        #send-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .chat-input-container.sending #chat-text {
            background: #f5f5f5;
        }
    `;
})();
  