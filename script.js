// JavaScript للتحكم في فتح وإغلاق القائمة على الهواتف
const menuToggle = document.getElementById('menuToggle'); // الحصول على زر القائمة
const navLinks = document.querySelector('.nav-links'); // الحصول على عنصر قائمة الروابط
const navbar = document.querySelector('.navbar'); // الحصول على عنصر الشريط العلوي



// إضافة مستمع حدث للنقر على زر القائمة
menuToggle.addEventListener('click', function (e) {
    e.stopPropagation(); // منع انتشار الحدث إلى العناصر الأم
    navLinks.classList.toggle('active'); // تبديل class active للقائمة
    menuToggle.classList.toggle('active'); // تبديل class active للزر
});

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active'); // إزالة class active للقائمة
        menuToggle.classList.remove('active'); // إزالة class active للزر
    });
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) { // إذا كان النقر خارج الشريط العلوي
        navLinks.classList.remove('active'); // إزالة class active للقائمة
        menuToggle.classList.remove('active'); // إزالة class active للزر
    }
});

// منع إغلاق القائمة عند النقر عليها
navLinks.addEventListener('click', (e) => {
    e.stopPropagation(); // منع انتشار الحدث إلى العناصر الأم
});



// كود JavaScript لإدارة اختيار الخيارات
document.addEventListener('DOMContentLoaded', function () {
    // الحصول على جميع عناصر الخيارات
    const optionCards = document.querySelectorAll('.option-card');

    // إضافة مستمع حدث لكل خيار
    optionCards.forEach(card => {
        card.addEventListener('click', function () {
            // إزالة class active من جميع الخيارات
            optionCards.forEach(c => c.classList.remove('active'));

            // إضافة class active للخيار المحدد
            this.classList.add('active');

            // هنا يمكنك حفظ القيمة المحددة لاستخدامها لاحقاً
            const selectedValue = this.getAttribute('data-value');
            console.log('تم اختيار: ' + selectedValue);
        });
    });

    // إضافة مستمع حدث للنموذج
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        // الحصول على الخيار المحدد
        const selectedOption = document.querySelector('.option-card.active');
        const searchInput = document.querySelector('.search-input').value;

        if (!selectedOption) {
            alert('يرجى اختيار نوع العملية (بيع، شراء، إيجار)'); // رسالة تنبيه
            return;
        }

        const optionValue = selectedOption.getAttribute('data-value');

        // هنا يمكنك إضافة الكود للتعامل مع البحث
        console.log('نوع العملية: ' + optionValue);
        console.log('نص البحث: ' + searchInput);

        // توجيه المستخدم إلى صفحة النتائج أو عرض النتائج
        alert('سيتم البحث عن: ' + searchInput + ' في قسم: ' + optionValue);
    });
});



// دالة لجلب بيانات العقارات من ملف JSON
async function fetchProperties() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data.properties;
    } catch (error) {
        console.error('Error loading properties:', error);
        return [];
    }
}

// دالة لعرض العقارات في الصفحة الرئيسية
async function displayProperties() {
    const propertiesContainer = document.getElementById('propertiesContainer');
    const properties = await fetchProperties();

    propertiesContainer.innerHTML = ''; // مسح المحتوى الحالي

    properties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <div class="property-image">
                <span class="property-status">${property.type === 'بيع' ? 'للبيع' : 'للإيجار'}</span>
                <img src="${property.images[0]}" alt="${property.address}">
            </div>
            <div class="property-details">
                <div class="property-price">${property.price}</div>
                <div class="property-address">${property.address}</div>
                <div class="property-features">
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        <span>${property.rooms}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.area}</span>
                    </div>
                </div>
                <a href="property-details.html?id=${property.id}" class="property-btn">عرض التفاصيل</a>
            </div>
        `;
        propertiesContainer.appendChild(card);
    });
}

// تشغيل دالة العرض عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayProperties);