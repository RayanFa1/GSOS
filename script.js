document.addEventListener("DOMContentLoaded", function () {
    // توليد رقم تعريف خاص للمستخدم إذا لم يكن موجودًا مسبقًا
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

// تحميل المدونات الخاصة بالمستخدم الحالي
function loadBlogs() {
    let userId = localStorage.getItem("userId");
    let blogs = JSON.parse(localStorage.getItem(`blogs_${userId}`)) || [];
    displayBlogs(blogs, "مدوناتك المحفوظة:");
}

// عرض مدونات مستخدم آخر دون تغيير الحساب
function viewOtherUserBlogs() {
    let otherUserId = document.getElementById("otherUserIdInput").value.trim();
    
    if (otherUserId === "") {
        alert("يرجى إدخال رقم تعريف صحيح!");
        return;
    }

    let otherUserBlogs = JSON.parse(localStorage.getItem(`blogs_${otherUserId}`)) || [];
    displayBlogs(otherUserBlogs, `مدونات المستخدم ${otherUserId}:`);
}

// دالة لعرض المدونات وتحديث العنوان
function displayBlogs(blogs, title) {
    let blogList = document.getElementById("blogList");
    let blogListTitle = document.getElementById("blogListTitle");

    blogList.innerHTML = ""; // مسح القائمة قبل إعادة التحميل
    blogListTitle.textContent = title; // تحديث العنوان

    if (blogs.length === 0) {
        blogList.innerHTML = "<p>لا توجد مدونات متاحة لهذا المستخدم.</p>";
    } else {
        blogs.forEach(blog => {
            let li = document.createElement("li");
            li.textContent = blog;
            blogList.appendChild(li);
        });
    }
}
