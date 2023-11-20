"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var BinaryFileToImageTranscoder;
    (function (BinaryFileToImageTranscoder) {
        class FileHelper {
            saveBytesToFileWithName(bytesToWrite, fileNameToSaveAs) {
                var bytesToWriteAsArrayBuffer = new ArrayBuffer(bytesToWrite.length);
                var bytesToWriteAsUIntArray = new Uint8Array(bytesToWriteAsArrayBuffer);
                for (var i = 0; i < bytesToWrite.length; i++) {
                    bytesToWriteAsUIntArray[i] = bytesToWrite[i];
                }
                var bytesToWriteAsBlob = new Blob([bytesToWriteAsArrayBuffer], { type: "application/type" });
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(bytesToWriteAsBlob);
                link.download = fileNameToSaveAs;
                link.click();
            }
            saveCanvasToFileWithName(canvas, fileNameToSaveAs) {
                var imageFromCanvasURL = canvas.toDataURL("image/png");
                var imageAsByteString = atob(imageFromCanvasURL.split(',')[1]);
                var imageAsArrayBuffer = new ArrayBuffer(imageAsByteString.length);
                var imageAsArrayUnsigned = new Uint8Array(imageAsArrayBuffer);
                for (var i = 0; i < imageAsByteString.length; i++) {
                    imageAsArrayUnsigned[i] = imageAsByteString.charCodeAt(i);
                }
                var imageAsBlob = new Blob([imageAsArrayBuffer], { type: "image/png" });
                if (fileNameToSaveAs.toLowerCase().endsWith(".png") == false) {
                    fileNameToSaveAs += ".png";
                }
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(imageAsBlob);
                link.download = fileNameToSaveAs;
                link.click();
            }
        }
        BinaryFileToImageTranscoder.FileHelper = FileHelper;
    })(BinaryFileToImageTranscoder = ThisCouldBeBetter.BinaryFileToImageTranscoder || (ThisCouldBeBetter.BinaryFileToImageTranscoder = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
