
document.addEventListener('DOMContentLoaded', function() {
    fetch('../html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
    let selectedRequest = null;
    let selectedMAYC = null;
    fetch('../php/request/getRequest.php')
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
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Người gửi</th>
                    
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
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${request.MANV}</td>
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
            document.getElementById("search-button").addEventListener("click", function() {
                var searchInput = document.getElementById("search-input").value.trim().toLowerCase();
                var rows = document.querySelectorAll('.clickable-row');
                rows.forEach(function(row) {
                    var newsID = row.cells[0].textContent.toLowerCase();
                    row.style.display = newsID.includes(searchInput) ? "" : "none";
                });
            });
        })
        .catch(error => console.error('Error:', error));
        const approveButton = document.getElementById('approve-request');
        approveButton.addEventListener('click', function() {
        const selectedRequestId = selectedMAYC;
        if (selectedRequestId) {
            const confirmation = confirm('Bạn có chắc chắn muốn phê duyệt yêu cầu này không?');
            if (confirmation) {
                approveRequest(selectedRequestId);
            }
        } 
    });
    });

function approveRequest(requestId) {
    fetch('../php/request/approve_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requestId: requestId })
    })
    .then(response => response.text())
    .then(data => {
        alert(data); 
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
