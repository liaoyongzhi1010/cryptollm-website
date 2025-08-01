// 全屏滚动系统
let currentSectionIndex = 0;
let isScrolling = false;
const sections = ['homepage', 'productIntro', 'algorithmDemo', 'protocolDemo', 'engineeringDemo'];

// 滚动到指定section
function scrollToSection(sectionId) {
    const sectionIndex = sections.indexOf(sectionId);
    if (sectionIndex !== -1 && sectionIndex !== currentSectionIndex) {
        currentSectionIndex = sectionIndex;
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// 滚动到下一个section
function scrollToNextSection() {
    if (currentSectionIndex < sections.length - 1) {
        scrollToSection(sections[currentSectionIndex + 1]);
    }
}

// 滚动到上一个section
function scrollToPreviousSection() {
    if (currentSectionIndex > 0) {
        scrollToSection(sections[currentSectionIndex - 1]);
    }
}

// 处理滚轮事件
function handleWheelScroll(e) {
    if (isScrolling) {
        e.preventDefault();
        return;
    }

    isScrolling = true;
    
    if (e.deltaY > 0) {
        // 向下滚动
        scrollToNextSection();
    } else {
        // 向上滚动
        scrollToPreviousSection();
    }
    
    // 防抖，避免过快滚动
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// 处理键盘事件
function handleKeyDown(e) {
    if (isScrolling) return;
    
    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // 空格键
            e.preventDefault();
            scrollToNextSection();
            break;
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            scrollToPreviousSection();
            break;
    }
}

// 检测当前可见的section
function updateCurrentSection() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                currentSectionIndex = index;
                updateNavigationDots();
            }
        }
    });
}

// 更新导航点状态
function updateNavigationDots() {
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach((dot, index) => {
        if (index === currentSectionIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 初始化产品介绍页面动画
function initProductIntroAnimations() {
    // 循环切换功能特性
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length > 0) {
        let currentFeature = 0;
        
        setInterval(() => {
            featureItems.forEach(item => item.classList.remove('active'));
            featureItems[currentFeature].classList.add('active');
            currentFeature = (currentFeature + 1) % featureItems.length;
        }, 3000);
    }
    
    // 数字计数动画
    const animateNumbers = () => {
        const algorithmCount = document.getElementById('algorithmCount');
        const protocolCount = document.getElementById('protocolCount');
        const accuracyRate = document.getElementById('accuracyRate');
        
        if (algorithmCount) {
            animateCounter(algorithmCount, 128, '+');
        }
        if (protocolCount) {
            animateCounter(protocolCount, 50, '+');
        }
        if (accuracyRate) {
            animateCounter(accuracyRate, 99.7, '%');
        }
    };
    
    // 当页面滚动到产品介绍时启动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateNumbers, 500);
                observer.unobserve(entry.target);
            }
        });
    });
    
    const productIntro = document.getElementById('productIntro');
    if (productIntro) {
        observer.observe(productIntro);
    }
}

// 数字计数动画函数
function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (suffix === '%') {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// 启动算法演示的动画效果
function startAlgorithmDemo() {
    const typingMessage = document.getElementById('typingMessage');
    const aiResponse = document.getElementById('aiResponse');
    const typingIndicator = typingMessage.querySelector('.typing-indicator');
    
    // 显示打字动画
    typingIndicator.style.display = 'flex';
    aiResponse.classList.add('hidden');
    
    // 3秒后显示AI回复
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        aiResponse.classList.remove('hidden');
        
        // 启动算法可视化动画
        startAlgorithmVisualization();
        
        // 滚动到底部
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 3000);
}

// 算法可视化动画
function startAlgorithmVisualization() {
    const steps = document.querySelectorAll('.round-step');
    let currentStep = 0;
    
    const animateStep = () => {
        // 重置所有步骤
        steps.forEach(step => step.classList.remove('active'));
        
        // 激活当前步骤
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
            
            setTimeout(animateStep, 800);
        } else {
            // 重置到第一步，循环动画
            currentStep = 0;
            setTimeout(animateStep, 2000);
        }
    };
    
    animateStep();
}

// 启动协议演示
function startProtocolDemo() {
    console.log('协议演示已启动');
    // 这里可以添加协议演示的特定动画
}

// 启动工程演示
function startEngineeringDemo() {
    console.log('工程演示已启动');
    // 这里可以添加工程演示的特定动画
}

// 处理聊天输入
function handleChatInput() {
    const inputField = document.querySelector('.chat-input-field');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!inputField.value.trim()) return;
    
    // 添加用户消息
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <div class="message-text">${inputField.value}</div>
        </div>
        <div class="message-avatar">👤</div>
    `;
    
    chatMessages.appendChild(userMessage);
    
    // 清空输入框
    inputField.value = '';
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 模拟AI回复
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-text">这是一个很好的密码学问题！让我为你详细分析...</div>
            </div>
        `;
        
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// 初始化聊天功能
function initChatInterface() {
    const sendButtons = document.querySelectorAll('.send-button');
    const inputFields = document.querySelectorAll('.chat-input-field');
    
    sendButtons.forEach(button => {
        button.addEventListener('click', handleChatInput);
    });
    
    inputFields.forEach(field => {
        field.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleChatInput();
            }
        });
    });
}

// 视频弹窗相关函数
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    modal.style.display = 'flex';
    video.play();
}

function closeVideoModal(event) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    // 如果点击的是视频容器本身，不关闭弹窗
    if (event && event.target.closest('.video-container') && event.target !== event.currentTarget) {
        return;
    }
    
    modal.style.display = 'none';
    video.pause();
    video.currentTime = 0;
}

// ESC键关闭弹窗
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});

// 初始化全屏滚动系统
function initFullscreenScrolling() {
    // 监听滚动事件来更新当前section
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateCurrentSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 监听滚轮事件
    window.addEventListener('wheel', handleWheelScroll, { passive: false });
    
    // 监听键盘事件
    window.addEventListener('keydown', handleKeyDown);
    
    // 监听触摸事件（移动端）
    let touchStartY = 0;
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    window.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaY) > 50) { // 最小滑动距离
            if (deltaY > 0) {
                // 向上滑动，切换到下一个section
                scrollToNextSection();
            } else {
                // 向下滑动，切换到上一个section
                scrollToPreviousSection();
            }
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initFullscreenScrolling();
    initChatInterface();
    initProductIntroAnimations();
    
    // 初始化导航点状态
    updateNavigationDots();
    
    // 页面加载后自动启动算法演示动画
    setTimeout(() => {
        const algorithmDemo = document.getElementById('algorithmDemo');
        if (algorithmDemo) {
            startAlgorithmDemo();
        }
    }, 1000);
    
    console.log('CryptoLLM 全屏滚动网站已加载完成');
});