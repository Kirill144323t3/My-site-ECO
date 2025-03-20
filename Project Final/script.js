document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Lucide иконок
    lucide.createIcons();
    setTimeout(() => lucide.createIcons(), 100);

    // Мобильное меню
    setupMobileMenu();

    // Переключение вкладок
    setupTabs();

    // Генерация ежедневных заданий
    generateDailyChallenges();

    // Генерация еженедельных заданий
    generateWeeklyChallenges();

    // Обработчики кнопок "Начать"
    setupChallengeButtons();

    // Обработчики для транспортного сравнения
    setupTransportComparison();

    // Раскрывающиеся блоки
    setupToggleSections();

    // Сортировка таблицы и кнопка "Смотреть все"
    setupLeaderboard();

    // Настройка выбора аватара
    setupAvatarSelection();

    // Инициализация XP при загрузке страницы
    const savedXP = localStorage.getItem('userXP');
    if (savedXP) {
        updateProgress(parseInt(savedXP));
    }
});

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

    if (mobileMenuBtn && mobileMenu && closeMobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        });

        closeMobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('-translate-x-full');
        });

        // Закрытие меню при клике на ссылку
        const navLinks = mobileMenu.querySelectorAll('.nav-btn-mobile');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('-translate-x-full');
            });
        });
    }
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tabContents.forEach(content => {
                    content.classList.add('hidden');
                    content.style.opacity = '0';
                });
                const tabId = button.getAttribute('data-tab');
                const activeTab = document.getElementById(tabId);
                if (activeTab) {
                    activeTab.classList.remove('hidden');
                    setTimeout(() => (activeTab.style.opacity = '1'), 50);
                }
            });
        });
    }
}

function generateDailyChallenges() {
    const dailyChallenges = [
        { title: "Выключить свет", desc: "Выключите свет в комнате на 1 час.", xp: 50, icon: "sun" },
        { title: "Прогулка пешком", desc: "Пройдите 2 км пешком.", xp: 70, icon: "walking" },
        { title: "Собрать мусор", desc: "Соберите 5 пластиковых бутылок.", xp: 60, icon: "trash" },
        { title: "Экономия воды", desc: "Принять душ за 5 минут.", xp: 50, icon: "droplet" },
        { title: "Без пакета", desc: "Сходить в магазин без пластикового пакета.", xp: 60, icon: "shopping-bag" }
    ];

    const container = document.getElementById('daily-challenges');
    if (container) {
        dailyChallenges.forEach(challenge => {
            container.innerHTML += `
                <div class="challenge-card bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="mb-3 flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="p-2 rounded-lg bg-green-100">
                                <i class="w-5 h-5 text-green-500" data-lucide="${challenge.icon}"></i>
                            </div>
                            <div>
                                <h3 class="font-medium">${challenge.title}</h3>
                                <div class="flex items-center text-xs space-x-2">
                                    <span class="px-2 py-0.5 rounded-full bg-green-100 text-green-800">Легко</span>
                                    <span class="text-gray-500">+${challenge.xp} XP</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <i class="w-5 h-5 text-gray-400" data-lucide="clock"></i>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-4">${challenge.desc}</p>
                    <button class="w-full mt-2 py-1.5 text-sm rounded-lg start-btn" data-challenge="${challenge.title}">
                        Начать
                    </button>
                </div>
            `;
        });
        lucide.createIcons();
    }
}

function generateWeeklyChallenges() {
    const weeklyChallenges = [
        { title: "Велопрогулка", desc: "Проехать 20 км на велосипеде.", xp: 200, icon: "bike" },
        { title: "Переработка", desc: "Сдать 10 кг вторсырья.", xp: 250, icon: "recycle" },
        { title: "Без мяса", desc: "Не есть мясо 3 дня.", xp: 180, icon: "carrot" },
        { title: "Энергия", desc: "Сократить потребление энергии на 15%.", xp: 220, icon: "zap" },
        { title: "Посадка", desc: "Посадить 2 дерева.", xp: 300, icon: "leaf" }
    ];

    const container = document.getElementById('weekly-challenges');
    if (container) {
        weeklyChallenges.forEach(challenge => {
            container.innerHTML += `
                <div class="challenge-card bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="mb-3 flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="p-2 rounded-lg bg-green-100">
                                <i class="w-5 h-5 text-green-500" data-lucide="${challenge.icon}"></i>
                            </div>
                            <div>
                                <h3 class="font-medium">${challenge.title}</h3>
                                <div class="flex items-center text-xs space-x-2">
                                    <span class="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Средне</span>
                                    <span class="text-gray-500">+${challenge.xp} XP</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <i class="w-5 h-5 text-gray-400" data-lucide="clock"></i>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mb-4">${challenge.desc}</p>
                    <button class="w-full mt-2 py-1.5 text-sm rounded-lg start-btn" data-challenge="${challenge.title}">
                        Начать
                    </button>
                </div>
            `;
        });
        lucide.createIcons();
    }
}

