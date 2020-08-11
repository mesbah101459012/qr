const qrcode1 = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;
let res_qr = "";
$(document).ready(function () {

qrcode1.callback = res => {
    if (res) {
        outputData.innerText = res;
		res_qr = res;
        scanning = false;
		
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        qrResult.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.hidden = false;
		ajax_send();
		
    }
};

	
	var ajax_send = function () {
		
		jQuery.ajax({
			type: "POST",
			url: "encryption_decryption.php",
			data: {
				response_qr: res_qr //$('outputData').val();
			}
		}).done(function (response) {
			setTimeout(function () {
				
			});
			alert(response);
			if (response == "http://en.m.wikipedia.org") {
				alert("ok");
			} else {
				alert("not okey");
			}
		}); // end ajax
	}
	
btnScanQR.onclick = () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
        scanning = true;
        qrResult.hidden = true;
        btnScanQR.hidden = true;
        canvasElement.hidden = false;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        tick();
        scan();
    });
};
function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcode1.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}

});