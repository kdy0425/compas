//전체메뉴 컨트롤
const navAllBtn = document.querySelector('.nav_all');
const nav = document.querySelector('#nav');
navAllBtn.addEventListener('click', function () {
	nav.classList.toggle('active');
	navAllBtn.classList.toggle('active');
});
const body = document.querySelector('body');
body.addEventListener('click', function (event) {
	if (event.target.closest('.hd_bottom') || event.target.closest('#nav') || event.target.closest('.nav_all')) {
		return;
	}
	nav.classList.remove('active');
	navAllBtn.classList.remove('active');
});

//tap box 컨트롤
function showTab(btn) {
	let index = Array.prototype.indexOf.call(btn.parentNode.children, btn);
	let tabBoxes = btn.parentNode.nextElementSibling.children;
	for (let i = 0; i < tabBoxes.length; i++) {
		tabBoxes[i].style.display = "none";
		tabBoxes[i].classList.remove("active_tab");
	}
	let activeTab = tabBoxes[index];
	activeTab.style.display = "block";
	activeTab.classList.add("active_tab");
	let tabButtons = btn.parentNode.children;
	for (let i = 0; i < tabButtons.length; i++) {
		tabButtons[i].classList.remove("active");
	}
	btn.classList.add("active");
}

//input에 clear클래스있으면 지우는 기능활성화
function createClearButton(inputElement) {
	const button = document.createElement('button');
	button.innerHTML = '지우기';
	button.type = 'button';
	button.className = 'ip_clear';
	button.onclick = () => {
		inputElement.value = '';
		button.remove();
	};

	return button;
}

function onInputChange(event) {
	const inputElement = event.target;
	const clearButton = inputElement.parentElement.querySelector('.ip_clear');

	if (inputElement.value && !clearButton) {
		inputElement.parentElement.appendChild(createClearButton(inputElement));
	} else if (!inputElement.value && clearButton) {
		clearButton.remove();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const inputs = document.querySelectorAll('.ip .clear');

	inputs.forEach((input) => {
		input.addEventListener('input', onInputChange);

		if (input.value) {
			input.parentElement.appendChild(createClearButton(input));
		}
	});
});

//datepicker 호출 yyyy mm dd
document.addEventListener("DOMContentLoaded", function () {
	let datepickerIcons = document.getElementsByClassName('datepicker_icon');
	for (let i = 0; i < datepickerIcons.length; i++) {
		new Litepicker({
			lang: 'ko-KR',
			format: 'YYYY-MM-DD',
			element: datepickerIcons[i],
			buttonText: {
				previousMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`,
				nextMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`,
			},
		});
	}
});

//input 최대값 계산
document.addEventListener('input', function (event) {
	if (event.target.matches('.max_text')) {
		let tsVal = event.target.value;
		let numChar = tsVal.length;
		const maxNum = event.target.getAttribute('maxlength');
		let lenDisplay = event.target.closest('.input_group').querySelector('.max_len b');
		if (numChar > maxNum) {
			event.target.value = tsVal.substr(0, maxNum);
			lenDisplay.textContent = numChar;
		} else {
			lenDisplay.textContent = numChar;
		}
	}
});

//input 최대값 계산 _ 페이지 로드 시 최대값 계산해서 출력
const maxLenSpans = document.querySelectorAll('.max_len');
maxLenSpans.forEach(function (maxLenSpan) {
	let numChar = maxLenSpan.closest('.input_group').querySelector('.max_text').value.length;
	maxLenSpan.querySelector('b').textContent = numChar;
});


//input tel 숫자만 입력
function allowOnlyNumbersForTelInputs() {
	const telInputs = document.querySelectorAll('input[type="tel"]');
	telInputs.forEach(function (telInput) {
		telInput.addEventListener('input', function () {
			this.value = this.value.replace(/[^0-9]/g, '');
		});
	});
}
allowOnlyNumbersForTelInputs();

//체크박스 전체 체크 
document.querySelectorAll('.label_control').forEach(function (labelControl) {
	labelControl.addEventListener('change', function (event) {
		const target = event.target;
		if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
			const isChecked = target.checked;
			const checkboxes = labelControl.querySelectorAll('input[type="checkbox"]');
			checkboxes.forEach(function (checkbox) {
				checkbox.checked = isChecked;
			});
			if (!isChecked) {
				target.checked = false; // check_all 비활성화
			}
		} else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
			const checkAllCheckbox = labelControl.querySelector('.check_all');
			if (checkAllCheckbox) {
				checkAllCheckbox.checked = false; // check_all 비활성화
			}
		}
	});
});