function setupChallengeButtons() {
    const startButtons = document.querySelectorAll('.start-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const title = e.target.getAttribute('data-challenge');
            const xpReward = parseInt(button.parentElement.querySelector('.text-gray-500').textContent.replace('+', '').replace(' XP', ''));

            if (button.textContent === 'Начать') {
                button.textContent = 'В процессе';
                button.classList.add('bg-yellow-100', 'text-yellow-800', 'cursor-not-allowed');
                button.classList.remove('hover:bg-green-200', 'bg-green-100');

                setTimeout(() => {
                    button.textContent = 'Завершить';
                    button.classList.add('bg-red-100', 'text-red-800', 'hover:bg-red-200');
                    button.classList.remove('bg-yellow-100', 'text-yellow-800', 'cursor-not-allowed');
                }, 2000);
            } else if (button.textContent === 'Завершить') {
                // Создаём элемент для анимации начисления XP
                const xpPopup = document.createElement('div');
                xpPopup.className = 'xp-popup';
                xpPopup.textContent = `+${xpReward} XP`;
                button.parentElement.appendChild(xpPopup);

                // Анимация исчезновения
                setTimeout(() => {
                    xpPopup.remove();
                }, 2000);

                // Обновляем XP в localStorage
                let currentXP = parseInt(localStorage.getItem('userXP')) || 450; // Начальное значение из index.html
                currentXP += xpReward;
                localStorage.setItem('userXP', currentXP);

                // Обновляем прогресс-бар и текст на странице Прогресс
                updateProgress(currentXP);

                // Деактивируем кнопку
                button.textContent = 'Завершено';
                button.classList.add('bg-gray-100', 'text-gray-500', 'cursor-not-allowed');
                button.classList.remove('bg-red-100', 'text-red-800', 'hover:bg-red-200');
                button.disabled = true;
            }
        });
    });
}

function updateProgress(currentXP) {
    const xpElement = document.querySelector('.eco-rank .flex.items-center.text-sm.text-gray-500 span:last-child');
    const progressText = document.querySelector('.progress-container .flex.justify-between.text-sm.mb-1 span:last-child');
    const progressBar = document.querySelector('.progress-bar');

    if (xpElement && progressText && progressBar) {
        const maxXP = 1000; // Максимум для текущего уровня
        xpElement.textContent = `${currentXP} XP`;
        progressText.textContent = `${currentXP}/${maxXP}`;
        const progressPercentage = (currentXP / maxXP) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
}

function setupTransportComparison() {
    const transportOptions = document.querySelectorAll('.transport-option');
    const transportInfos = document.querySelectorAll('.transport-info');

    if (transportOptions.length > 0) {
        transportOptions[0].classList.add('active');
        transportInfos[0].classList.remove('hidden');
        transportInfos[0].style.opacity = '1';

        transportOptions.forEach(option => {
            option.addEventListener('click', () => {
                transportOptions.forEach(item => item.classList.remove('active'));
                option.classList.add('active');

                transportInfos.forEach(info => {
                    info.classList.add('hidden');
                    info.style.opacity = '0';
                });

                const transportType = option.getAttribute('data-transport');
                const infoBlock = document.getElementById(`${transportType}-info`);
                if (infoBlock) {
                    infoBlock.classList.remove('hidden');
                    setTimeout(() => (infoBlock.style.opacity = '1'), 50);
                }
            });
        });
    }
}

function setupToggleSections() {
    const toggleButtons = document.querySelectorAll('[data-toggle]');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-toggle');
            const target = document.getElementById(targetId);
            const isHidden = target.classList.contains('hidden');

            target.classList.toggle('hidden');
            target.style.height = isHidden ? 'auto' : '0';
            setTimeout(() => {
                target.style.opacity = isHidden ? '1' : '0';
                target.style.height = isHidden ? target.scrollHeight + 'px' : '0';
            }, 10);

            button.textContent = isHidden ? 'Скрыть' : 'Показать достижения';
        });
    });
}

