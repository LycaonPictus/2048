
let colors = ["rgba(238, 228, 218, 0.35)", "#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f", "#f65e3b", "#edcf72", "#edcc61", "#edc850", "#edc53f", "#edc22e"];

function paint_cells()
{
	let elem;
	let exp;

	for (i = 0; i < 4 ; i++)
		for (j = 0; j < 4; j++)
		{
			elem = getCell(i, j);
			exp = parseInt(elem.getAttribute("data-value"));
			if (exp < 1)
			{
				elem.textContent = "";
				elem.style.opacity = 0;
			}
			else
			{
				elem.textContent = Math.pow(2, exp);
				elem.style.opacity = 1;
			}
			elem.style.backgroundColor = colors[exp];
		}
}

function init_game()
{
	for (let i = 0; i < 4; i++)
		for (let j = 0; j < 4; j++)
			setValue(i, j, 0);
	score = 0;
	generate_random();
	generate_random();
	paint_cells();
	display_score();
}

init_game();