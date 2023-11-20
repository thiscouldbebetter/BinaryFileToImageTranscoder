"use strict";
var ThisCouldBeBetter;
(function (ThisCouldBeBetter) {
    var BinaryFileToImageTranscoder;
    (function (BinaryFileToImageTranscoder) {
        class UiEventHandler {
            static buttonBytesSaveToFile_Clicked() {
                var d = document;
                var inputFileName = d.getElementById("inputFileName");
                var textareaBytesAsHexadecimal = d.getElementById("textareaBytesAsHexadecimal");
                var fileName = inputFileName.value + ".bin";
                var bytesAsStringHexadecimal = textareaBytesAsHexadecimal.value;
                var transcoder = BinaryFileToImageTranscoder.BinaryFileToImageTranscoder.Instance();
                transcoder.saveBytesFromHexadecimalToFileWithName(bytesAsStringHexadecimal, fileName);
            }
            static buttonBytesToImage_Clicked() {
                var d = document;
                var textareaBytesAsHexadecimal = d.getElementById("textareaBytesAsHexadecimal");
                var divImageDisplay = d.getElementById("divImageDisplay");
                var bytesAsStringHexadecimal = textareaBytesAsHexadecimal.value;
                var transcoder = BinaryFileToImageTranscoder.BinaryFileToImageTranscoder.Instance();
                transcoder.bytesToImgElement(bytesAsStringHexadecimal, (imgElement) => // callback
                 {
                    divImageDisplay.innerHTML = "";
                    divImageDisplay.appendChild(imgElement);
                });
            }
            static buttonImageSaveToFile_Clicked() {
                var d = document;
                var divImageDisplay = d.getElementById("divImageDisplay");
                var imgElement = divImageDisplay.getElementsByTagName("img")[0];
                var inputFileName = d.getElementById("inputFileName");
                if (imgElement == null) {
                    alert("No image specified!");
                }
                var fileName = inputFileName.value;
                var transcoder = BinaryFileToImageTranscoder.BinaryFileToImageTranscoder.Instance();
                transcoder.saveImgElementToFileWithName(imgElement, fileName);
            }
            static buttonImageToBytes_Clicked() {
                var d = document;
                var divImageDisplay = d.getElementById("divImageDisplay");
                var imgElement = divImageDisplay.getElementsByTagName("img")[0];
                var textareaBytesAsHexadecimal = d.getElementById("textareaBytesAsHexadecimal");
                if (imgElement == null) {
                    alert("No image specified!");
                    return;
                }
                var transcoder = BinaryFileToImageTranscoder.BinaryFileToImageTranscoder.Instance();
                var bytes = transcoder.imgElementToBytes(imgElement);
                var bytesAsHexadecimal = bytes.map(x => x.toString(16).padStart(2, "0")).join("");
                textareaBytesAsHexadecimal.value = bytesAsHexadecimal;
            }
            static inputFileAsBytes_Changed(inputFileAsBytes) {
                var d = document;
                var textareaBytesAsHexadecimal = d.getElementById("textareaBytesAsHexadecimal");
                var file = inputFileAsBytes.files[0];
                var fileReader = new FileReader();
                fileReader.onload = (event) => {
                    var fileAsBinaryString = event.target.result;
                    var transcoder = BinaryFileToImageTranscoder.BinaryFileToImageTranscoder.Instance();
                    var bytesAsHexadecimal = transcoder.binaryStringToHexadecimal(fileAsBinaryString);
                    textareaBytesAsHexadecimal.value =
                        bytesAsHexadecimal;
                };
                fileReader.readAsBinaryString(file);
            }
            static inputFileAsImage_Changed(inputFileAsImage) {
                var d = document;
                var divImageDisplay = d.getElementById("divImageDisplay");
                var file = inputFileAsImage.files[0];
                var fileReader = new FileReader();
                fileReader.onload = (event) => {
                    var imageAsDataUrl = event.target.result;
                    var transcoder = BinaryFileToImageTranscoder.BinaryFileToImageTranscoder.Instance();
                    transcoder.dataUrlToImgElement(imageAsDataUrl, (imgElement) => {
                        divImageDisplay.innerHTML = "";
                        divImageDisplay.appendChild(imgElement);
                    });
                };
                fileReader.readAsDataURL(file);
            }
        }
        BinaryFileToImageTranscoder.UiEventHandler = UiEventHandler;
    })(BinaryFileToImageTranscoder = ThisCouldBeBetter.BinaryFileToImageTranscoder || (ThisCouldBeBetter.BinaryFileToImageTranscoder = {}));
})(ThisCouldBeBetter || (ThisCouldBeBetter = {}));
