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
        SYSTEM_PROMPT: `Bạn là trợ lý Mew và là một người bạn của Ánh, bạn người đã có kinh nghiệm sống và làm việc ở Biên Hòa và Hà Nội. Bạn có nhiệm vụ tư vấn và phân tích cho Ánh về vấn đề đang gặp áp lực công việc và đang cân nhắc về quê Tuyên Quang.

NGUYÊN TẮC TRẢ LỜI:
- Phong cách giao tiếp:
  + Xưng hô thân mật "cậu", "tớ", "mình"
  + Trả lời NGẮN GỌN đúng trọng tâm, không sáo rỗng và dài dòng
  + Thể hiện sự đồng cảm cho khó khăn khi quyết định của Ánh
  + Không hỏi dồn nhiều câu hỏi 1 lần
  + Khéo léo hỏi về những áp lực đang gặp phải và dẫn dắt ở lại Sài Gòn
  + Khi Ánh than thở về những khó khăn hãy trở thành người bạn đồng hành cùng Ánh
  + Khi không hiểu câu hỏi hãy đề xuất nói chuyện trực tiếp với người tạo ra tớ (Hội) và không nói gì thêm.


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
        // Màu sắc chính - phù hợp với gradient của trang
        primaryColor: '#667eea',
        primaryGradient: 'linear-gradient(135deg, #667eea, #764ba2)',
        backgroundColor: '#ffffff',
        
        // Chat window
        windowWidth: '100vw',
        windowHeight: '100vh',
        windowMinWidth: '280px',
        windowMaxWidth: '1200px',
        windowRadius: '20px',
        
        // Chat bubble
        bubbleSize: 'min(65px, 15vw)',
        bubbleImage: 'https://www.dropbox.com/scl/fi/i6tpooydfgcbdkg9c3z72/images.jpg?rlkey=4hhx538lxbdca8chpigxipp55&st=6r72goym&dl=1',
        
        // Messages
        userMessageColor: '#667eea',  // Cập nhật màu tin nhắn người dùng
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

    // Thêm biến để kiểm soát trạng thái khởi tạo
    let isInitialized = false;

    // Thêm vào đầu file, sau phần CONFIG
    const AUDIO = {
        catOpen: new Audio('cat-open.mp3'),
        notification: new Audio('notification.mp3')
    };

    // Wrap toàn bộ code khởi tạo trong một hàm
    function initializeChat() {
        if (isInitialized) return; // Chỉ kiểm tra đã khởi tạo, bỏ điều kiện kiểm tra width
        isInitialized = true;

        // Ẩn chat window và hiện main content
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.display = 'block';
        }

        // Tạo chat bubble và window
        const chatBubble = document.createElement("div");
        chatBubble.id = "chat-bubble";
        chatBubble.style.display = 'block';

        const chatWindow = document.createElement("div");
        chatWindow.id = "chat-window";
        chatWindow.style.display = 'none';

        // Cập nhật HTML của chat window
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
                    <button id="close-chat" style="background: none; border: none; color: white; cursor: pointer; font-size: 24px; padding: 10px;">
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
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;

        chatWindow.querySelector('#chat-messages').style.cssText = `
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background-color: #f8f9fa;
            height: calc(100% - 130px);
            -webkit-overflow-scrolling: touch;
        `;

        chatWindow.querySelector('.chat-input-container').style.cssText = `
            padding: 12px 15px;
            background-color: white;
            border-top: 1px solid #eee;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
        `;

        chatWindow.querySelector('#chat-text').style.cssText = `
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            resize: none;
            max-height: 100px;
            min-height: 44px;
            font-size: 16px;
            box-sizing: border-box;
            line-height: 1.4;
            -webkit-appearance: none;
        `;

        chatWindow.querySelector('#send-btn').style.cssText = `
            width: 100%;
            padding: 12px;
            background: ${THEME.primaryGradient};
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: opacity 0.2s;
            -webkit-tap-highlight-color: transparent;
            height: 44px;
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
            
            bubble.classList.add('math-content');
            bubble.innerHTML = marked.parse(message);

            messageElement.appendChild(avatar);
            messageElement.appendChild(bubble);
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            if (window.MathJax) {
                MathJax.typesetPromise([bubble]).catch((err) => console.log('MathJax error:', err));
            }
            
            saveChatHistory();

            // Nếu là tin nhắn từ bot, phát âm thanh thông báo
            if (sender === 'Bot') {
                AUDIO.notification.play().catch(err => console.log('Notification sound failed:', err));
            }
        }

        // Cập nhật hàm fetchGeminiResponse
        async function fetchGeminiResponse(userMessage) {
            try {
                // Thêm tin nhắn mới vào lịch sử
                chatHistory.push({ role: "user", content: userMessage });
                
                // Tạo prompt với toàn bộ lịch sử
                const messages = chatHistory.map(msg => 
                    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
                ).join('\n');
                
                const fullPrompt = `${CONFIG.SYSTEM_PROMPT}\n\n${messages}\nAssistant:`;

                // Tạo request với các options phù hợp cho mobile
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Cache-Control": "no-cache",
                        "Pragma": "no-cache"
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: fullPrompt
                            }]
                        }],
                        generationConfig: CONFIG.AI_CONFIG
                    }),
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'omit'
                };

                // Thêm timeout
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Request timeout')), 30000);
                });

                // Race giữa fetch và timeout
                const response = await Promise.race([
                    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`, requestOptions),
                    timeoutPromise
                ]);

                // Kiểm tra response
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse response dạng text trước
                const responseText = await response.text();
                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (e) {
                    console.error('Failed to parse response:', responseText);
                    throw new Error('Invalid JSON response');
                }

                if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                    throw new Error('Invalid response format');
                }

                const botResponse = data.candidates[0].content.parts[0].text;
                chatHistory.push({ role: "assistant", content: botResponse });
                return botResponse;

            } catch (error) {
                console.error("Error details:", error);

                // Xử lý các lỗi cụ thể
                if (error.message.includes('timeout')) {
                    return "Rất tiếc, kết nối đang chậm. Cậu thử lại nhé!";
                }
                if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
                    return "Kiểm tra lại kết nối mạng và thử lại nhé!";
                }
                if (error.message.includes('Invalid JSON')) {
                    return "Có lỗi khi xử lý phản hồi. Cậu thử lại sau nhé!";
                }
                return "Xin lỗi cậu, tớ đang gặp chút vấn đề. Cậu thử lại sau nhé!";
            }
        }

        // Thêm polyfill cho Promise.race nếu cần
        if (!Promise.race) {
            Promise.race = function(promises) {
                return new Promise((resolve, reject) => {
                    promises.forEach(promise => {
                        Promise.resolve(promise).then(resolve, reject);
                    });
                });
            };
        }

        // Cập nhật hàm loadChatHistory
        function loadChatHistory() {
            const messages = chatHistory;
            
            // Chỉ load lịch sử nếu chat messages đang trống
            if (chatMessages.children.length === 0) {
                // Nếu không có lịch sử chat, hiển thị tin nhắn chào mừng
                if (messages.length === 0) {
                    appendMessage('Bot', welcomeMessage);
                    // Lưu tin nhắn chào mừng vào lịch sử
                    chatHistory.push({ role: "assistant", content: welcomeMessage });
                    saveChatHistory();
                } else {
                    // Load tin nhắn từ lịch sử
                    messages.forEach(msg => {
                        appendMessage(msg.role === 'user' ? 'You' : 'Bot', msg.content);
                    });
                }
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
            AUDIO.catOpen.play().catch(err => console.log('Audio play failed:', err));
            toggleChat(true);
        });

        document.getElementById('close-chat').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleChat(false);
        });

        // Thêm hover effect cho nút đóng
        chatWindow.querySelector('#close-chat').addEventListener('mouseover', function() {
            this.style.opacity = '1';
        });
        chatWindow.querySelector('#close-chat').addEventListener('mouseout', function() {
            this.style.opacity = '0.8';
        });

        // Đảm bảo chat window bắt đầu ở trạng thái ẩn
        chatWindow.style.display = 'none';

        // Đảm bảo chat bubble hiển thị ban đầu
        chatBubble.style.display = 'block';

        // Thêm style cho mobile
        style.textContent += `
            @media screen and (max-width: 768px) {
                #chat-window {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100% !important;
                    height: 100% !important;
                    max-width: none;
                    border-radius: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                }
                
                .chat-header {
                    padding: env(safe-area-inset-top, 15px) 15px 15px !important;
                }
                
                #chat-messages {
                    flex: 1;
                    height: auto !important;
                }
                
                .chat-input-container {
                    padding: 10px 15px calc(10px + env(safe-area-inset-bottom, 10px)) !important;
                    background: white;
                    border-top: 1px solid #eee;
                    position: sticky;
                    bottom: 0;
                }
                
                #chat-text {
                    font-size: 16px !important;
                    padding: 12px 15px !important;
                }
                
                #send-btn {
                    height: 44px !important;
                    font-size: 16px !important;
                    margin-top: 8px;
                }
                
                #chat-bubble {
                    bottom: max(20px, env(safe-area-inset-bottom, 20px));
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                    background: ${THEME.primaryGradient};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                    -webkit-tap-highlight-color: transparent;
                }
                
                #chat-bubble:active {
                    transform: scale(0.95);
                }
                
                .chat-message {
                    max-width: 85%;
                    margin: 8px 0;
                }
                
                .chat-bubble {
                    padding: 12px 16px;
                    font-size: 15px;
                    line-height: 1.4;
                }
                
                #close-chat {
                    padding: 15px !important;
                    font-size: 24px !important;
                    -webkit-tap-highlight-color: transparent;
                }
                
                #clear-chat {
                    padding: 12px !important;
                    font-size: 14px !important;
                }
                
                /* Cải thiện scrolling */
                #chat-messages::-webkit-scrollbar {
                    width: 6px;
                }
                
                #chat-messages::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                #chat-messages::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.1);
                    border-radius: 3px;
                }
                
                /* Fix cho iOS */
                .keyboard-visible #chat-messages {
                    padding-bottom: 20vh;
                }
            }
            
            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
                #chat-window {
                    background: #f8f9fa;  /* Màu nền sáng hơn */
                }
                
                #chat-messages {
                    background: #ffffff;  /* Màu nền trắng cho vùng tin nhắn */
                }
                
                .chat-input-container {
                    background: #ffffff;  /* Màu nền trắng cho vùng input */
                    border-top-color: #e0e0e0;
                }
                
                #chat-text {
                    background: #ffffff;  /* Màu nền trắng cho textbox */
                    border-color: #e0e0e0;
                    color: #333333;  /* Màu chữ tối */
                }
                
                .chat-bubble {
                    background: #f8f9fa;  /* Màu nền sáng cho bubble chat */
                    color: #333333;  /* Màu chữ tối */
                }

                #chat-text::placeholder {
                    color: #999999;  /* Màu placeholder nhạt hơn */
                }
            }

            /* Style mặc định cho textbox */
            #chat-text {
                background: #ffffff;
                border: 1px solid #e0e0e0;
                color: #333333;
            }

            #chat-text::placeholder {
                color: #999999;
            }

            .chat-input-container {
                background: #ffffff;
                border-top: 1px solid #e0e0e0;
            }
        `;

        const chatText = document.getElementById('chat-text');
        const sendBtn = document.getElementById('send-btn');
        const chatMessages = document.getElementById('chat-messages');
        const chatInputContainer = document.querySelector('.chat-input-container');

        // Cập nhật event listener cho nút gửi
        sendBtn.addEventListener('click', async () => {
            const message = chatText.value.trim();
            if (message) {
                try {
                    // Disable input và nút gửi
                    chatText.disabled = true;
                    sendBtn.disabled = true;
                    chatInputContainer.classList.add('sending');

                    appendMessage('You', message);
                    chatText.value = '';
                    
                    // Lưu tin nhắn người dùng vào lịch sử và Google Script
                    chatHistory.push({ role: "user", content: message });
                    saveChatHistory();
                    await saveToGoogleScript('user', message);

                    // Lấy phản hồi từ bot
                    const response = await fetchGeminiResponse(message);
                    
                    // Hiển thị tin nhắn bot
                    appendMessage('Bot', response);

                    // Lưu tin nhắn bot vào lịch sử và Google Script
                    chatHistory.push({ role: "assistant", content: response });
                    saveChatHistory();
                    await saveToGoogleScript('assistant', response);

                } catch (error) {
                    console.error('Error:', error);
                    appendMessage('Bot', 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.');
                } finally {
                    // Enable lại input và nút gửi
                    chatText.disabled = false;
                    sendBtn.disabled = false;
                    chatInputContainer.classList.remove('sending');
                    chatText.focus();
                }
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

        // Thêm xử lý keyboard cho iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const visualViewport = window.visualViewport;
            
            if (visualViewport) {
                visualViewport.addEventListener('resize', () => {
                    if (visualViewport.height < window.innerHeight) {
                        // Keyboard is visible
                        document.body.classList.add('keyboard-visible');
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    } else {
                        // Keyboard is hidden
                        document.body.classList.remove('keyboard-visible');
                    }
                });
            }

            // Scroll to bottom when focusing input
            chatText.addEventListener('focus', () => {
                setTimeout(() => {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    window.scrollTo(0, 0);
                }, 100);
            });
        }

        // Thêm viewport meta tag với viewport-fit=cover
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        } else {
            const newViewport = document.createElement('meta');
            newViewport.name = 'viewport';
            newViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
            document.head.appendChild(newViewport);
        }

        // Cập nhật hàm toggleChat
        function toggleChat(show) {
            if (show) {
                chatWindow.style.display = 'flex';
                chatBubble.style.display = 'none';
                loadChatHistory(); // Vẫn gọi loadChatHistory nhưng đã được cải tiến
            } else {
                chatWindow.style.display = 'none';
                chatBubble.style.display = 'block';
                // Không cần xóa tin nhắn khi ẩn chat
            }
        }

        // Đảm bảo chat window và bubble có trạng thái ban đầu đúng
        document.addEventListener('DOMContentLoaded', () => {
            chatWindow.style.display = 'none';
            chatBubble.style.display = 'block';
        });

        // Thêm hàm để xử lý click từ nút "Trò chuyện với Mew"
        window.startChat = function() {
            if (chatBubble) {
                AUDIO.catOpen.play().catch(err => console.log('Audio play failed:', err));
                toggleChat(true);
            }
        }

        // Thêm style mới cho chat window
        style.textContent += `
            #chat-window {
                background: rgba(255, 255, 255, 0.95) !important;
                box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15) !important;
                border: 1px solid rgba(102, 126, 234, 0.2) !important;
            }

            .chat-header {
                background: ${THEME.primaryGradient} !important;
                border-bottom: none !important;
            }

            #send-btn {
                background: ${THEME.primaryGradient} !important;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
                transition: all 0.3s ease !important;
            }

            #send-btn:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
            }

            #chat-bubble {
                background: ${THEME.primaryGradient} !important;
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3) !important;
            }

            .chat-message .chat-bubble {
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
            }

            #chat-text {
                border-color: rgba(102, 126, 234, 0.3) !important;
                transition: all 0.3s ease !important;
            }

            #chat-text:focus {
                border-color: #667eea !important;
                box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1) !important;
            }

            .chat-input-container {
                background: rgba(255, 255, 255, 0.98) !important;
                border-top: 1px solid rgba(102, 126, 234, 0.1) !important;
            }

            #chat-messages {
                background: rgba(248, 249, 250, 0.95) !important;
            }

            /* Cập nhật style cho tin nhắn */
            .chat-message[style*="row-reverse"] .chat-bubble {
                background: ${THEME.primaryGradient} !important;
                color: white !important;
            }

            /* Style cho nút clear chat */
            #clear-chat {
                background: none !important;
                border: none !important;
                color: white !important;
                cursor: pointer !important;
                padding: 5px !important;
                opacity: 0.8 !important;
                transition: opacity 0.3s ease !important;
            }

            #clear-chat:hover {
                opacity: 1 !important;
            }

            /* Xóa bỏ các style không mong muốn */
            #clear-chat {
                background: none !important;
                border-radius: 0 !important;
                box-shadow: none !important;
            }

            /* Reset các style khác có thể ảnh hưởng */
            .chat-header button#clear-chat {
                background: none !important;
            }

            /* Hiệu ứng loading */
            .typing-dot {
                background: #667eea !important;
            }

            /* Dark mode adjustments */
            @media (prefers-color-scheme: dark) {
                #chat-window {
                    background: rgba(255, 255, 255, 0.98) !important;
                }
                
                #chat-messages {
                    background: rgba(248, 249, 250, 0.95) !important;
                }
                
                .chat-input-container {
                    background: rgba(255, 255, 255, 0.98) !important;
                    border-top-color: rgba(102, 126, 234, 0.1) !important;
                }
                
                #chat-text {
                    background: white !important;
                    color: #2c3e50 !important;
                }
            }
        `;

        // Thêm style mới cho desktop
        style.textContent += `
            @media screen and (min-width: 769px) {
                #chat-window {
                    width: 380px !important;
                    height: 600px !important;
                    bottom: 100px !important;
                    right: 30px !important;
                    border-radius: 25px !important;
                    backdrop-filter: blur(10px) !important;
                    background: rgba(255, 255, 255, 0.98) !important;
                    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2) !important;
                    border: 1px solid rgba(102, 126, 234, 0.2) !important;
                    transition: all 0.3s ease !important;
                }

                #chat-window:hover {
                    transform: translateY(-5px) !important;
                    box-shadow: 0 15px 50px rgba(102, 126, 234, 0.25) !important;
                }

                .chat-header {
                    padding: 20px 25px !important;
                    border-radius: 25px 25px 0 0 !important;
                }

                .chat-header img {
                    width: 45px !important;
                    height: 45px !important;
                }

                .chat-header div > div:first-child {
                    font-size: 18px !important;
                    font-weight: 600 !important;
                }

                .chat-header div > div:last-child {
                    font-size: 14px !important;
                }

                #chat-messages {
                    padding: 25px !important;
                    height: calc(100% - 160px) !important;
                }

                .chat-message {
                    margin: 15px 0 !important;
                }

                .chat-bubble {
                    padding: 15px 20px !important;
                    font-size: 15px !important;
                    line-height: 1.5 !important;
                    max-width: 80% !important;
                }

                .chat-input-container {
                    padding: 20px 25px !important;
                    gap: 15px !important;
                }

                #chat-text {
                    padding: 15px 20px !important;
                    font-size: 15px !important;
                    min-height: 50px !important;
                    border-radius: 15px !important;
                    transition: all 0.3s ease !important;
                }

                #chat-text:focus {
                    transform: translateY(-1px) !important;
                }

                #send-btn {
                    height: 50px !important;
                    font-size: 16px !important;
                    font-weight: 600 !important;
                    letter-spacing: 0.5px !important;
                    border-radius: 15px !important;
                }

                #chat-bubble {
                    width: 70px !important;
                    height: 70px !important;
                    bottom: 30px !important;
                    right: 30px !important;
                    border-radius: 35px !important;
                    transition: all 0.3s ease !important;
                }

                #chat-bubble:hover {
                    transform: scale(1.05) !important;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
                }

                #clear-chat {
                    padding: 8px 20px !important;
                    font-size: 14px !important;
                    opacity: 0.9 !important;
                }

                #close-chat {
                    font-size: 28px !important;
                    padding: 15px !important;
                }

                /* Cải thiện scrollbar cho desktop */
                #chat-messages::-webkit-scrollbar {
                    width: 8px !important;
                }

                #chat-messages::-webkit-scrollbar-track {
                    background: transparent !important;
                    border-radius: 4px !important;
                }

                #chat-messages::-webkit-scrollbar-thumb {
                    background: rgba(102, 126, 234, 0.2) !important;
                    border-radius: 4px !important;
                    transition: all 0.3s ease !important;
                }

                #chat-messages::-webkit-scrollbar-thumb:hover {
                    background: rgba(102, 126, 234, 0.4) !important;
                }

                /* Hiệu ứng hover cho các nút */
                #send-btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
                }

                #clear-chat:hover {
                    opacity: 1 !important;
                    transform: translateY(-1px) !important;
                }

                /* Hiệu ứng cho tin nhắn */
                .chat-message {
                    opacity: 0;
                    animation: fadeInMessage 0.3s ease forwards;
                }

                @keyframes fadeInMessage {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        `;

        // Thêm hàm để điều chỉnh âm lượng (tùy chọn)
        function setNotificationVolume(volume) { // volume từ 0.0 đến 1.0
            AUDIO.notification.volume = volume;
        }

        // Đặt âm lượng mặc định (tùy chọn)
        setNotificationVolume(0.5); // Đặt âm lượng ở mức 50%

        // Thêm hàm riêng để lưu vào Google Script
        async function saveToGoogleScript(role, content) {
            if (!SCRIPT_URL) return;

            try {
                const form = document.createElement('form');
                form.style.display = 'none';
                form.method = 'POST';
                form.action = SCRIPT_URL;
                form.target = 'hidden_iframe';

                const roleInput = document.createElement('input');
                roleInput.name = 'role';
                roleInput.value = role;
                form.appendChild(roleInput);

                const contentInput = document.createElement('input');
                contentInput.name = 'content';
                contentInput.value = content;
                form.appendChild(contentInput);

                const iframe = document.createElement('iframe');
                iframe.name = 'hidden_iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                document.body.appendChild(form);

                form.submit();

                // Cleanup sau 2 giây
                setTimeout(() => {
                    document.body.removeChild(form);
                    document.body.removeChild(iframe);
                }, 2000);

            } catch (error) {
                console.error('Error saving to Google Script:', error);
            }
        }
    }

    // Đợi cho trang load xong mới khởi tạo chat
    document.addEventListener('DOMContentLoaded', function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');

        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                if (mainContent) {
                    mainContent.style.display = 'block';
                    mainContent.classList.add('visible');
                    // Phát âm thanh khi loading xong
                    AUDIO.catOpen.play().catch(err => console.log('Audio play failed:', err));
                }
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initializeChat();
                }, 500);
            }, 2000);
        } else {
            if (mainContent) {
                mainContent.style.display = 'block';
                // Phát âm thanh khi không có loading screen
                AUDIO.catOpen.play().catch(err => console.log('Audio play failed:', err));
            }
            initializeChat();
        }
    });

    // Thêm style để ẩn main content ban đầu
    const style = document.createElement('style');
    style.textContent = `
        #mainContent {
            display: none;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        #mainContent.visible {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
})();
  