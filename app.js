const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const colorsCollec = document.getElementById("colors-collection");
const colors = document.getElementsByClassName("colors");
const colorPicker = document.getElementById("color-picker");
const colorPickerInput = document.getElementById("color-picker-input");
const weightRange = document.getElementById("weight-range");
const modeBtn = document.getElementById("mode");
const saveBtn = document.getElementById("save");

colorPicker.style.backgroundColor = colorPickerInput.value;

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

// the size of canvas element to be controlled, different and independent from css styling.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// canvas context manipulates every pixel on canvas.
// set initial pixels' background color for canvas, different from css styling of canvas.
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5; // in px

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(evt) {
	const x = evt.offsetX;
	const y = evt.offsetY;
	if (!painting) {
		// creating a path and positioning it as mouse moving
		// this tracking is needed, because "the starting point to stroke a line from" is needed whenever mouse-dragging happens.
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		// drawing a line to (x, y) from the last position of existing path.
		ctx.lineTo(x, y);
		// applying styles to line
		ctx.stroke();
	}
}

function handleColor(evt) {
	const target = evt.target;
	if (Array.from(target.classList).includes("colors")) {
		const color = target.style.backgroundColor;
		ctx.strokeStyle = color;
		ctx.fillStyle = color;

		colorPicker.style.background = "unset";
		colorPicker.style.border = "none";
		Array.from(colors).forEach((item) => (item.style.boxShadow = "none"));

		target.style.boxShadow = `2px 2px 10px 2px ${color}`;
	}
}

function handleColorPick(evt) {
	console.log(evt);
	const color = evt.target.value;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;

	Array.from(colors).forEach((item) => (item.style.boxShadow = "none"));
	colorPicker.style.background = color;
	colorPicker.style.border = "5px solid #f6f9fc";
}

function handleWeight(evt) {
	ctx.lineWidth = evt.target.value;
}

function handleMode(evt) {
	if (filling) {
		filling = false;
		modeBtn.innerText = "fill";
	} else {
		filling = true;
		modeBtn.innerText = "line";
	}
}

function handleSave() {
	const image = canvas.toDataURL(); // or just pass an arg like 'image/jpeg', png is default
	const link = document.createElement("a");
	link.href = image;
	link.download = "MYCANVAS[EXPORT]";
	link.click();
}

function handleCanvasClick() {
	if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleRightClick(evt) {
	evt.preventDefault();
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleRightClick);
}

if (colorsCollec) colorsCollec.addEventListener("click", handleColor);

if (colorPickerInput)
	colorPickerInput.addEventListener("input", handleColorPick);

if (weightRange) weightRange.addEventListener("input", handleWeight);

if (modeBtn) modeBtn.addEventListener("click", handleMode);

if (saveBtn) saveBtn.addEventListener("click", handleSave);

// without event delegation
// const colors = document.getElementsByClassName("colors");
// Array.from(colors).forEach((item) =>
// 	item.addEventListener("click", handleColor)
// );
