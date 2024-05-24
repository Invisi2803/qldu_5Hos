document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/header_nv.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});

document.addEventListener('DOMContentLoaded', (event) => {
    const dateField = document.getElementById('new-request-time');
    const today = new Date().toISOString().split('T')[0];
    dateField.value = today;
});

document.addEventListener('DOMContentLoaded', function() {
    let selectedRequest = null;
    let selectedMAYC = null;
    fetch('../php/request/getRequestNV.php')
        .then(response => response.json())
        .then(requests => {
            const newsListDiv = document.querySelector('.request-list');
            let tableHTML = "<table style='border-collapse: collapse; width: 100%;'>";
            tableHTML += `
                <tr>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Mã yêu cầu</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Loại yêu cầu</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Nội dung</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Ngày gửi</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Trạng thái</th>
                    
                </tr>
            `;

            requests.forEach(request => {
                tableHTML += `
                    <tr class="clickable-row" data-id="${request.MAYEUCAU}" style='background-color: #f2f2f2;'>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${request.MAYEUCAU}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${request.LOAIYEUCAU}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${request.NOIDUNG}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${request.NGAYGUI}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${request.TRANGTHAI}</td>
                    </tr>
                `;
            });

            tableHTML += "</table>";
            newsListDiv.innerHTML = tableHTML;

            document.querySelectorAll('.clickable-row').forEach(row => {
                row.addEventListener('click', function() {
                    document.querySelectorAll('.clickable-row').forEach(otherRow => {
                        otherRow.style.backgroundColor = "";
                    });
                    selectedMAYC = this.dataset.id; 
                    selectedRequest = requests.find(requests => requests.MAYEUCAU === selectedMAYC);
                    console.log(selectedMAYC);
                    this.style.backgroundColor = '#e0f7fa';
                });
            });
        })
        .catch(error => console.error('Error:', error));
    });
    
function openAddRequestForm() {
    document.getElementById("addRequestForm").style.display = "block";
}

function closeAddRequestForm() {
    document.getElementById("addRequestForm").style.display = "none";
}

document.getElementById('add-request-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    fetch('../php/request/add_request.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); 
        alert(data);
        window.location.reload(); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
