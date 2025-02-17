document.addEventListener("DOMContentLoaded", function () {
    // توليد رقم تعريف خاص للمستخدم إذا لم يكن موجودًا مسبقًا
    if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", Math.floor(100000 + Math.random() * 900000));
    }
    document.getElementById("userId").textContent = localStorage.getItem("userId");

    // تحميل المدونات المحفوظة عند تشغيل الصفحة
    loadBlogs();
});

// حفظ المدونة في Local Storage
function saveBlog() {
    let blogText = document.getElementById("blogInput").value.trim();
    if (blogText === "") return;

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(blogText);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    document.getElementById("blogInput").value = ""; // مسح الحقل بعد الحفظ
    loadBlogs(); // تحديث القائمة
}

// تحميل المدونات المحفوظة وعرضها في القائمة
function loadBlogs() {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    let blogList = document.getElementById("blogList");
    blogList.innerHTML = ""; // مسح القائمة قبل إعادة التحميل

    blogs.forEach(blog => {
        let li = document.createElement("li");
        li.textContent = blog;
        blogList.appendChild(li);
    });
}
