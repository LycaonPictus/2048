let gennew = 0;
let score = 0;
let blocked = 0;
const animtime = 50;

function getCell(i, j)
{
	return (document.getElementById(i + "-" + j))
}

function getValue(i, j)
{
	return parseInt(getCell(i,j).getAttribute("data-value"));
}

function setValue(i, j, v)
{
	return getCell(i,j).setAttribute("data-value", v);
}


function display_score()
{
	document.getElementById("score").textContent = score;
}

function game_over()
{
	document.getElementById("message").textContent = "GAME OVER";
}

function you_win()
{
	document.getElementById("message").textContent = "YOU WIN!";
}

function randomInt(n)
{
	if (n < 1)
		return Math.random();
	else
		return Math.floor(Math.random() * n);
}

function generate_random()
{
	let available = [];
	for (let i = 0; i < 4; i++)
		for (let j = 0; j < 4; j++)
			if (getValue(i, j) == 0)
				available.push([i,j]);
	if (available.length == 0)
		return ;
	let selected = available[randomInt(available.length)];
	setValue(selected[0], selected[1], randomInt(2) + 1);
}

function check_end()
{
	for (let i = 0; i < 4; i++)
		for (let j = 0; j < 4; j++)
			if (getValue(i, j) == 11)
				return 1;
	for (let i = 0; i < 4; i++)
		for (let j = 0; j < 4; j++)
			if (getValue(i, j) == 0 || (i < 3 && getValue(i, j) == getValue(i + 1, j)) || (j < 3 && getValue(i, j) == getValue(i, j + 1)))
				return 0;
	return -1;
}

document.addEventListener("keydown", (ev)=>
	{
		if (blocked)
			return ;
		let key = ev.key;
		if (key == "ArrowUp")
			move("up");
		else if (key == "ArrowDown")
			move("down");
		else if (key == "ArrowLeft")
			move("left");
		else if (key == "ArrowRight")
			move("right");
		else
			return;
		if (gennew)
		{
			generate_random();
			gennew = 0;
		}
		display_score();
		setTimeout(()=>{blocked = 0;}, 3 * animtime);
		end = check_end();
		if (end == -1)
			return game_over();
		else if (end == 1)
			return you_win();
	}
);

function createAnimation(src, dst)
{
	let translation = "translate";
	let coordsrc = [parseInt(src.id.substring(0,1)), parseInt(src.id.substring(2,3))];
	let coorddst = [parseInt(dst.id.substring(0,1)), parseInt(dst.id.substring(2,3))];
	if (coordsrc[0] == coorddst[0])
		translation += "X(" + ((coorddst[1] - coordsrc[1]) * 12.05) + "vh)";
	else if (coordsrc[1] == coorddst[1])
		translation += "Y(" + ((coorddst[0] - coordsrc[0]) * 12.50) + "vh)";
	else
		return ;
	src.style.transform = translation;
	src.style.transition = "transform "+ (animtime / 1000) +"s ease";
	setTimeout(()=>{
		paint_cells();
		src.style.transform = "";
		src.style.transition = "";
	}, animtime)
}

function merge_array(array)
{
	let next;
	for (let i = 0; i < 3; i++)
	{
		next = array[i + 1];
		if (array[i].getAttribute("data-value") != "0" && array[i].getAttribute("data-value") == next.getAttribute("data-value"))
		{
			blocked = 1;
			gennew = 1;
			createAnimation(next, array[i]);
			array[i].setAttribute("data-value", parseInt(array[i].getAttribute("data-value")) + 1);
			score += Math.pow(2, parseInt(array[i].getAttribute("data-value")));
			next.setAttribute("data-value", 0);
		}
	}
}

function move_array(array)
{
	for (let i = 0; i < 3; i++)
	{
		if (array[i].getAttribute("data-value") == "0")
		{
			for (let j = i + 1; j < 4; j++)
				if (array[j].getAttribute("data-value") != "0")
				{
					blocked = 1;
					gennew = 1;
					createAnimation(array[j], array[i]);
					array[i].setAttribute("data-value", array[j].getAttribute("data-value"));
					array[j].setAttribute("data-value", "0");
					break;
				}
		}
	}
}

function getArray(direction, index)
{
	let array = [];
	for (let i = 0; i < 4; i++)
		if (direction == "up" || direction == "down")
			array.push(getCell(i, index));
		else
			array.push(getCell(index, i));
	if (direction == "down" || direction == "right")
		array.reverse();
	return (array);
}

function move(direction)
{
	let array;
	for (let i = 0 ; i < 4 ; i++)
	{
		array = getArray(direction, i);
		move_array(array);
		merge_array(array);
		move_array(array);
	}
}