function setupLeaderboard() {
    const thead = document.querySelector('thead');
    const tbody = document.getElementById('leaderboard-body');
    const viewAllBtn = document.getElementById('view-all');

    if (thead) {
        thead.addEventListener('click', (e) => {
            const th = e.target.closest('th');
            if (th && th.dataset.sort) {
                const key = th.dataset.sort;
                let rows = Array.from(tbody.querySelectorAll('tr'));
                const isAscending = th.classList.contains('asc');

                rows.sort((a, b) => {
                    let aValue = a.cells[key === 'place' ? 0 : key === 'name' ? 1 : key === 'level' ? 2 : key === 'xp' ? 3 : 4].textContent;
                    let bValue = b.cells[key === 'place' ? 0 : key === 'name' ? 1 : key === 'level' ? 2 : key === 'xp' ? 3 : 4].textContent;

                    if (key === 'xp') {
                        aValue = parseInt(aValue.replace(' XP', ''));
                        bValue = parseInt(bValue.replace(' XP', ''));
                    } else if (key === 'place' || key === 'level' || key === 'achievements') {
                        aValue = parseInt(aValue);
                        bValue = parseInt(bValue);
                    } else {
                        aValue = aValue.toLowerCase();
                        bValue = bValue.toLowerCase();
                    }

                    return isAscending ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
                });

                thead.querySelectorAll('th').forEach(th => th.classList.remove('asc', 'desc'));
                th.classList.add(isAscending ? 'desc' : 'asc');

                rows.forEach(row => tbody.appendChild(row));
            }
        });
    }

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            alert('Показаны все лидеры! (Функция пока в разработке)');
        });
    }
}

function setupAvatarSelection() {
    const avatar = document.getElementById('avatar');
    const avatarModal = document.getElementById('avatar-modal');
    const closeModalBtn = document.getElementById('close-avatar-modal');
    const saveAvatarBtn = document.getElementById('save-avatar-btn');
    const customAvatarInput = document.getElementById('custom-avatar');
    const avatarPreview = document.getElementById('avatar-preview');

    // Загрузка сохранённого аватара при старте
    const savedAvatar = localStorage.getItem('customAvatar');
    if (savedAvatar) {
        avatar.src = savedAvatar;
        avatarPreview.src = savedAvatar;
    }

    if (avatar) {
        avatar.addEventListener('click', () => {
            avatarModal.classList.remove('hidden');
            avatarPreview.src = avatar.src; // Устанавливаем текущий аватар как предпросмотр
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            avatarModal.classList.add('hidden');
        });
    }

    if (customAvatarInput) {
        customAvatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    avatarPreview.src = event.target.result; // Обновляем предпросмотр
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (saveAvatarBtn) {
        saveAvatarBtn.addEventListener('click', () => {
            const previewSrc = avatarPreview.src;
            if (previewSrc && !previewSrc.includes('images/avatar1.jpg')) {
                avatar.src = previewSrc; // Обновляем основной аватар
                localStorage.setItem('customAvatar', previewSrc); // Сохраняем в localStorage
            }
            avatarModal.classList.add('hidden'); // Закрываем модальное окно
        });
    }
}
// script.js

// Список всех доступных квестов
const challenges = [
    { id: 1, title: "Выключить свет", xp: 50, type: "daily", icon: "sun" },
    { id: 2, title: "Прогулка пешком", xp: 70, type: "daily", icon: "walking" },
    { id: 3, title: "Велопрогулка", xp: 200, type: "weekly", icon: "bike" },
    { id: 4, title: "Сдать вторсырьё", xp: 250, type: "weekly", icon: "recycle" },
    { id: 5, title: "Экономия воды", xp: 60, type: "daily", icon: "droplet" }
  ];
  
  // Функция для сохранения выполненного квеста
  function completeChallenge(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;
  
    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];
    const date = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    completedChallenges.push({
      id: challenge.id,
      title: challenge.title,
      xp: challenge.xp,
      type: challenge.type,
      icon: challenge.icon,
      date: date
    });
    localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
  
    // Обновляем XP
    const currentXP = parseInt(localStorage.getItem('userXP')) || 0;
    localStorage.setItem('userXP', currentXP + challenge.xp);
  }
  
  // Функция для получения выполненных квестов
  function getCompletedChallenges() {
    return JSON.parse(localStorage.getItem('completedChallenges')) || [];
  }
  
  // Функция для настройки кнопок выполнения квестов (на странице challenges.html)
  function setupChallengeButtons() {
    const challengeButtons = document.querySelectorAll('.challenge-btn');
    challengeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const challengeId = parseInt(button.getAttribute('data-challenge-id'));
        completeChallenge(challengeId);
        button.disabled = true;
        button.classList.add('opacity-50', 'cursor-not-allowed');
        button.textContent = 'Выполнено';
      });
    });
  }
  
  // Экспортируем функции для использования на других страницах
  window.completeChallenge = completeChallenge;
  window.getCompletedChallenges = getCompletedChallenges;
  window.setupChallengeButtons = setupChallengeButtons;