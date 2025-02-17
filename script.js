document.addEventListener("DOMContentLoaded", function () {
    loadNotes(); // تحميل الملاحظات عند فتح الصفحة
});

// حفظ الملاحظة في Local Storage
function saveNote() {
    let userId = document.getElementById("userIdInput").value.trim();
    let noteText = document.getElementById("noteInput").value.trim();

    if (userId === "" || noteText === "") {
        alert("يجب ملء جميع الحقول قبل الحفظ!");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ userId, noteText });

    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("userIdInput").value = "";
    document.getElementById("noteInput").value = ""; // مسح الحقول بعد الحفظ

    loadNotes(); // تحديث القائمة
}

// تحميل الملاحظات وعرضها
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    if (notes.length === 0) {
        notesList.innerHTML = "<p>🚫 لا توجد ملاحظات حتى الآن.</p>";
    } else {
        notes.forEach((note, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>🆔 المستخدم ${note.userId}:</strong> ${note.noteText}`;

            // إضافة زر حذف
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
    notes.splice(index, 1); // حذف الملاحظة من المصفوفة
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes(); // تحديث العرض
}
