# simple-vps-dashboard
This project is used to monitor the status of a VPS machine.

# depends
* make
* gcc
* netstat-nat
* fcgiwrap
* nginx

# install
## nginx setting
```text
location /cgi-bin/ {
	fastcgi_pass unix:/var/run/fcgiwrap.socket;
	include fastcgi_params;
}
```

