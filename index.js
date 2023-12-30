function openModal(){
    const modal = document.getElementsByClassName("modal_window")[0];
    modal.style.display = 'flex';
}
function closeModal(){
    const modal = document.getElementsByClassName("modal_window")[0];
    modal.style.display = 'none';
}
function handleFile(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            // 여기에서 파일 내용을 이용한 작업을 수행할 수 있습니다.
            document.getElementById('data_csv').textContent = content;
        };

        reader.readAsText(file);
    }
}
function data_parse(){
    const temp = {};
    const data = document.getElementById('data_csv').value;
    const lines = data.split('\n');
    lines.forEach(line => {
        const j_data = line.split(',');

        if (j_data.length > 1 && j_data[1] === '입금' && j_data[j_data.length - 2] !== '예금이자') {
            const date_str = j_data[0].trim();
            const date_obj = new Date(date_str).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit' });
            const name = j_data[j_data.length - 1].trim();
            const price = parseInt(j_data[2].replace(",", ""), 10);

            if (!temp[name]) {
                temp[name] = {
                date: [date_obj],
                price: price,
                };
            } else {
                temp[name]['date'].push(date_obj);
                temp[name]['price'] += price;
            }
        }
    });

    const div = document.getElementsByClassName('cont_txt')[0];

    for (const key in temp) {
        const d = temp[key];
        let str = `<p>${key}의 입금 총액 : ${d['price']}<br />입금 횟수 : ${d['date'].length}<p>`;
        div.insertAdjacentHTML('beforeend', str);
    }

    closeModal();
}