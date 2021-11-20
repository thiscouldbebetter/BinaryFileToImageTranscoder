
class BinaryFileToImageTranscoder
{
	static Instance()
	{
		if (BinaryFileToImageTranscoder._instance == null)
		{
			BinaryFileToImageTranscoder._instance =
				new BinaryFileToImageTranscoder();
		}
		return BinaryFileToImageTranscoder._instance;
	}

	bytesFromStringHexadecimal(bytesAsStringHexadecimal)
	{
		var bytes = [];

		var numberOfNibbles = bytesAsStringHexadecimal.length

		for (var b = 0; b < numberOfNibbles; b += 2)
		{
			var byteAsStringHexadecimal = bytesAsStringHexadecimal.substr(b, 2);
			var byte = parseInt(byteAsStringHexadecimal, 16);
			bytes.push(byte);
		}

		return bytes;
	}

	bytesToCanvas(bytesAsStringHexadecimal)
	{
		var bytes = this.bytesFromStringHexadecimal(bytesAsStringHexadecimal);

		var numberOfBytes = bytes.length;

		var bytesPerPixel = 3;

		var numberOfPixels = Math.ceil(numberOfBytes / bytesPerPixel);

		var imageWidthInPixels 
			= Math.ceil(Math.sqrt(numberOfPixels));
		var imageHeightInPixels 
			= Math.ceil(numberOfPixels / imageWidthInPixels);
		var imageSizeInPixels 
			= new Coords(imageWidthInPixels, imageHeightInPixels + 1);

		var d = document;

		var canvas = d.createElement("canvas");
		canvas.width = imageSizeInPixels.x;
		canvas.height = imageSizeInPixels.y;

		var graphics = canvas.getContext("2d");

		var numberOfBytes = bytes.length;

		// Max file size is 2^24 B = 16 MiB.
		var numberOfBytesMax = 2 << 23.

		if (numberOfBytes > numberOfBytesMax)
		{
			alert("File must not be larger than " + numberOfBytesMax + " bytes.");
			return;
		}

		// Store the file's length in bytes in the upper-left pixel.

		var numberOfBytesAsRGB = 
		[
			(numberOfBytes >> 16) & 0xff,
			(numberOfBytes >> 8) & 0xff,
			(numberOfBytes) & 0xff
		];
		var pixelColorAsString = 
			"rgb(" + numberOfBytesAsRGB.join(",") + ")";

		graphics.fillStyle = pixelColorAsString;
		graphics.fillRect(0, 0, 1, 1);

		// Store 3 bytes per pixel as RGB components.

		var byteIndex = 0;

		for (var y = 1; y < imageSizeInPixels.y; y++)
		{
			for (var x = 0; x < imageSizeInPixels.x; x++)
			{
				var pixelColorRGB = [0, 0, 0];

				for (var b = 0; b < bytesPerPixel; b++)
				{
					if (byteIndex < numberOfBytes)
					{
						var byte = bytes[byteIndex];
						pixelColorRGB[b] = byte;
					}

					byteIndex++;
				}

				var pixelColorAsString = 
					"rgb(" + pixelColorRGB.join(",") + ")";

				graphics.fillStyle = pixelColorAsString;
				graphics.fillRect(x, y, 1, 1);
			}
		}

		return canvas;
	}

	bytesToImgElement(bytesAsStringHexadecimal, callback)
	{
		var canvas = this.bytesToCanvas(bytesAsStringHexadecimal);

		var imageAsDataURL = canvas.toDataURL("image/png");
		var imgElement = document.createElement("img");
		imgElement.onload = (e) =>
		{
			callback(imgElement);
		}
		imgElement.src = imageAsDataURL;

		return imgElement;
	}

	saveImgElementToFileWithName(imgElement, fileName)
	{
		var canvas = document.createElement("canvas");
		canvas.width = imgElement.width;
		canvas.height = imgElement.height;
		var graphics = canvas.getContext("2d");

		graphics.drawImage(imgElement, 0, 0);

		new FileHelper().saveCanvasToFileWithName
		(
			canvas, fileName + ".png"
		);
	}

	imgElementToBytes(imgElement)
	{
		var imageSizeInPixels = new Coords
		(
			imgElement.width,
			imgElement.height
		);

		var canvas = document.createElement("canvas");
		canvas.width = imageSizeInPixels.x;
		canvas.height = imageSizeInPixels.y;

		var graphics = canvas.getContext("2d");

		graphics.drawImage(imgElement, 0, 0);

		var bytesPerPixel = 3;

		var bytes = [];

		var pixelColorsRGBA = graphics.getImageData
		(
			0, 0, imageSizeInPixels.x, imageSizeInPixels.y
		).data;

		// Decode the file's length in bytes from the upper-left pixel.

		var numberOfBytesAsRGB = pixelColorsRGBA.slice(0, 3);

		var numberOfBytes = 
			(numberOfBytesAsRGB[0] << 16)
			+ (numberOfBytesAsRGB[1] << 8)
			+ (numberOfBytesAsRGB[2]);

		var byteIndex = 0;

		for (var y = 1; y < imageSizeInPixels.y; y++)
		{
			for (var x = 0; x < imageSizeInPixels.x; x++)
			{
				var pixelIndex = 
					y * imageSizeInPixels.x 
					+ x;

				var pixelColorRGBA = pixelColorsRGBA.slice
				(
					pixelIndex * 4, 
					pixelIndex * 4 + 4
				);

				for (var b = 0; b < bytesPerPixel; b++)
				{
					var byte = pixelColorRGBA[b];

					bytes[byteIndex] = byte;

					byteIndex++;
				}
			}
		}

		bytes.length = numberOfBytes;

		return bytes;
	}

	binaryStringToHexadecimal(binaryString)
	{
		var numberOfBytes = binaryString.length;

		var bytes = [];

		for (var b = 0; b < numberOfBytes; b++)
		{
			var byte = binaryString.charCodeAt(b);
			bytes.push(byte);
		}

		var bytesAsHexadecimal =
			bytes.map(x => x.toString(16).padStart(2, "0")).join("");

		return bytesAsHexadecimal;
	}

	dataUrlToImgElement(imageAsDataUrl, callback)
	{
		var imgElement = document.createElement("img");
		imgElement.onload = (event2) =>
		{
			callback(imgElement);
		}
		imgElement.src = imageAsDataURL;
	}

	saveBytesFromHexadecimalToFileWithName(bytesAsStringHexadecimal, fileName)
	{
		var bytes = this.bytesFromStringHexadecimal(bytesAsStringHexadecimal);
		new FileHelper().saveBytesToFileWithName(bytes, fileName);
	}
}
