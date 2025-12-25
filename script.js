const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOmzOTu0kpVr1yNs4OT9nI9sh5rNGzh4kk6K7JiEyCJDq6gVNiQbmsGhuOSglNc-Ab/exec';

document.getElementById('purchaseForm').onsubmit = function(e) {
    e.preventDefault();
    
    const table = document.getElementById("purchaseTable");
    const rows = table.getElementsByTagName('tbody')[0].rows;
    const data = [];

    // Thu thập dữ liệu từ từng hàng
    for (let i = 0; i < rows.length; i++) {
        data.push({
            date: rows[i].querySelector('input[name="date[]"]').value,
            material: rows[i].querySelector('input[name="material[]"]').value,
            supplier: rows[i].querySelector('input[name="supplier[]"]').value,
            quantity: rows[i].querySelector('input[name="quantity[]"]').value,
            purpose: rows[i].querySelector('input[name="purpose[]"]').value
        });
    }

    // Gửi dữ liệu bằng Fetch API
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => {
        alert("Đã lưu dữ liệu vào Google Sheets thành công!");
        document.getElementById('purchaseForm').reset(); // Xóa form sau khi gửi
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert("Có lỗi xảy ra khi gửi dữ liệu.");
    });
};
