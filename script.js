'use strict';

window.addEventListener('load', e => {
	const commands = document.getElementById('commands');
	fetch('/cgi-bin/hostname')
		.then(response => response.text())
		.then(hostname => window.document.title = hostname);
	fetch('/cgi-bin/ls')
		.then(response => response.text())
		.then(text => text.trim().split('\n'))
		.then(list => list.map(command => {
			const
				tr = document.createElement('tr'),
				td_command = document.createElement('td'),
				td_result = document.createElement('td'),
				pre_command = document.createElement('pre'),
				pre_result = document.createElement('pre'),
				a = document.createElement('a');

			a.target = '_BLANK';
			a.href = '/cgi-bin/' + command;

			pre_command.textContent = command;
			pre_result.textContent = 'loading ...';
			pre_result.className = 'result';
			fetch('/cgi-bin/' + command)
				.then(response => response.text())
				.then(text => pre_result.textContent = text);

			a.appendChild(pre_command);
			td_command.appendChild(a);
			td_result.appendChild(pre_result);
			tr.appendChild(td_command);
			tr.appendChild(td_result);
			commands.appendChild(tr);

			return command;
		}));


	/* Ping */
	const d_ping = document.getElementById('ping');
	const delays = [];
	const average_window = 10;
	const measure_one = () => {
		const tick = +new Date;
		fetch('/cgi-bin/false').then(() => {
			const tock = +new Date;
			delays.unshift(tock - tick);
			delays.splice(average_window);

			const sum = delays.reduce((a, b) => a + b, 0);
			const avg = sum / delays.length;
			d_ping.textContent = avg + 'ms';
			setTimeout(() => measure_one(), 1000);
		}).catch(e => {
			delays.splice(0);
			d_ping.textContent = 'Network Error';
			measure_one();
		});
	};
	measure_one();

});