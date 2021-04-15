$(document).ready(function () {

	$.ajax({
		url: 'https://stock.logo-design360.com/trade-api/public/api/get_top_ten_daily',
		type: "get",
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
		},
		success: function (data, status) {

			console.log(data)

			if (data.code == 200) {

				Morris.Bar({
					element: 'company-charts',
					data: data.data,
					xkey: 'symbol',
					ykeys: ['high', 'open'],
					labels: ['High', 'Open'],
					lineColors: ['#00c5fb', '#0253cc'],
					lineWidth: '3px',
					barColors: ['#00c5fb', '#0253cc'],
					resize: true,
					redraw: true
				});



			}

		}, error: function (jqXHR, textStatus, errorThrown) {

			// console.log(errorThrown)
		}
	});




	// Bar Chart

	Morris.Bar({
		element: 'bar-charts',
		data: [
			{ y: '2006', a: 100, b: 90 },
			{ y: '2007', a: 75, b: 65 },
			{ y: '2008', a: 50, b: 40 },
			{ y: '2009', a: 75, b: 65 },
			{ y: '2010', a: 50, b: 40 },
			{ y: '2011', a: 75, b: 65 },
			{ y: '2012', a: 100, b: 90 }
		],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Total Income', 'Total Outcome'],
		lineColors: ['#00c5fb', '#0253cc'],
		lineWidth: '3px',
		barColors: ['#00c5fb', '#0253cc'],
		resize: true,
		redraw: true
	});

	// Line Chart

	Morris.Line({
		element: 'line-charts',
		data: [
			{ y: '2006', a: 50, b: 90 },
			{ y: '2007', a: 75, b: 65 },
			{ y: '2008', a: 50, b: 40 },
			{ y: '2009', a: 75, b: 65 },
			{ y: '2010', a: 50, b: 40 },
			{ y: '2011', a: 75, b: 65 },
			{ y: '2012', a: 100, b: 50 }
		],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Total Sales', 'Total Revenue'],
		lineColors: ['#00c5fb', '#0253cc'],
		lineWidth: '3px',
		resize: true,
		redraw: true
	});

});