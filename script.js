document.addEventListener("DOMContentLoaded", function () {
    // توليد رقم تعريف خاص بالمستخدم إذا لم يكن موجودًا مسبقًا
    if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", Math.floor(100000 + Math.random() * 900000));
    }
    document.getElementById("currentUserId").textContent = localStorage.getItem("userId");

    loadBlogs(); // تحميل مدونات المستخدم الحالي عند تشغيل الصفحة
});

// حفظ المدونة في Local Storage بناءً على رقم التعريف الحالي
function saveBlog() {
    let blogText = document.getElementById("blogInput").value.trim();
    if (blogText === "") return;

    let userId = localStorage.getItem("userId");
    let userBlogs = JSON.parse(localStorage.getItem(`blogs_${userId}`)) || [];
    userBlogs.push(blogText);

    localStorage.setItem(`blogs_${userId}`, JSON.stringify(userBlogs));

    document.getElementById("blogInput").value = ""; // مسح الحقل بعد الحفظ
    loadBlogs(); // تحديث القائمة
}

// تحميل المدونات الخاصة بالمستخدم الحالي فقط
function loadBlogs() {
    let userId = localStorage.getItem("userId");
    let blogs = JSON.parse(localStorage.getItem(`blogs_${userId}`)) || [];
    
    let blogList = document.getElementById("blogList");
    blogList.innerHTML = ""; // مسح القائمة قبل إعادة التحميل

    if (blogs.length === 0) {
        blogList.innerHTML = "<p>🚫 لا توجد مدونات متاحة.</p>";
    } else {
        blogs.forEach((blog, index) => {
            let li = document.createElement("li");
            li.textContent = blog;

            // إضافة زر الحذف
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑 حذف";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = function () {
                deleteBlog(index);
            };

            li.appendChild(deleteBtn);
            blogList.appendChild(li);
        });
    }
}

// حذف مدونة معينة للمستخدم الحالي
function deleteBlog(index) {
    let userId = localStorage.getItem("userId");
    let blogs = JSON.parse(localStorage.getItem(`blogs_${userId}`)) || [];

    blogs.splice(index, 1); // حذف العنصر من المصفوفة
    localStorage.setItem(`blogs_${userId}`, JSON.stringify(blogs));

    loadBlogs(); // إعادة تحميل المدونات
}
