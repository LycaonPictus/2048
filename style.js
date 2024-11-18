
let color_start = "F5E3AE";
let color_end = "4E5861";
let bg_color = "#bbada0";
let colors = [bg_color, "#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f", "#f65e3b", "#edcf72", "#edcc61", "#edc850", "#edc53f", "#edc22e"];

function calculate_bgc(exponent)
{
	if (exponent > 0)
	{
		let q = (exponent - 1) / 10;
		let r0 = parseInt(color_start.substring(0,2), 16);
		let g0 = parseInt(color_start.substring(2,4), 16);
		let b0 = parseInt(color_start.substring(4,6), 16);
		let r1 = parseInt(color_end.substring(0,2), 16);
		let g1 = parseInt(color_end.substring(2,4), 16);
		let b1 = parseInt(color_end.substring(4,6), 16);
		let r = r0 + (r1 - r0) * q;
		let g = g0 + (g1 - g0) * q;
		let b = b0 + (b1 - b0) * q;
		return "rgb("+ r + "," + g + "," + b +")";
	}
}

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
				elem.style.backgroundColor = bg_color;
			}
			else
			{
				elem.textContent = Math.pow(2, exp);
				elem.style.backgroundColor = colors[exp];
			}
		}
}

document.getElementById("grid").style.backgroundColor = bg_color;
generate_random();
generate_random();
paint_cells();
display_score();