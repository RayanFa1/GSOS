document.addEventListener("DOMContentLoaded", function () {
    loadNotes(); // تحميل الملاحظات عند فتح الصفحة
});

// حفظ الملاحظة في Local Storage
function saveNote() {
    let userId = document.getElementById("userIdInput").value.trim();
    let noteText = document.getElementById("noteInput").value.trim();

    // التحقق من أن الحقول غير فارغة
    if (userId === "" || noteText === "") {
        alert("يجب ملء جميع الحقول قبل الحفظ!");
        return;
    }

    // الحصول على الملاحظات المخزنة مسبقًا أو إنشاء مصفوفة جديدة
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    
    // إضافة الملاحظة الجديدة إلى المصفوفة
    notes.push({ userId, noteText, timestamp: new Date().toLocaleString() });

    // تخزين المصفوفة المحدّثة في Local Storage
    localStorage.setItem("notes", JSON.stringify(notes));

    // مسح الحقول بعد الحفظ
    document.getElementById("userIdInput").value = "";
    document.getElementById("noteInput").value = "";

    // إعادة تحميل الملاحظات لعرضها في القائمة
    loadNotes();
}

// تحميل وعرض الملاحظات المحفوظة
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    if (notes.length === 0) {
        notesList.innerHTML = "<p>🚫 لا توجد ملاحظات حتى الآن.</p>";
    } else {
        notes.forEach((note, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>🆔 المستخدم ${note.userId}:</strong> ${note.noteText} 
                            <br>📅 <small>${note.timestamp}</small>`;

            // زر حذف لكل ملاحظة
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑 حذف";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = function () {
                deleteNote(index);
            };

            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }
}

// حذف ملاحظة معينة
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1); // إزالة الملاحظة المحددة من المصفوفة
    localStorage.setItem("notes", JSON.stringify(notes)); // تحديث Local Storage
    loadNotes(); // تحديث العرض
}
