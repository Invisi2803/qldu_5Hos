


document.addEventListener("DOMContentLoaded", function() {
    fetch('../html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    let selectedMANV = null;
    let selectedEmployee = null;

    fetch('../php/employee/getEmployees.php')
        .then(response => response.json())
        .then(employees => {
            const employeeListDiv = document.querySelector('.employee-list');
            let tableHTML = "<table style='border-collapse: collapse; width: 100%;'>";
            tableHTML += `
                <tr>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Mã NV</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Tên</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Ngày sinh</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Email</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Số điện thoại</th>
                </tr>
            `;

            employees.forEach(employee => {
                tableHTML += `
                    <tr class="clickable-row" data-id="${employee.MANV}" style='background-color: #f2f2f2;'>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.MANV}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.HOTEN}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.NGAYSINH}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.EMAIL}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${employee.SODT}</td>
                    </tr>
                `;
            });
            tableHTML += "</table>";
            employeeListDiv.innerHTML = tableHTML;

            document.querySelectorAll('.clickable-row').forEach(row => {
                row.addEventListener('click', function() {
                    document.querySelectorAll('.clickable-row').forEach(otherRow => {
                        otherRow.style.backgroundColor = "";
                    });
                    selectedMANV = this.dataset.id; 
                    selectedEmployee = employees.find(employee => employee.MANV === selectedMANV);               
                    this.style.backgroundColor = '#e0f7fa';
                });
            });

            document.getElementById("search-button").addEventListener("click", function() {
                var searchInput = document.getElementById("search-input").value.trim().toLowerCase();
                var rows = document.querySelectorAll('.clickable-row');
                rows.forEach(function(row) {
                    var employeeName = row.cells[0].textContent.toLowerCase();
                    row.style.display = employeeName.includes(searchInput) ? "" : "none";
                });
            });
        })
        .catch(error => console.error('Error:', error));

    const deleteButton = document.getElementById('delete-employee');
    deleteButton.addEventListener('click', function() {
        const selectedEmployeeId = selectedMANV;
        if (selectedEmployeeId) {
            const confirmation = confirm('Bạn có chắc chắn muốn xóa nhân viên này không?');
            if (confirmation) {
                deleteEmployee(selectedEmployeeId);
            }
        }
    });

    const updateButton = document.getElementById('update-employee');
    updateButton.addEventListener('click', function() {
        if (selectedEmployee) {
            openUpdateNVForm(selectedEmployee);
        } 
    });
});

function openAddNVForm() {
    document.getElementById("addEmployeeForm").style.display = "block";
}

function closeAddNVForm() {
    document.getElementById("addEmployeeForm").style.display = "none";
}


function openUpdateNVForm(employee) {
    document.getElementById('update-employee-id').value = employee.MANV;
    document.getElementById('update-employee-name').value = employee.HOTEN;
    document.getElementById('update-employee-dob').value = employee.NGAYSINH;
    document.getElementById('update-employee-gender').value = employee.GIOITINH;
    document.getElementById('update-employee-phone').value = employee.SODT;
    document.getElementById('update-employee-dept').value = employee.TENPHONG;
    document.getElementById('update-employee-role').value = employee.CHUCVU;
    document.getElementById('update-employee-address').value = employee.DIACHI;
    document.getElementById('update-employee-email').value = employee.EMAIL;
    document.getElementById('updateEmployeeForm').style.display = 'block';
}

function closeUpdateNVForm() {
    document.getElementById('updateEmployeeForm').style.display = 'none';
}

document.getElementById('add-employee-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    fetch('../php/employee/add_employee.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); 
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


document.getElementById('update-employee-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    var formData = new FormData(this); 

    fetch('../php/employee/update_employee.php', {
        method: 'POST',
        body: formData 
    })
    .then(response => response.text())
    .then(data => {
        alert(data); 
        window.location.reload(); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function deleteEmployee(employeeId) {
    fetch('../php/employee/delete_employee.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employeeId: employeeId })
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

document.getElementById('new-employee-photo').addEventListener('change', function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('new-employee-photo-preview').setAttribute('src', e.target.result);
            document.getElementById('new-employee-photo-preview').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

