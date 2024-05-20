document.addEventListener('DOMContentLoaded', function() {
    fetch('../php/getEmployees.php')
    .then(response => response.json())
    .then(employees => {
        const employeeListDiv = document.querySelector('.employee-list');
        let tableHTML = "<table style='border-collapse: collapse; width: 100%;'>";
        tableHTML += `
            <tr>
                <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Mã NV</th>
                <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Tên</th>
                <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Ngày sinh</th>
            </tr>
        `;

        employees.forEach(employee => {
            tableHTML += `
                <tr class="clickable-row" data-id="${employee.MANV}" style='background-color: #f2f2f2;'>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.MANV}</td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.HOTEN}</td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.NGAYSINH}</td>
                </tr>
            `;
        });

        tableHTML += "</table>";
        employeeListDiv.innerHTML = tableHTML;

        document.querySelectorAll('.clickable-row').forEach(row => {
            row.addEventListener('click', function() {
                // Xóa kiểu 'selected' khỏi tất cả các dòng khác
                document.querySelectorAll('.clickable-row').forEach(otherRow => {
                    otherRow.style.backgroundColor = ""; // Đặt lại màu nền
                });

                // Đặt màu nền cho dòng được click
                this.style.backgroundColor = '#e0f7fa'; // Màu xanh lợt
            });
        });
    })
    .catch(error => console.error('Error:', error));
});