/* 년도 셀렉트박스
data-start-year가 빈값이면 현재 년도부터 data-end-year까지 출력
data-end-year가 빈값이면 현재 data-start-year부터 현재까지 출력
둘다 값이 있으면 data-start-year 부터 data-end-year 까지 출력
<select class="form-select year-select" data-start-year="2010" data-end-year="" data-select-year="2020"></select>
*/
const currentYear = new Date().getFullYear();
const yearSelects = document.querySelectorAll('.year_select');

yearSelects.forEach((yearSelect) => {
	const startYear = yearSelect.dataset.startYear ? parseInt(yearSelect.dataset.startYear) : currentYear;
	const endYear = yearSelect.dataset.endYear ? parseInt(yearSelect.dataset.endYear) : currentYear;

	// 선택된 연도가 있는 경우
	const selectedYear = yearSelect.dataset.selectYear ? parseInt(yearSelect.dataset.selectYear) : null;

	for (let year = startYear; year <= endYear; year++) {
		const option = document.createElement('option');
		option.value = year;
		option.text = year;

		// 선택된 연도일 경우, 해당 옵션을 선택 상태로 만듦
		if (selectedYear && year === selectedYear) {
			option.selected = true;
		}

		yearSelect.appendChild(option);
	}
});

/* 월  셀렉트박스
data-start-month data-end-month 둘다 빈값이면 1~12까지 출력
data-start-month data-end-month의 값이 있으면 해당 값만큼 출력
data-start-month만 값이있으면 data-start-month값 부터 12까지 출력
data-end-month값만 있으면 1 ~ data-start-month까지 출력
<select class="form-select month-select" data-start-month="" data-end-month="" data-select-month="5"></select>
*/
const currentMonth = new Date().getMonth() + 1;
const monthSelects = document.querySelectorAll('.month_select');

monthSelects.forEach((monthSelect) => {
	const startMonth = monthSelect.dataset.startMonth ? parseInt(monthSelect.dataset.startMonth) : 1;
	const endMonth = monthSelect.dataset.endMonth ? parseInt(monthSelect.dataset.endMonth) : 12;
	const selectMonth = monthSelect.dataset.selectMonth ? parseInt(monthSelect.dataset.selectMonth) : currentMonth;

	for (let month = startMonth; month <= endMonth; month++) {
		const option = document.createElement('option');
		option.value = month;
		option.text = month;
		if (month === selectMonth) {
			option.selected = true;
		}
		monthSelect.appendChild(option);
	}
});

//시작날짜 종료날짜 버튼으로 날짜 변경 
const dateControlBoxes = document.querySelectorAll('.date_control_box');
dateControlBoxes.forEach(function (dateControlBox) {
	const startDateInput = dateControlBox.querySelector('.startDate');
	const endDateInput = dateControlBox.querySelector('.endDate');
	const radioInputs = dateControlBox.querySelectorAll('.date_control');

	radioInputs.forEach(function (radioInput) {
		radioInput.addEventListener('change', function () {
			const value = this.value;

			let startDate, endDate;
			if (value === 'today') {
				startDate = new Date();
				endDate = new Date();
			} else if (value === 'week') {
				endDate = new Date();
				startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
			} else if (!isNaN(Number(value))) {
				const months = Number(value);
				endDate = new Date();
				startDate = new Date(endDate.getFullYear(), endDate.getMonth() - months, endDate.getDate());
			}
			startDateInput.value = formatDate(startDate);
			endDateInput.value = formatDate(endDate);
		});
	});
});

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// 파일 추가 이벤트 등록
function fileSizeInMB(fileSize) {
	return fileSize / (1024 * 1024);
}

document.addEventListener('DOMContentLoaded', () => {
	const inputGroups = document.querySelectorAll('.input_group');

	inputGroups.forEach(inputGroup => {
		const inputFile = inputGroup.querySelector('.file_add');
		const deleteButton = inputGroup.querySelector('button');

		if (inputFile && deleteButton) {
			deleteButton.addEventListener('click', () => {
				inputFile.value = '';
			});

			inputFile.addEventListener('change', () => {
				const files = inputFile.files;
				const allowedTypes = inputFile.getAttribute('file-type').split(' ');
				const maxSize = parseInt(inputFile.getAttribute('file-max-size'), 10);
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					if (!allowedTypes.includes(file.type.split('/')[1]) || fileSizeInMB(file.size) > maxSize) {
						alert('업로드 불가능한 파일입니다. 파일 확장자 및 용량을 확인하세요.');
						inputFile.value = '';
						break;
					}
				}
			});

		}
	});

});


//레이어 팝업
function layerToggle(elm , display){
	if(display === 'open'){
		document.getElementById(elm).style.display = 'block'
	}else if (display === 'close'){
		document.getElementById(elm).style.display = 'none'
	}
}

