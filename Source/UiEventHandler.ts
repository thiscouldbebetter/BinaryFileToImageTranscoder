namespace ThisCouldBeBetter.BinaryFileToImageTranscoder
{

export class UiEventHandler
{
	static buttonBytesSaveToFile_Clicked(): void
	{
		var d = document;

		var inputFileName = d.getElementById("inputFileName") as any;
		var textareaBytesAsHexadecimal = 
			d.getElementById("textareaBytesAsHexadecimal") as any;

		var fileName = inputFileName.value + ".bin";
		var bytesAsStringHexadecimal = textareaBytesAsHexadecimal.value;

		var transcoder = BinaryFileToImageTranscoder.Instance();
		transcoder.saveBytesFromHexadecimalToFileWithName
		(
			bytesAsStringHexadecimal, fileName
		);
	}

	static buttonBytesToImage_Clicked(): void
	{
		var d = document;

		var textareaBytesAsHexadecimal = 
			d.getElementById("textareaBytesAsHexadecimal") as any;
		var divImageDisplay = d.getElementById
		(
			"divImageDisplay"
		);

		var bytesAsStringHexadecimal = textareaBytesAsHexadecimal.value;

		var transcoder = BinaryFileToImageTranscoder.Instance();
		transcoder.bytesToImgElement
		(
			bytesAsStringHexadecimal,
			(imgElement: any) => // callback
			{
				divImageDisplay.innerHTML = "";
				divImageDisplay.appendChild(imgElement);
			}
		);
	}

	static buttonImageSaveToFile_Clicked(): void
	{
		var d = document;

		var divImageDisplay = d.getElementById
		(
			"divImageDisplay"
		);
		var imgElement = divImageDisplay.getElementsByTagName("img")[0];
		var inputFileName = d.getElementById("inputFileName") as any;

		if (imgElement == null)
		{
			alert("No image specified!");
		}

		var fileName = inputFileName.value;

		var transcoder = BinaryFileToImageTranscoder.Instance();
		transcoder.saveImgElementToFileWithName(imgElement, fileName);
	}

	static buttonImageToBytes_Clicked(): void
	{
		var d = document;

		var divImageDisplay = d.getElementById("divImageDisplay");
		var imgElement = divImageDisplay.getElementsByTagName("img")[0];
		var textareaBytesAsHexadecimal =
			d.getElementById("textareaBytesAsHexadecimal") as any;

		if (imgElement == null)
		{
			alert("No image specified!");
			return;
		}

		var transcoder = BinaryFileToImageTranscoder.Instance();
		var bytes = transcoder.imgElementToBytes(imgElement);
		var bytesAsHexadecimal =
			bytes.map(x => x.toString(16).padStart(2, "0")).join("");

		textareaBytesAsHexadecimal.value = bytesAsHexadecimal;
	}

	static inputFileAsBytes_Changed(inputFileAsBytes: any): void
	{
		var d = document;
		var textareaBytesAsHexadecimal =
			d.getElementById("textareaBytesAsHexadecimal") as any;

		var file = inputFileAsBytes.files[0];

		var fileReader = new FileReader();
		fileReader.onload = (event) =>
		{
			var fileAsBinaryString = event.target.result as string;

			var transcoder = BinaryFileToImageTranscoder.Instance();
			var bytesAsHexadecimal =
				transcoder.binaryStringToHexadecimal(fileAsBinaryString);

			textareaBytesAsHexadecimal.value = 
				bytesAsHexadecimal;
		}
		fileReader.readAsBinaryString(file);
	}

	static inputFileAsImage_Changed(inputFileAsImage: any): void
	{
		var d = document;

		var divImageDisplay =
			d.getElementById("divImageDisplay");

		var file = inputFileAsImage.files[0];

		var fileReader = new FileReader();
		fileReader.onload = (event) =>
		{
			var imageAsDataUrl = event.target.result as string;

			var transcoder = BinaryFileToImageTranscoder.Instance();
			transcoder.dataUrlToImgElement
			(
				imageAsDataUrl,
				(imgElement: any) =>
				{
					divImageDisplay.innerHTML = "";
					divImageDisplay.appendChild(imgElement);
				}
			);
		}
		fileReader.readAsDataURL(file);
	}
}

}