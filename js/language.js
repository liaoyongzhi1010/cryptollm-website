// 全屏滚动功能
let currentSection = 0;
const totalSections = 2; // 只有2页
let isScrolling = false;
let isInFullpageMode = true; // 跟踪是否在全屏模式

// 初始化全屏滚动
function initFullPageScroll() {
    const container = document.getElementById('fullpage');
    
    // 监听鼠标滚轮事件
    window.addEventListener('wheel', handleScroll, { passive: false });
    
    // 监听键盘事件
    window.addEventListener('keydown', handleKeydown);
    
    // 监听触摸事件（移动端）
    let touchStartY = 0;
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    window.addEventListener('touchend', function(e) {
        if (isScrolling || !isInFullpageMode) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaY) > 50) { // 最小滑动距离
            if (deltaY > 0) {
                scrollToNext();
            } else {
                scrollToPrev();
            }
        }
    });
    
    // 页面指示器点击事件
    document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToSection(index));
    });
}

// 处理滚轮事件
function handleScroll(e) {
    if (!isInFullpageMode) return; // 如果不在全屏模式，允许正常滚动
    
    e.preventDefault();
    
    if (isScrolling) return;
    
    if (e.deltaY > 0) {
        if (currentSection === totalSections - 1) {
            // 在最后一页向下滚动时，退出全屏模式
            exitFullpageMode();
        } else {
            scrollToNext();
        }
    } else {
        scrollToPrev();
    }
}

// 退出全屏模式
function exitFullpageMode() {
    isInFullpageMode = false;
    document.body.style.overflow = 'auto'; // 恢复正常滚动
    
    // 滚动到正常内容区域
    const normalContent = document.querySelector('.normal-scroll-content');
    if (normalContent) {
        normalContent.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 隐藏页面指示器
    const indicator = document.querySelector('.page-indicator');
    if (indicator) {
        indicator.style.opacity = '0';
        indicator.style.pointerEvents = 'none';
    }
}

// 进入全屏模式
function enterFullpageMode() {
    isInFullpageMode = true;
    document.body.style.overflow = 'hidden';
    
    // 显示页面指示器
    const indicator = document.querySelector('.page-indicator');
    if (indicator) {
        indicator.style.opacity = '1';
        indicator.style.pointerEvents = 'auto';
    }
}

// 处理键盘事件
function handleKeydown(e) {
    if (!isInFullpageMode || isScrolling) return;
    
    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // 空格键
            e.preventDefault();
            if (currentSection === totalSections - 1) {
                exitFullpageMode();
            } else {
                scrollToNext();
            }
            break;
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            scrollToPrev();
            break;
        case 'Home':
            e.preventDefault();
            scrollToSection(0);
            break;
    }
}

// 滚动到下一页
function scrollToNext() {
    if (currentSection < totalSections - 1) {
        scrollToSection(currentSection + 1);
    }
}

// 滚动到上一页
function scrollToPrev() {
    if (currentSection > 0) {
        scrollToSection(currentSection - 1);
    }
}

// 滚动到指定页面
function scrollToSection(index) {
    if (index < 0 || index >= totalSections || index === currentSection || isScrolling) {
        return;
    }
    
    // 如果不在全屏模式，先进入全屏模式
    if (!isInFullpageMode) {
        enterFullpageMode();
    }
    
    isScrolling = true;
    currentSection = index;
    
    const container = document.getElementById('fullpage');
    const translateY = -index * 100;
    
    container.style.transform = `translateY(${translateY}vh)`;
    
    // 更新页面指示器
    updateIndicators();
    
    // 更新活动状态
    updateActiveSections();
    
    // 滚动完成后重置状态
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// 更新页面指示器
function updateIndicators() {
    document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
        if (index === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 更新活动区块状态
function updateActiveSections() {
    document.querySelectorAll('.fullpage-section').forEach((section, index) => {
        if (index === currentSection) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initFullPageScroll();
    
    // 初始状态设置为全屏模式
    enterFullpageMode();
});