document.addEventListener("DOMContentLoaded", function () {
    // التحقق من وجود رقم تعريف محفوظ، وإنشاء واحد جديد إذا لم يكن موجودًا
    if (!localStorage.getItem("currentUserId")) {
        localStorage.setItem("currentUserId", Math.floor(100000 + Math.random() * 900000));
    }
    document.getElementById("currentUserId").textContent = localStorage.getItem("currentUserId");

    // تحميل المدونات الخاصة بالمستخدم الحالي
    loadBlogs();
});

// وظيفة تسجيل الدخول لمستخدم آخر
function login() {
    let inputUserId = document.getElementById("userIdInput").value.trim();
    if (inputUserId === "") {
        alert("يرجى إدخال رقم تعريف صحيح!");
        return;
    }

    // حفظ رقم التعريف الجديد في Local Storage
    localStorage.setItem("currentUserId", inputUserId);
    document.getElementById("currentUserId").textContent = inputUserId;

    // تحديث قائمة المدونات الخاصة بالمستخدم الجديد
    loadBlogs();
}

// حفظ المدونة بناءً على رقم التعريف الحالي
function saveBlog() {
    let blogText = document.getElementById("blogInput").value.trim();
    if (blogText === "") return;

    let currentUserId = localStorage.getItem("currentUserId");
    let userBlogs = JSON.parse(localStorage.getItem(`blogs_${currentUserId}`)) || [];
    userBlogs.push(blogText);

    localStorage.setItem(`blogs_${currentUserId}`, JSON.stringify(userBlogs));
    document.getElementById("blogInput").value = ""; // مسح الحقل بعد الحفظ
    loadBlogs(); // تحديث القائمة
}

// تحميل المدونات الخاصة بالمستخدم الحالي
function loadBlogs() {
    let currentUserId = localStorage.getItem("currentUserId");
    let blogs = JSON.parse(localStorage.getItem(`blogs_${currentUserId}`)) || [];
    let blogList = document.getElementById("blogList");

    blogList.innerHTML = ""; // مسح القائمة قبل إعادة تحميلها

    blogs.forEach((blog, index) => {
        let li = document.createElement("li");
        li.textContent = blog;

        // إنشاء زر الحذف لكل مدونة
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
    let currentUserId = localStorage.getItem("currentUserId");
    let blogs = JSON.parse(localStorage.getItem(`blogs_${currentUserId}`)) || [];

    blogs.splice(index, 1); // إزالة المدونة من المصفوفة
    localStorage.setItem(`blogs_${currentUserId}`, JSON.stringify(blogs));
    loadBlogs(); // تحديث القائمة بعد الحذف
}
