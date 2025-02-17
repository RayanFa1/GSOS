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

// تحميل المدونات الخاصة بالمستخدم الحالي
function loadBlogs() {
    let userId = localStorage.getItem("userId");
    let blogs = JSON.parse(localStorage.getItem(`blogs_${userId}`)) || [];
    displayBlogs(blogs, "📜 مدوناتك المحفوظة:", true);
}

// عرض مدونات مستخدم آخر دون تغيير الحساب
function viewOtherUserBlogs() {
    let otherUserId = document.getElementById("otherUserIdInput").value.trim();
    
    if (otherUserId === "") {
        alert("يرجى إدخال رقم تعريف صحيح!");
        return;
    }

    let otherUserBlogs = JSON.parse(localStorage.getItem(`blogs_${otherUserId}`)); // محاولة جلب المدونات

    if (!otherUserBlogs || otherUserBlogs.length === 0) {
        document.getElementById("blogList").innerHTML = "<p>🚫 لا توجد مدونات لهذا المستخدم.</p>";
        document.getElementById("blogListTitle").textContent = `📜 مدونات المستخدم ${otherUserId}:`;
        return;
    }

    displayBlogs(otherUserBlogs, `📜 مدونات المستخدم ${otherUserId}:`, false);
}

// دالة لعرض المدونات وتحديث العنوان مع إضافة زر حذف للمستخدم الحالي فقط
function displayBlogs(blogs, title, allowDelete) {
    let blogList = document.getElementById("blogList");
    let blogListTitle = document.getElementById("blogListTitle");

    blogList.innerHTML = ""; // مسح القائمة قبل إعادة التحميل
    blogListTitle.textContent = title; // تحديث العنوان

    if (blogs.length === 0) {
        blogList.innerHTML = "<p>🚫 لا توجد مدونات متاحة.</p>";
    } else {
        blogs.forEach((blog, index) => {
            let li = document.createElement("li");
            li.textContent = blog;

            // إضافة زر الحذف إذا كان المستخدم الحالي هو الذي يشاهد مدوناته الخاصة
            if (allowDelete) {
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "🗑 حذف";
                deleteBtn.className = "delete-btn";
                deleteBtn.onclick = function () {
                    deleteBlog(index);
                };
                li.appendChild(deleteBtn);
            }

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
