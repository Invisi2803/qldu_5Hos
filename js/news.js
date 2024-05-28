document.addEventListener('DOMContentLoaded', function() {
    fetch('../html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
    let selectedNews = null;
    let selectedMABT = null;
    fetch('../php/news/getNews.php')
        .then(response => response.json())
        .then(newss => {
            const newsListDiv = document.querySelector('.news-list');
            let tableHTML = "<table style='border-collapse: collapse; width: 100%;'>";
            tableHTML += `
                <tr>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Mã thông báo</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Tiêu đề</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Loại thông báo</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Nội dung</th>
                    <th style='background-color: #4CAF50; color: white; padding: 10px; text-align: left;'>Ngày đăng</th>
                </tr>
            `;

            newss.forEach(news => {
                tableHTML += `
                    <tr class="clickable-row" data-id="${news.MABANGTIN}" style='background-color: #f2f2f2;'>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${news.MABANGTIN}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${news.TIEUDE}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${news.LOAIBANGTIN}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${news.NOIDUNG}</td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>${news.NGAYDANG}</td>
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
                    selectedMABT = this.dataset.id; 
                    selectedNews = newss.find(news => news.MABANGTIN === selectedMABT);
                    console.log(selectedNews);
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

    const deleteButton = document.getElementById('delete-news');
    deleteButton.addEventListener('click', function() {
        const selectedNewsId = selectedMABT;
        if (selectedNewsId) {
            const confirmation = confirm('Bạn có chắc chắn muốn xóa thông báo này không?');
            if (confirmation) {
                deleteNews(selectedNewsId);
            }
        } 
    });

    const updateButton = document.getElementById('update-news');
    updateButton.addEventListener('click', function() {
        if (selectedNews) {
            openUpdateNewsForm(selectedNews);
        }
        else console.log(selectedNews);
    });
});

function openAddNewsForm() {
    document.getElementById("addNewsForm").style.display = "block";
}

function closeAddNewsForm() {
    document.getElementById("addNewsForm").style.display = "none";
}

function openUpdateNewsForm(news) {
    document.getElementById('update-news-id').value = news.MABANGTIN;
    document.getElementById('update-news-title').value = news.TIEUDE;
    document.getElementById('update-news-type').value = news.LOAIBANGTIN;
    document.getElementById('update-news-content').value = news.NOIDUNG;
    document.getElementById('update-news-time').value = news.NGAYDANG;
    document.getElementById('updateNewsForm').style.display = 'block';
}

function closeUpdateNewsForm() {
    document.getElementById("updateNewsForm").style.display = "none";
}

document.getElementById('add-news-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    fetch('../php/news/add_news.php', {
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

document.getElementById('update-news-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    var formData = new FormData(this); 

    fetch('../php/news/update_news.php', {
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

function deleteNews(newsId) {
    fetch('../php/news/delete_news.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newsId: newsId })
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



