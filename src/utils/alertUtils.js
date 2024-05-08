import Swal from 'sweetalert2';

export function showAlert(title, icon, timer) {
	Swal.fire({
		position: 'center',
		icon: icon,
		width: 350,
		title: `<div style="font-size: 18px; font-family: 'Noto Sans KR', sans-serif;">${title}</div>`,
		showConfirmButton: false,
		timer: timer,
	});
}
