document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const hamburger = document.getElementById("hamburger");

    // فتح وإغلاق القائمة عند النقر على زر الهامبرغر
    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    // إرسال الرسالة عبر البريد الإلكتروني
    document.getElementById("message-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        window.location.href = `mailto:${email}?subject=رسالة من GSOS&body=${encodeURIComponent(message)}`;

        // عرض رسالة النجاح لفترة قصيرة
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    });
});
