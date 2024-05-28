document.addEventListener('DOMContentLoaded', function() {
    fetch('../html/header_nv.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
    let selectedMeeting = null;
    let selectedMALH = null;
    fetch('../php/meeting/getMeetings.php')
        .then(response => response.json())
        .then(meetings => {
            const meetingListDiv = document.querySelector('.meeting-list');
            let tableHTML = "<table style='border-collapse: collapse; width: 100%;'>";
            tableHTML += `
                <tr>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Mã lịch họp</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Tên cuộc họp</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Nội dung</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Thời gian</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Phòng họp</th>
                </tr>
            `;

            meetings.forEach(meeting => {
                tableHTML += `
                    <tr class="clickable-row" data-id="${meeting.MALICHHOP}" style='background-color: #f2f2f2;'>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${meeting.MALICHHOP}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${meeting.TENLICHHOP}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${meeting.NOIDUNG}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${meeting.THOIGIAN}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${meeting.DIADIEM}</td>
                    </tr>
                `;
            });

            tableHTML += "</table>";
            meetingListDiv.innerHTML = tableHTML;

            document.querySelectorAll('.clickable-row').forEach(row => {
                row.addEventListener('click', function() {
                    document.querySelectorAll('.clickable-row').forEach(otherRow => {
                        otherRow.style.backgroundColor = "";
                    });
                    selectedMALH = this.dataset.id; 
                    selectedMeeting = meetings.find(meeting => meeting.MALICHHOP === selectedMALH);
                    console.log(selectedMeeting);
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


});

function openAddLHForm() {
    document.getElementById("addMeetingForm").style.display = "block";
}

function closeAddLHForm() {
    document.getElementById("addMeetingForm").style.display = "none";
}



document.getElementById('add-meeting-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    fetch('../php/meeting/add_meeting.php', {
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



