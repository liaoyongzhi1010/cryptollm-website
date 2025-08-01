/* language.js - 中英文切换功能 */

// 语言数据
const translations = {
    'zh': {
        // 通用导航
        'api-developer': 'API 开发者',
        'lang-toggle': 'English',
        'nav-home': '首页',
        'nav-product': '产品介绍',
        'nav-chat': '开始对话',
        'nav-api': 'API 开发者',
        
        // 首页内容
        'announcement': '🔐 CryptoLLM-V1 密码大模型正式发布，专业支持密码分析、密码协议、密码工程等任务，点击查看详情。',
        'main-title': 'CryptoLLM',
        'main-subtitle': '探索密码学之境',
        'chat-title': '开始对话',
        'chat-desc': '与 CryptoLLM-V1 免费对话',
        'chat-subtitle': '体验全新密码学推理模型',
        'app-title': '产品介绍',
        'app-desc': '了解 CryptoLLM 的核心能力',
        'app-subtitle': '专业密码学智能助手',
        
        // 底部品牌
        'footer-subtitle': 'by XDU NSS',
        
        // 底部导航
        'research': '研究成果',
        'quick-links': '快速链接',
        'legal-security': '法务安全',
        'about-us': '了解我们',
        
        // 研究成果部分
        'evaluation-benchmark': '评估基准',
        'technical-papers': '技术论文',
        'research-reports': '研究报告',
        
        // 快速链接部分
        'product-home': '产品首页',
        'product-intro': '产品介绍',
        'start-chat': '开始对话',
        'api-docs': 'API 文档',
        
        // 法务安全部分
        'privacy-policy': '隐私政策',
        'terms-conditions': '使用条款',
        'contact-us': '联系我们',
        
        // 了解我们部分
        'nss-website': 'NSS官网',
        
        // 版权信息部分
        'copyright': '© 2025 西安电子科技大学计算机科学与技术学院 (XDU NSS)',
        'icp-record': '陕ICP备05016463号',
        'edu-record': '教育网备案',
        'academic-integrity': '学术诚信声明'
    },
    'en': {
        // 通用导航
        'api-developer': 'API Developer',
        'lang-toggle': '中文',
        'nav-home': 'Home',
        'nav-product': 'Product',
        'nav-chat': 'Start Chat',
        'nav-api': 'API Developer',
        
        // 首页内容
        'announcement': '🔐 CryptoLLM-V1 officially released with professional cryptographic reasoning capabilities. Click for details.',
        'main-title': 'CryptoLLM',
        'main-subtitle': 'Into the Cryptographic Realm',
        'chat-title': 'Start Chat',
        'chat-desc': 'Free access to CryptoLLM-V1',
        'chat-subtitle': 'Experience advanced cryptographic model',
        'app-title': 'Product Overview',
        'app-desc': 'Learn about CryptoLLM capabilities',
        'app-subtitle': 'Professional cryptographic assistant',
        
        // 底部品牌
        'footer-subtitle': 'by XDU NSS',
        
        // 底部导航
        'research': 'Research',
        'quick-links': 'Quick Links',
        'legal-security': 'Legal & Security',
        'about-us': 'About Us',
        
        // 研究成果部分
        'evaluation-benchmark': 'Evaluation Benchmark',
        'technical-papers': 'Technical Papers',
        'research-reports': 'Research Reports',
        
        // 快速链接部分
        'product-home': 'Product Home',
        'product-intro': 'Product Introduction',
        'start-chat': 'Start Chat',
        'api-docs': 'API Documentation',
        
        // 法务安全部分
        'privacy-policy': 'Privacy Policy',
        'terms-conditions': 'Terms & Conditions',
        'contact-us': 'Contact Us',
        
        // 了解我们部分
        'nss-website': 'NSS Website',
        
        // 版权信息部分
        'copyright': '© 2025 School of Computer Science and Technology, Xidian University (XDU NSS)',
        'icp-record': 'Shaanxi ICP No. 05016463',
        'edu-record': 'Education Network Registration',
        'academic-integrity': 'Academic Integrity Statement'
    }
};

// 当前语言状态
let currentLang = 'zh';

// 更新页面文本的函数
function updatePageText(lang) {
    const texts = translations[lang];
    
    // 更新所有具有data-key属性的元素
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });

    // 更新语言切换按钮
    const langToggle = document.querySelector('.current-lang');
    if (langToggle) {
        langToggle.textContent = texts['lang-toggle'];
    }
    
    // 更新HTML lang属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// 初始化语言功能
function initLanguage() {
    // 页面加载时检查保存的语言偏好
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        updatePageText(currentLang);
    }

    // 语言切换功能
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            updatePageText(currentLang);
            
            // 保存语言偏好到localStorage
            localStorage.setItem('preferred-language', currentLang);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
});