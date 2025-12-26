const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzrVsgnMjkyXmAY41ANplUtK44cfrz_1bjifELDEbPlxDZsCDwnib8M_26JM7souz1q/exec';

// 1. Hàm thêm dòng mới
function addRow() {
    const table = document.getElementById("purchaseTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td><input type="date" name="date[]" required></td>
        <td><input type="text" name="material[]" placeholder="Tên nguyên liệu" required></td>
        <td><input type="text" name="supplier[]" placeholder="Nhà cung cấp" required></td>
        <td><input type="number" name="quantity[]" placeholder="0" min="1" required></td>
        <td><input type="text" name="purpose[]" placeholder="Sản xuất/Kho..."></td>
        <td><input type="text" name="unit[]" placeholder="kg/g/cái" required></td>
        <td><button type="button" class="btn-delete" onclick="deleteRow(this)">Xóa</button></td>
    `;
}

// 2. Hàm xóa dòng
function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    const rowCount = document.getElementById("purchaseTable").rows.length;
    if (rowCount > 2) {
        row.parentNode.removeChild(row);
    } else {
        alert("Phải có ít nhất một dòng dữ liệu!");
    }
}

// 3. Xử lý gửi dữ liệu khi nhấn Lưu
document.getElementById('purchaseForm').onsubmit = function(e) {
    e.preventDefault();
    
    const table = document.getElementById("purchaseTable");
    const rows = table.getElementsByTagName('tbody')[0].rows;
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        data.push({
            date: rows[i].querySelector('input[name="date[]"]').value,
            material: rows[i].querySelector('input[name="material[]"]').value,
            supplier: rows[i].querySelector('input[name="supplier[]"]').value,
            quantity: rows[i].querySelector('input[name="quantity[]"]').value,
            purpose: rows[i].querySelector('input[name="purpose[]"]').value,
            unit: rows[i].querySelector('input[name="unit[]"]').value
        });
    }

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("Gửi dữ liệu thành công! Hãy kiểm tra Google Sheet.");
        document.getElementById('purchaseForm').reset();
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert("Có lỗi xảy ra khi gửi.");
    });
}; // Dấu đóng ngoặc này cực kỳ quan trọng!
