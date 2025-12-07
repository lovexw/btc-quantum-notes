/**
 * 量子威胁指南 - JavaScript交互脚本
 * 提供平滑导航、交互效果和增强体验
 */

// 防止在非浏览器环境中执行
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeSmoothScroll();
        initializeFAQInteractivity();
        initializeScrollAnimations();
        initializeNavbarScroll();
    });

    /**
     * 初始化平滑滚动
     */
    function initializeSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // 排除外部链接
                if (href === '#' || !href.startsWith('#')) return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * 初始化FAQ交互性
     */
    function initializeFAQInteractivity() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                // 添加点击事件切换
                question.addEventListener('click', function() {
                    item.classList.toggle('expanded');
                });
                
                // 添加键盘支持
                question.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.classList.toggle('expanded');
                    }
                });
                
                // 添加聚焦类
                question.addEventListener('focus', function() {
                    item.classList.add('focused');
                });
                
                question.addEventListener('blur', function() {
                    item.classList.remove('focused');
                });
            }
        });
    }

    /**
     * 初始化滚动动画
     */
    function initializeScrollAnimations() {
        // 检查浏览器是否支持Intersection Observer
        if (!('IntersectionObserver' in window)) {
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // 观察所有内容块
        const elements = document.querySelectorAll('.content-block, .threat-layer, .crypto-item, .timeline-item, .solution-item');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    }

    /**
     * 初始化导航栏滚动效果
     */
    function initializeNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = 0;
        let scrollDirection = 'down';
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // 判断滚动方向
            if (currentScrollY > lastScrollY) {
                scrollDirection = 'down';
            } else {
                scrollDirection = 'up';
            }
            
            // 添加阴影效果
            if (currentScrollY > 10) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    /**
     * 页面加载完成后的动画
     */
    window.addEventListener('load', function() {
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.opacity = '1';
            hero.style.animation = 'fadeInUp 0.8s ease-out';
        }
    });

    /**
     * 添加返回顶部按钮（如果需要）
     */
    function addBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #7c3aed, #a78bfa);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            z-index: 999;
            box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3);
        `;
        
        document.body.appendChild(backToTopBtn);
        
        // 显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        }, { passive: true });
        
        // 点击返回顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 悬停效果
        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // 在页面加载完成后添加返回顶部按钮
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addBackToTop);
    } else {
        addBackToTop();
    }

    /**
     * 性能监控（可选）
     */
    function logPerformanceMetrics() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
            
            console.log(`页面加载完成时间: ${loadTime}ms`);
            console.log(`DOM就绪时间: ${domReadyTime}ms`);
        }
    }

    // 页面加载完成后记录性能指标
    window.addEventListener('load', logPerformanceMetrics);

    /**
     * 添加预加载提示
     */
    function showLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed);
            background-size: 200% 100%;
            animation: loading 1.5s ease-in-out infinite;
            z-index: 10000;
        `;
        
        document.body.appendChild(indicator);
        
        window.addEventListener('load', function() {
            indicator.style.opacity = '0';
            indicator.style.transition = 'opacity 0.3s ease';
            setTimeout(() => indicator.remove(), 300);
        });
    }

    // 在DOM解析时显示加载指示器
    if (document.readyState === 'loading') {
        showLoadingIndicator();
    }

    /**
     * 深色模式支持（可选的高级功能）
     */
    function initializeDarkModeToggle() {
        // 检查用户偏好
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkMode) {
            // 可以在这里添加深色模式样式
            // 为了保持代码简洁，暂不实现
        }
    }

    // 初始化深色模式（如果浏览器支持）
    initializeDarkModeToggle();
}
