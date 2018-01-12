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
});
