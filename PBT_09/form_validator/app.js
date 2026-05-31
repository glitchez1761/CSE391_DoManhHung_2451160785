const form = document.getElementById('registerForm');
const submitBtn = document.getElementById('submitBtn');

const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputPw = document.getElementById('inputPassword');
const inputConfirm = document.getElementById('inputConfirm');
const inputPhone = document.getElementById('inputPhone');

const strengthBar = document.getElementById('strengthBar');
const strengthLbl = document.getElementById('strength-label');
const togglePw = document.getElementById('togglePw');

const successModal = document.getElementById('successModal');
const modalInfo = document.getElementById('modalInfo');
const modalClose = document.getElementById('modalClose');

const validity = { name: false, email: false, password: false, confirm: false, phone: false };

function setField(group, fieldKey, isValid, msg) {
    group.classList.toggle('valid', isValid);
    group.classList.toggle('invalid', !isValid);

    const icon = group.querySelector('.field-icon');
    const msgEl = group.querySelector('.field-msg');
    if (icon) icon.textContent = isValid ? '✅' : '❌';
    if (msgEl) msgEl.textContent = msg || '';

    validity[fieldKey] = isValid;
    checkSubmit();
}

function clearField(group) {
    group.classList.remove('valid', 'invalid');
    const icon = group.querySelector('.field-icon');
    const msgEl = group.querySelector('.field-msg');
    if (icon) icon.textContent = '';
    if (msgEl) msgEl.textContent = '';
}

function checkSubmit() {
    const allValid = Object.values(validity).every(Boolean);
    submitBtn.disabled = !allValid;
}

inputName.addEventListener('input', function () {
    const val = this.value.trim();
    const group = document.getElementById('fg-name');
    if (!val) { clearField(group); validity.name = false; checkSubmit(); return; }

    if (val.length < 2) setField(group, 'name', false, 'Tên phải có ít nhất 2 ký tự.');
    else if (val.length > 50) setField(group, 'name', false, 'Tên không được quá 50 ký tự.');
    else setField(group, 'name', true, 'Tên hợp lệ ✓');
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
inputEmail.addEventListener('input', function () {
    const val = this.value.trim();
    const group = document.getElementById('fg-email');
    if (!val) { clearField(group); validity.email = false; checkSubmit(); return; }

    if (!val.includes('@')) setField(group, 'email', false, 'Email phải chứa ký tự @.');
    else if (!val.includes('.')) setField(group, 'email', false, 'Email phải chứa tên miền (vd: .com).');
    else if (!emailRegex.test(val)) setField(group, 'email', false, 'Định dạng email không hợp lệ.');
    else setField(group, 'email', true, 'Email hợp lệ ✓');
});

function measureStrength(pw) {
    if (pw.length === 0) return { level: 'none', score: 0 };
    if (pw.length < 8) return { level: 'weak', score: 1, label: '🔴 Yếu — cần ít nhất 8 ký tự' };

    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);

    if (hasUpper && hasLower && hasDigit && hasSpecial)
        return { level: 'strong', score: 3, label: '🟢 Mạnh — mật khẩu rất tốt!' };
    if ((hasLower || hasUpper) && hasDigit)
        return { level: 'medium', score: 2, label: '🟡 Trung bình — thêm ký tự đặc biệt & chữ hoa' };

    return { level: 'weak', score: 1, label: '🔴 Yếu — thêm số và ký tự đặc biệt' };
}

inputPw.addEventListener('input', function () {
    const val = this.value;
    const group = document.getElementById('fg-password');

    if (!val) {
        clearField(group);
        strengthBar.className = 'strength-bar';
        strengthLbl.textContent = '';
        strengthLbl.className = 'strength-label';
        validity.password = false;
        validateConfirm();
        checkSubmit();
        return;
    }

    const { level, label } = measureStrength(val);
    strengthBar.className = `strength-bar ${level === 'none' ? '' : level}`;
    strengthLbl.textContent = label || '';
    strengthLbl.className = `strength-label ${level}`;

    if (level === 'weak')
        setField(group, 'password', false, 'Mật khẩu quá yếu.');
    else
        setField(group, 'password', true, '');

    validateConfirm();
});

function validateConfirm() {
    const pw = inputPw.value;
    const val = inputConfirm.value;
    const group = document.getElementById('fg-confirm');

    if (!val) { clearField(group); validity.confirm = false; checkSubmit(); return; }

    if (val === pw)
        setField(group, 'confirm', true, 'Mật khẩu khớp ✓');
    else
        setField(group, 'confirm', false, 'Mật khẩu không khớp.');
}
inputConfirm.addEventListener('input', validateConfirm);

function formatPhone(raw) {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
}

inputPhone.addEventListener('input', function () {
    const rawDigits = this.value.replace(/\D/g, '');
    const formatted = formatPhone(this.value);
    this.value = formatted;

    const group = document.getElementById('fg-phone');
    if (!rawDigits) { clearField(group); validity.phone = false; checkSubmit(); return; }

    if (rawDigits.length !== 10)
        setField(group, 'phone', false, `Số điện thoại cần đúng 10 chữ số (hiện có ${rawDigits.length}).`);
    else if (!/^0\d{9}$/.test(rawDigits))
        setField(group, 'phone', false, 'Số điện thoại phải bắt đầu bằng 0.');
    else
        setField(group, 'phone', true, 'Số điện thoại hợp lệ ✓');
});

togglePw.addEventListener('click', function () {
    const isText = inputPw.type === 'text';
    inputPw.type = isText ? 'password' : 'text';
    this.textContent = isText ? '👁' : '🙈';
    this.setAttribute('aria-label', isText ? 'Hiện mật khẩu' : 'Ẩn mật khẩu');
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const infoRows = [
        ['Họ tên', inputName.value.trim()],
        ['Email', inputEmail.value.trim()],
        ['Số điện thoại', inputPhone.value.trim()],
    ];
    modalInfo.innerHTML = infoRows
        .map(([label, val]) => `<div><strong>${label}:</strong> ${val}</div>`)
        .join('');

    successModal.removeAttribute('hidden');
    modalClose.focus();
});

modalClose.addEventListener('click', () => {
    successModal.setAttribute('hidden', '');
    form.reset();
    ['fg-name', 'fg-email', 'fg-password', 'fg-confirm', 'fg-phone'].forEach(id => {
        clearField(document.getElementById(id));
    });
    Object.keys(validity).forEach(k => validity[k] = false);
    strengthBar.className = 'strength-bar';
    strengthLbl.textContent = '';
    checkSubmit();
    inputName.focus();
});

successModal.addEventListener('click', function (e) {
    if (e.target === successModal) modalClose.click();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !successModal.hasAttribute('hidden')) {
        modalClose.click();
    }
});