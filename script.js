document.addEventListener("DOMContentLoaded", function () {
    // توليد رقم تعريف خاص بالمستخدم إذا لم يكن موجودًا مسبقًا
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

// تحميل المدونات المحفوظة وعرضها في القائمة مع زر الحذف
function loadBlogs() {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    let blogList = document.getElementById("blogList");
    blogList.innerHTML = ""; // مسح القائمة قبل إعادة التحميل

    blogs.forEach((blog, index) => {
        let li = document.createElement("li");
        li.textContent = blog;

        // إنشاء زر الحذف
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.onclick = function () {
            deleteBlog(index);
        };

        li.appendChild(deleteButton);
        blogList.appendChild(li);
    });
}

// حذف المدونة بناءً على الفهرس
function deleteBlog(index) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.splice(index, 1); // إزالة المدونة من المصفوفة
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs(); // تحديث القائمة بعد الحذف
}
