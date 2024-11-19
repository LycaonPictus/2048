let gennew = 0;
let score = 0;
let blocked = 0;

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
	console.log("GAME OVER");
}

function you_win()
{
	console.log("YOU WIN");
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
		blocked = 1;
		setTimeout(()=>{blocked = 0;}, 100);
		let end;
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
		paint_cells();
		display_score();
		end = check_end();
		if (end == -1)
			return game_over();
		else if (end == 1)
			return you_win();
	}
);

function merge_array(array)
{
	for (let i = 0; i < 3; i++)
	{
		if (array[i].getAttribute("data-value") != "0" && array[i].getAttribute("data-value") == array[i + 1].getAttribute("data-value"))
		{
			gennew = 1;
			array[i].setAttribute("data-value", parseInt(array[i].getAttribute("data-value")) + 1);
			score += Math.pow(2, parseInt(array[i].getAttribute("data-value")));
			array[i + 1].setAttribute("data-value", 0);
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
					gennew = 1;
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

