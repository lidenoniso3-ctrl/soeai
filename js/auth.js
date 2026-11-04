// التطبيق مفتوح للجميع — لا يوجد تحقق من الترخيص
function getLicense() { return "public"; }

function logout() {
  window.location.href = "index.html";
}

// دالة كانت تتحقق من وجود المفتاح — أصبحت تُرجع true دائماً
function requireLicense() { return true; }

// دالة كانت تُرفق Authorization — أصبحت طلباً عادياً
async function licensedFetch(fnPath) {
  return fetch("/.netlify/functions/" + fnPath);
}